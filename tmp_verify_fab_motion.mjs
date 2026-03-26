import { chromium } from '@playwright/test';

const url = 'https://id-preview--25b5aa65-a98f-48d7-ae00-24553ae2ebed.lovable.app/';
const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 834, height: 1194 },
  { name: 'desktop', width: 1366, height: 768 },
];

const selectors = {
  whatsapp: '.floating-fab-whatsapp',
  booking: '.floating-fab-booking',
  badge: '.floating-free-badge',
};

const browser = await chromium.launch({ headless: true });

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1300);

  const report = await page.evaluate(async (selectors) => {
    const sampleOne = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return {
        top: Number(rect.top.toFixed(2)),
        animationName: style.animationName,
        animationDuration: style.animationDuration,
      };
    };

    const out = {};
    for (const [key, sel] of Object.entries(selectors)) {
      const el = document.querySelector(sel);
      if (!el) {
        out[key] = { found: false };
        continue;
      }

      const samples = [];
      for (let i = 0; i < 8; i++) {
        samples.push(sampleOne(el));
        await new Promise((r) => setTimeout(r, 300));
      }

      const tops = samples.map((s) => s.top);
      out[key] = {
        found: true,
        movementPx: Number((Math.max(...tops) - Math.min(...tops)).toFixed(2)),
        animationName: samples[0].animationName,
        animationDuration: samples[0].animationDuration,
      };
    }

    return out;
  }, selectors);

  console.log(`\n[${vp.name}] ${vp.width}x${vp.height}`);
  console.log(JSON.stringify(report, null, 2));

  await context.close();
}

await browser.close();
