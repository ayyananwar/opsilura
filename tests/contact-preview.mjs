import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch();const page=await browser.newPage();
for(const width of [390,1440]){
 await page.setViewportSize({width,height:1000});
 await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
 await page.locator('form[data-ready=true]').waitFor();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.locator('#contact').screenshot({path:`artifacts/contact-${width}.png`});
}
await browser.close();console.log('Contact screenshots saved for phone and desktop.');
