import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1440,height:900}});
await page.goto('https://www.woodtowater.co.uk/',{waitUntil:'domcontentloaded'});
const groups=await page.evaluate(()=>[...document.querySelectorAll('#dropdown-desktop-menu-0-2 > li')].map(group=>{
  const title=group.querySelector(':scope > a');
  const label=title?.textContent.trim().replace(/\s+/g,' ')||'';
  const links=[...group.querySelectorAll(':scope > ul a[href]')].map(a=>({label:a.textContent.trim().replace(/\s+/g,' '),href:a.getAttribute('href')})).filter(x=>x.href&&x.href!=='#');
  if(!links.length&&title?.getAttribute('href')&&title.getAttribute('href')!=='#')links.push({label,href:title.getAttribute('href')});
  return {label,links};
}).filter(x=>x.label));
await writeFile(new URL('../src/components/header/product-groups.json',import.meta.url),JSON.stringify(groups,null,2));
console.log(groups.map(g=>`${g.label}: ${g.links.length}`).join('\n'));
await browser.close();
