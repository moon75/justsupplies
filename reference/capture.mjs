import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const root = new URL('./', import.meta.url);
await mkdir(new URL('./screenshots/', root), { recursive: true });
const browser = await chromium.launch({headless:true, executablePath:'/usr/bin/google-chrome', args:['--no-sandbox']});
const origin = 'https://www.woodtowater.co.uk';
const pages = {
  home: '/',
  collection_tents: '/collections/lightweight-hiking-tents',
  collection_stoves: '/collections/camping-gas-stoves',
  product: '/products/3fulgear-bathtub-footprint-small-medium',
  product_tent: '/collections/lightweight-hiking-tents/products/3fulgear-lanshan-2-tent-green',
  cart_page: '/cart',
};
const selectors = {
  body:'body', announcement:'[aria-label="Shipping promotion"]',
  header:'header.site-header', headerTop:'.header_top', logo:'.site-header__logo',
  nav:'.navigation_wrapper', navList:'.main_nav-bar_linklist', navItem:'.main_nav-bar_linklist > li',
  searchButton:'button[aria-label="Search"]', cartButton:'#HeaderCart',
  pageWidth:'.page-width', main:'#MainContent', slideshow:'.slideshow',
  heroImage:'.slideshow__slide--active .slideshow__image',
  heroTitle:'.slideshow__slide--active .slideshow__title',
  heroSubtitle:'.slideshow__slide--active .slideshow__subtitle',
  heroCta:'.slideshow__slide--active .slideshow__btn',
  sectionHeader:'.section-header', sectionHeading:'.section-header h2',
  productGrid:'.product-grid', productCard:'.product-card',
  productCardContainer:'.product-item-block', productCardImage:'.product-card__image-wrapper',
  productCardTitle:'.product-card__title', productCardPrice:'.price',
  collectionTile:'.collection-grid-item', footer:'footer.site-footer',
  collectionHeader:'.collection-header', collectionTitle:'h1',
  filterPanel:'.filters-toolbar-wrapper', productGallery:'.product-single__photos',
  productInfo:'.product-single__meta', productTitle:'h1.product-single__title',
  productPrice:'.product__price', addToCart:'.product-form__cart-submit',
  cartDrawer:'#sidebar-cart', searchInput:'#predictive-search-drawer-input',
};
const cssFields = ['display','position','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color','backgroundColor','backgroundImage','width','maxWidth','height','minHeight','marginTop','marginRight','marginBottom','marginLeft','paddingTop','paddingRight','paddingBottom','paddingLeft','borderTopWidth','borderTopStyle','borderTopColor','borderRadius','boxShadow','gap','gridTemplateColumns','flexDirection','justifyContent','alignItems','textTransform'];

async function measure(page) {
  return page.evaluate(({selectors,cssFields}) => {
    const found={};
    for(const [name,selector] of Object.entries(selectors)) {
      const nodes=[...document.querySelectorAll(selector)];
      const visible=nodes.filter(e => {const r=e.getBoundingClientRect(); const s=getComputedStyle(e);return r.width>0 && r.height>0 && s.visibility!=='hidden' && s.display!=='none'});
      const picked=visible[0]||nodes[0];
      if(!picked){found[name]={count:0};continue;}
      const r=picked.getBoundingClientRect(),s=getComputedStyle(picked);
      found[name]={selector,count:nodes.length,visibleCount:visible.length,text:(picked.innerText||picked.getAttribute('alt')||'').trim().replace(/\s+/g,' ').slice(0,130),rect:{x:r.x,y:r.y,width:r.width,height:r.height},css:Object.fromEntries(cssFields.map(k=>[k,s[k]]))};
    }
    const headings=[...document.querySelectorAll('main h1, main h2')].filter(e=>getComputedStyle(e).display!=='none').map(e=>({tag:e.tagName,text:e.textContent.trim().slice(0,100),fontSize:getComputedStyle(e).fontSize,fontWeight:getComputedStyle(e).fontWeight})).slice(0,35);
    const cardRects=[...document.querySelectorAll('.product-item-block')].slice(0,8).map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}});
    return {url:location.href,title:document.title,viewport:{width:innerWidth,height:innerHeight},document:{width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight},elements:found,headings,firstCardRects:cardRects,fonts:[...document.fonts].map(f=>({family:f.family,weight:f.weight,status:f.status})).filter(f=>f.status==='loaded').slice(0,30)};
  },{selectors,cssFields});
}

const output={capturedAt:new Date().toISOString(),browser:'Google Chrome via Playwright',measurements:{},interactions:{},errors:{}};
for(const [name,path] of Object.entries(pages)) {
  if(process.argv[2] && process.argv[2]!==name)continue;
  const widths=name==='home'?[1440,1280,768,390]:name==='collection_tents'||name==='product'?[1440,390]:[1440];
  for(const width of widths){
    const key=`${name}_${width}`;
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
    try {
      const response=await page.goto(origin+path,{waitUntil:'domcontentloaded',timeout:60000});
      await page.waitForTimeout(2000);
      await page.evaluate(async()=>{await document.fonts.ready;});
      const fullHeight=await page.evaluate(()=>document.documentElement.scrollHeight);
      for(let y=0;y<fullHeight;y+=700){await page.evaluate(scrollY=>scrollTo(0,scrollY),y);await page.waitForTimeout(120);}
      await page.evaluate(()=>scrollTo(0,0));
      await page.waitForTimeout(600);
      output.measurements[key]={httpStatus:response?.status(),...(await measure(page))};
      await page.screenshot({path:new URL(`./screenshots/${key}.png`,root).pathname,fullPage:true,animations:'disabled',timeout:45000});
      console.log(`captured ${key}: ${response?.status()} ${output.measurements[key].document.height}px`);
      if(name==='home' && width===1440){
        const allProducts=page.locator('.main_nav-bar_linklist > li').filter({hasText:'All Products'}).first();
        if(await allProducts.count()){
          await allProducts.hover();await page.waitForTimeout(400);
          output.interactions.desktopMenu=await page.evaluate(()=>{const e=document.querySelector('#dropdown-desktop-menu-0-2');if(!e)return null;const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {visible:r.width>0&&r.height>0,rect:{x:r.x,y:r.y,width:r.width,height:r.height},display:s.display,background:s.backgroundColor,columns:[...e.querySelectorAll(':scope > li')].map(x=>x.querySelector('a')?.textContent.trim()).filter(Boolean)};});
          await page.screenshot({path:new URL('./screenshots/navigation-desktop.png',root).pathname,fullPage:false});
        }
        const search=page.getByRole('button',{name:'Search'}).first();
        if(await search.count()){
          await search.click();await page.waitForTimeout(400);
          output.interactions.searchOpen=await measure(page);
          await page.screenshot({path:new URL('./screenshots/search-open-desktop.png',root).pathname,fullPage:false});
          const input=page.locator('#predictive-search-drawer-input');
          if(await input.isVisible()){
            await input.fill('tent');await page.waitForTimeout(900);
            output.interactions.searchQuery={url:page.url(),visibleText:(await page.locator('body').innerText()).slice(0,1600)};
            await page.screenshot({path:new URL('./screenshots/search-results-desktop.png',root).pathname,fullPage:false});
          }
        }
      }
      if(name==='home' && width===390){
        const mobile=page.locator('[aria-label*="menu" i], .site-header__menu').first();
        if(await mobile.count()){
          await mobile.click().catch(()=>{});await page.waitForTimeout(300);
          output.interactions.mobileMenu={visibleText:(await page.locator('body').innerText()).slice(0,1200)};
          await page.screenshot({path:new URL('./screenshots/navigation-mobile.png',root).pathname,fullPage:false});
        }
      }
    }catch(error){output.errors[key]=String(error);console.error(key,String(error));}
    await page.close();
  }
}
if(process.argv[2]){
  const {readFile}=await import('node:fs/promises');
  const existing=JSON.parse(await readFile(new URL('./design-tokens.json',root),'utf8'));
  Object.assign(existing.measurements,output.measurements);Object.assign(existing.errors,output.errors);
  await writeFile(new URL('./design-tokens.json',root),JSON.stringify(existing,null,2));
}else await writeFile(new URL('./design-tokens.json',root),JSON.stringify(output,null,2));
await browser.close();
