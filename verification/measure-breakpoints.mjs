import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
for(const width of [749,750,989,990,999,1000,1023,1024,1099,1100,1199,1200]){
 const page=await browser.newPage({viewport:{width,height:900}});await page.goto('https://www.woodtowater.co.uk/',{waitUntil:'domcontentloaded'});await page.waitForTimeout(200);
 const state=await page.evaluate(()=>{const visible=(s)=>{const e=document.querySelector(s);return !!e&&e.getBoundingClientRect().width>0};return {desktopNav:visible('.navigation_wrapper'),mobileNav:visible('.site-header__mobile-nav'),searchInput:visible('#predictive-search-drawer-input'),headerSearchButton:visible('.header-search-button')}});
 console.log(width,JSON.stringify(state));await page.close();
}await browser.close();
