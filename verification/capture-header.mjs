import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const outputRoot=new URL('./screenshots/',import.meta.url);await mkdir(outputRoot,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const report={};
for(const width of [1440,1280,768,390]){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  const errors=[];page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('pageerror',e=>errors.push(String(e)));
  const response=await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:new URL(`./header-${width}.png`,outputRoot).pathname,fullPage:true});
  report[width]=await page.evaluate(()=>{
    const selectors={announcement:'[aria-label="Shipping promotion"]',header:'header',logo:'a[aria-label="Wood To Water Outdoors home"]',nav:'nav[aria-label="Main navigation"]',search:'form[role="search"]',cart:'button[aria-label="Shopping cart"]',mobileNavButton:'button[aria-label="Navigation"]'};
    const out={};for(const [name,selector] of Object.entries(selectors)){const e=[...document.querySelectorAll(selector)].find(e=>e.getBoundingClientRect().width>0);if(!e){out[name]=null;continue}const r=e.getBoundingClientRect(),s=getComputedStyle(e);out[name]={rect:{x:r.x,y:r.y,width:r.width,height:r.height},font:s.fontFamily,fontSize:s.fontSize,bg:s.backgroundColor};}
    return {document:{width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight},elements:out};
  });
  report[width].status=response?.status();report[width].errors=errors;
  if(width===1440){
    await page.getByRole('button',{name:/ALL PRODUCTS/}).hover();await page.waitForTimeout(100);
    report[width].menuVisible=await page.getByText('Clothing',{exact:true}).first().isVisible();
    await page.screenshot({path:new URL('./desktop-menu.png',outputRoot).pathname,fullPage:false});
    await page.getByRole('button',{name:'Shopping cart'}).first().click();
    report[width].cartVisible=await page.getByRole('heading',{name:'Shopping Cart'}).isVisible();
    await page.screenshot({path:new URL('./cart-drawer.png',outputRoot).pathname,fullPage:false});
  }
  if(width===390){
    await page.getByRole('button',{name:'Navigation'}).click();
    report[width].mobileMenuVisible=await page.getByRole('navigation',{name:'Mobile navigation'}).isVisible();
    await page.screenshot({path:new URL('./mobile-menu.png',outputRoot).pathname,fullPage:false});
  }
  await page.close();
}
await writeFile(new URL('./header-report.json',import.meta.url),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));await browser.close();
