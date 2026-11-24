import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.woodtowater.co.uk/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(2500);
console.log(JSON.stringify(await page.evaluate(() => {
  const terms = ['header', 'nav', 'slideshow', 'product', 'collection', 'search', 'cart', 'footer', 'hero'];
  const out = {};
  for (const term of terms) {
    out[term] = [...document.querySelectorAll(`[class*="${term}"], [id*="${term}"]`)]
      .filter(e => e.getBoundingClientRect().width > 50 && e.getBoundingClientRect().height > 10)
      .slice(0, 15)
      .map(e => ({tag:e.tagName, id:e.id, cls:String(e.className).slice(0,130), text:e.textContent.trim().replace(/\s+/g,' ').slice(0,60)}));
  }
  return {title:document.title, url:location.href, viewport:[innerWidth,innerHeight], pageHeight:document.documentElement.scrollHeight, out};
}), null, 2));
await browser.close();
