import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

mkdirSync('verification/phase3', { recursive: true });
const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const report = {};
for (const width of [1440, 1280, 768, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1, hasTouch: width === 390 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `verification/phase3/home-${width}.png`, fullPage: true });
  const data = await page.evaluate(() => {
    const box = (selector) => { const el = document.querySelector(selector); if (!el) return null; const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return {x:r.x,y:r.y,w:r.width,h:r.height,fontSize:s.fontSize,fontWeight:s.fontWeight,lineHeight:s.lineHeight,margin:s.margin,padding:s.padding,background:s.backgroundColor}; };
    return {hero:box('main section'),title:box('main h1'),subtitle:box('main p'),cta:box('main section a'),dot:box('main [aria-label="Load slide 1"]'),documentWidth:document.documentElement.scrollWidth,active:document.querySelector('main [aria-current="true"]')?.getAttribute('aria-label'),ctaHref:document.querySelector('main section a')?.href};
  });
  report[width] = {...data,errors};
  if (width === 390) {
    await page.getByRole('button',{name:'Next slide'}).click({force:true});
    report[width].afterNext = await page.locator('main [aria-current="true"]').getAttribute('aria-label');
    await page.getByRole('button',{name:'Previous slide'}).click({force:true});
    report[width].afterPrevious = await page.locator('main [aria-current="true"]').getAttribute('aria-label');
    await page.getByRole('button',{name:'Load slide 4'}).click();
    report[width].afterDot = await page.locator('main [aria-current="true"]').getAttribute('aria-label');
    const hero = page.locator('main section'); const rect = await hero.boundingBox();
    await page.touchscreen.tap(10, rect.y + 200);
    await page.evaluate(() => { const el=document.querySelector('main section');el.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[new Touch({identifier:1,target:el,clientX:300,clientY:350})]}));el.dispatchEvent(new TouchEvent('touchend',{bubbles:true,changedTouches:[new Touch({identifier:1,target:el,clientX:100,clientY:350})]})); });
    report[width].afterSwipe = await page.locator('main [aria-current="true"]').getAttribute('aria-label');
  }
  await page.close();
}
const p = await browser.newPage({viewport:{width:1440,height:900}});
await p.goto(baseUrl,{waitUntil:'networkidle'});
const first=await p.locator('main [aria-current="true"]').getAttribute('aria-label');
await p.waitForTimeout(5300);
const second=await p.locator('main [aria-current="true"]').getAttribute('aria-label');
report.autoplay={first,second};
await p.close();
await browser.close();
writeFileSync('verification/phase3/results.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
