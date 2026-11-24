import { chromium } from 'playwright';
import { readFile, writeFile } from 'node:fs/promises';
const path=new URL('./design-tokens.json',import.meta.url);
const data=JSON.parse(await readFile(path,'utf8'));
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const selectors={shippingBar:'#fsb_bar',shippingText:'[aria-label="Shipping promotion"] [aria-hidden]',headerSection:'.shopify-section-header',headerNavLink:'.main_nav-bar_linklist > li > a',headerSearchInput:'#predictive-search-drawer-input',headerCart:'.cart_icon',heroCta:'.slideshow__slide--active .slideshow__btn',primaryButton:'.product-form__cart-submit',card:'.product-card',cardImage:'.product-card__image',cardVendor:'.product-item__vendor',newsletterInput:'.Form__Input',footerContainer:'.site-footer-wrapper',footerHeading:'.site-footer h4',mobileNav:'.mobile-nav',mobileNavLink:'.mobile-nav a',collectionSidebar:'.sidebar',collectionSort:'select[name="sort_by"]',productOption:'.single-option-selector',quantity:'.product-form__input--quantity'};
for(const [label,url,width] of [['homeDesktop','/',1440],['homeMobile','/',390],['collectionDesktop','/collections/lightweight-hiking-tents',1440],['productDesktop','/products/3fulgear-bathtub-footprint-small-medium',1440]]){
  const page=await browser.newPage({viewport:{width,height:900}});await page.goto('https://www.woodtowater.co.uk'+url,{waitUntil:'domcontentloaded'});await page.waitForTimeout(750);
  data.semantic??={};data.semantic[label]=await page.evaluate(selectors=>{
    const fields=['display','fontFamily','fontSize','fontWeight','lineHeight','color','backgroundColor','backgroundImage','borderWidth','borderStyle','borderColor','borderRadius','boxShadow','padding','margin','maxWidth'];
    const result={};for(const [name,sel] of Object.entries(selectors)){const nodes=[...document.querySelectorAll(sel)];const e=nodes.find(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0})||nodes[0];if(!e){result[name]=null;continue}const r=e.getBoundingClientRect(),s=getComputedStyle(e);result[name]={selector:sel,text:e.innerText?.trim().replace(/\s+/g,' ').slice(0,70)||'',rect:{x:r.x,y:r.y,width:r.width,height:r.height},css:Object.fromEntries(fields.map(k=>[k,s[k]]))}}return result;
  },selectors);await page.close();
}
data.interactionDetails=JSON.parse(await readFile(new URL('./interactions.json',import.meta.url),'utf8'));
await writeFile(path,JSON.stringify(data,null,2));await browser.close();console.log('supplemented design-tokens.json');
