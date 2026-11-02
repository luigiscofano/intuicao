// Testes e verificações de componentes compartilhados do Intuição.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } }),
    errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(process.env.INTUICAO_URL || 'http://127.0.0.1:8777/');
  const collection = async (game) =>
    JSON.parse(await page.evaluate(() => localStorage.getItem('intuicao.collection.v1'))).endless[
      game
    ];
  const original = async (game) =>
    JSON.parse(await page.evaluate(() => localStorage.getItem('intuicao.endless.original.v1')))[
      game
    ];
  for (const game of ['light', 'cut', 'elo', 'prumo', 'pacto', 'desvio']) {
    const isOriginal = ['light', 'cut'].includes(game),
      nav = `[data-${isOriginal ? 'game' : 'collection'}="${game}"]`,
      entry = isOriginal ? '#selection-free' : '#c-free';
    await page.locator(nav).click();
    await page.locator(entry).click();
    await page
      .locator(isOriginal ? '#original-endless' : '#c-endless-new')
      .waitFor({ state: 'visible' });
    let saved = await (isOriginal ? original(game) : collection(game));
    const seed = saved.seed;
    if (isOriginal) {
      await page.locator('#original-endless summary').click();
      await page.locator('#original-endless-new').click();
    } else await page.locator('#c-endless-new').click();
    saved = await (isOriginal ? original(game) : collection(game));
    assert.notEqual(saved.seed, seed, game + ' new seed');
    const seed2 = saved.seed;
    await page.locator(isOriginal ? '#reset' : '#c-reset').click();
    await page
      .locator(isOriginal ? '#restart-original-confirm' : '#restart-collection-confirm')
      .click();
    saved = await (isOriginal ? original(game) : collection(game));
    assert.equal(saved.seed, seed2, game + ' reset keeps seed');
    await page.reload();
    await page.locator(nav).click();
    await page.locator(entry).click();
    saved = await (isOriginal ? original(game) : collection(game));
    assert.equal(saved.seed, seed2, game + ' reload keeps seed');
    await page.setViewportSize({ width: 390, height: 844 });
    const dims = await page.evaluate(() => ({
      w: innerWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    assert.ok(dims.scroll <= dims.w + 1, game + ' mobile overflow ' + JSON.stringify(dims));
    await page.screenshot({ path: `/tmp/intuicao-endless-${game}.png`, fullPage: true });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.locator(isOriginal ? '#back-selection' : '#c-back').click();
    if (isOriginal) await page.locator('[data-level="0"]').click();
    else if (game !== 'desvio') await page.locator('[data-new-level="0"]').click();
    else await page.locator('[data-map="0"]').click();
    assert.equal(
      await page
        .locator(isOriginal ? '#original-endless:visible' : '.endless-panel:visible')
        .count(),
      0,
      game + ' campaign panel hidden',
    );
    console.log('PASS browser', game, 'entry/new/reset/reload/mobile/campaign isolation');
  }
  assert.deepEqual(errors, []);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
