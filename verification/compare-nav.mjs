import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
for(const [name,url] of [['reference','https://www.woodtowater.co.uk/'],['local','http://127.0.0.1:3000/']])for(const width of [1440,1280,768]){
 const page=await browser.newPage({viewport:{width,height:900}});await page.goto(url,{waitUntil:'domcontentloaded'});await page.waitForTimeout(400);
 const selectors=name==='reference'?'.main_nav-bar_linklist > li': 'nav[aria-label="Main navigation"] > a, nav[aria-label="Main navigation"] > div';
 const items=await page.locator(selectors).evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {text:e.innerText.trim().split('\n')[0],x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width)}}));
 console.log(name,width,JSON.stringify(items));await page.close();
}await browser.close();
