import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const issues=[];
for(const width of [1440,768,390]){
 const page=await browser.newPage({viewport:{width,height:900}});page.setDefaultTimeout(7000);page.on('pageerror',e=>issues.push(`${width}: ${e}`));page.on('console',m=>{if(m.type()==='error')issues.push(`${width}: ${m.text()}`)});
 await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('[aria-label="Shipping promotion"]').evaluate(e=>getComputedStyle(e).position),'fixed');
 if(width===1440){
   await page.getByRole('button',{name:/ALL PRODUCTS/}).hover();
   await page.getByRole('button',{name:'Tents',exact:true}).hover();
   assert.equal(await page.getByRole('link',{name:'Lightweight Hiking Tents'}).isVisible(),true);
   await page.getByRole('button',{name:'My Account'}).click();
   assert.equal(await page.getByRole('link',{name:'Login'}).isVisible(),true);
   await page.getByRole('button',{name:'United Kingdom (GBP £)'}).click();
   await page.getByRole('button',{name:'Jersey (GBP £)'}).click();
   assert.equal(await page.getByRole('button',{name:'Jersey (GBP £)'}).isVisible(),true);
   await page.getByRole('textbox',{name:'Keywords ...'}).fill('tent');
   assert.equal(await page.locator('form[role="search"] input[name="q"]').inputValue(),'tent*');
 }
 if(width===768){await page.getByRole('button',{name:'Search'}).click();assert.equal(await page.getByRole('textbox',{name:'Keywords ...'}).isVisible(),true);}
 if(width===390){
   await page.getByRole('button',{name:'Navigation'}).click();
   await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('button',{name:'All Products'}).click();
   await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('button',{name:'Tents',exact:true}).click();
   assert.equal(await page.getByRole('link',{name:'Lightweight Hiking Tents'}).isVisible(),true);
   await page.getByRole('button',{name:'Navigation'}).click();
   await page.getByRole('button',{name:'Search'}).click();
   assert.equal(await page.getByRole('textbox',{name:'Keywords ...'}).isVisible(),true);
 }
 await page.getByRole('button',{name:'Shopping cart'}).first().click();
 assert.equal(await page.getByRole('heading',{name:'Shopping Cart'}).isVisible(),true);
 await page.getByRole('button',{name:'Close cart'}).last().click();
 assert.equal(await page.getByRole('heading',{name:'Shopping Cart'}).count(),0);
 await page.close();
}
await browser.close();assert.deepEqual(issues,[]);console.log('Header interactions and browser console: passed at 1440, 768, 390');
