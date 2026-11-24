import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

mkdirSync('verification/footer', { recursive: true });
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const results = {};
for (const width of [1440, 1280, 768, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(process.env.BASE_URL ?? 'http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const footer = page.locator('footer').last();
  await footer.screenshot({ path: `verification/footer/footer-${width}.png` });
  results[width] = await page.evaluate(() => {
    const box = (selector) => { const el = document.querySelector(selector); if (!el) return null; const r = el.getBoundingClientRect(); return { x:r.x, y:r.y, width:r.width, height:r.height }; };
    return { footer:box('footer'), columns:[...document.querySelectorAll('footer section, footer nav')].slice(0,3).map(el => {const r=el.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height};}), newsletter:box('footer form'), bottom:box('footer small'), documentWidth:document.documentElement.scrollWidth };
  });
  results[width].errors = errors;
  if (width === 390) {
    await page.getByRole('button',{name:'Currency'}).click();
    results[width].currencyOpened = await page.getByRole('button',{name:'Jersey (GBP £)'}).isVisible();
    await page.getByRole('button',{name:'Jersey (GBP £)'}).click();
    results[width].currencySelected = await page.getByRole('button',{name:'Currency'}).textContent();
    await page.getByLabel('Email address').fill('test@example.com');
    await page.getByRole('button',{name:'Submit newsletter email'}).click();
    results[width].newsletterMessage = await page.getByRole('status').textContent();
  }
  await page.close();
}
writeFileSync('verification/footer/results.json', JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
await browser.close();
