const { spawn } = require('node:child_process');
const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;

async function waitForReady(url, attempts = 30) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch (_error) {
      // The server may still be starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`API did not become ready at ${url}`);
}

async function main() {
  const server = spawn(process.execPath, ['src/server.js'], {
    env: { ...process.env, PORT: '3100', NODE_ENV: 'test' },
    stdio: 'inherit',
  });
  let browser;
  let context;
  try {
    await waitForReady('http://127.0.0.1:3100/health');
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:3100/', { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page }).analyze();
    if (results.violations.length > 0) {
      const summary = results.violations.map(({ id, impact, nodes }) => ({
        id,
        impact,
        nodes: nodes.length,
      }));
      throw new Error(`Accessibility violations: ${JSON.stringify(summary)}`);
    }
    console.log('Accessibility check passed with 0 Axe violations.');
  } finally {
    if (context) await context.close();
    if (browser) await browser.close();
    server.kill('SIGTERM');
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
