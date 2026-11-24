import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
const report = {};
for (const width of [1440, 1280, 768, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  await page.goto('https://www.woodtowater.co.uk/', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.locator('.slideshow').first().waitFor();
  await page.waitForTimeout(1000);
  report[width] = await page.evaluate(() => {
    const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return { rect: { x:r.x,y:r.y,width:r.width,height:r.height }, css: {display:s.display,position:s.position,background:s.background,backgroundImage:s.backgroundImage,opacity:s.opacity,objectFit:s.objectFit,objectPosition:s.objectPosition,transition:s.transition,transform:s.transform,padding:s.padding,margin:s.margin,fontSize:s.fontSize,fontWeight:s.fontWeight,lineHeight:s.lineHeight,letterSpacing:s.letterSpacing,color:s.color,border:s.border,borderRadius:s.borderRadius,textAlign:s.textAlign,zIndex:s.zIndex} }; };
    const root = document.querySelector('.slideshow');
    const slides = [...document.querySelectorAll('.slideshow__slide')];
    return {
      root: { outer:root?.outerHTML.slice(0,1200),box:box(root),data:root?.dataset },
      wrapper:box(document.querySelector('.slideshow-wrapper')),
      slides:slides.map((el,i)=>({i, cls:el.className, data:el.dataset, outer:el.outerHTML.slice(0,900), box:box(el), title:el.querySelector('.slideshow__title')?.textContent.trim(), subtitle:el.querySelector('.slideshow__subtitle')?.textContent.trim(), cta:[...el.querySelectorAll('a')].map(a=>({text:a.textContent.trim(),href:a.href,cls:a.className})), imgs:[...el.querySelectorAll('img')].map(img=>({src:img.currentSrc,raw:img.getAttribute('src'),srcset:img.getAttribute('srcset')?.slice(0,500),alt:img.alt,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,box:box(img)})), image:box(el.querySelector('.slideshow__image')), overlay:box(el.querySelector('.slideshow__overlay')), textWrap:box(el.querySelector('.slideshow__text-wrap--desktop')), titleBox:box(el.querySelector('.slideshow__title')), subtitleBox:box(el.querySelector('.slideshow__subtitle')), ctaBox:box(el.querySelector('.slideshow__btn'))})),
      controls:[...document.querySelectorAll('.slideshow-wrapper button, .slideshow-wrapper [role="button"], .slideshow-wrapper .slick-dots, .slideshow-wrapper .slideshow__pagination')].slice(0,30).map(el=>({tag:el.tagName,cls:el.className,aria:el.getAttribute('aria-label'),title:el.title,text:el.textContent.trim().slice(0,60),box:box(el),outer:el.outerHTML.slice(0,350)})),
      images:[...document.querySelectorAll('.slideshow-wrapper img')].length,
      scripts:[...document.querySelectorAll('script')].filter(s=>/slideshow|slick|autoplay/i.test(s.textContent)).map(s=>s.textContent.slice(0,1000)).slice(0,6),
    };
  });
  if (width === 1440) {
    report.timing = [];
    for (let i=0;i<12;i++) { await page.waitForTimeout(1000); report.timing.push(await page.evaluate(() => ({t:performance.now(),active:[...document.querySelectorAll('.slideshow__slide')].findIndex(e=>e.classList.contains('slideshow__slide--active')),classes:[...document.querySelectorAll('.slideshow__slide')].map(e=>e.className)}))); }
  }
  await page.close();
}
writeFileSync('reference/hero-analysis.json', JSON.stringify(report,null,2));
console.log(JSON.stringify(Object.fromEntries(Object.entries(report).map(([k,v])=>[k,k==='timing'?v:{slideCount:v.slides.length,slides:v.slides.map(s=>({title:s.title,subtitle:s.subtitle,cta:s.cta,imgs:s.imgs.map(i=>({src:i.src,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight}))})),controls:v.controls.map(c=>({cls:c.cls,aria:c.aria,text:c.text,rect:c.box?.rect}))}])),null,2));
await browser.close();
