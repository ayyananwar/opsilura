import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch();const page=await browser.newPage();
await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
await page.locator('form[data-ready=true]').waitFor();
for(const width of [320,375,390,768,1024,1440]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow at ${width}px`);}
await page.setViewportSize({width:1440,height:1050});await page.screenshot({path:'artifacts/desktop-hero.png'});
await page.setViewportSize({width:390,height:960});await page.screenshot({path:'artifacts/mobile-hero.png'});
await page.setViewportSize({width:1440,height:1050});
await page.getByRole('button',{name:/02 AI automation/}).click();await page.getByText('For teams buried in repetitive work.').waitFor();
await page.getByRole('button',{name:/02 AI automation/}).click();
await page.getByRole('button',{name:/01 Custom software/}).click();await page.getByText('For businesses outgrowing spreadsheets and off-the-shelf tools.').waitFor();
await page.evaluate(()=>document.querySelectorAll('nextjs-portal').forEach(element=>element.remove()));
await page.screenshot({path:'artifacts/desktop.png',fullPage:true});
console.log('No overflow at 320, 375, 390, 768, 1024 and 1440px. Preview images saved.');await browser.close();
