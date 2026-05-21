import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const OUT = 'C:/Users/Ziaul/AppData/Local/Temp/bq_stories'
mkdirSync(OUT, { recursive: true })

const stories = [
  { id: 'organisms-bigqueryonboardingmodal--idle',       out: 'idle.png' },
  { id: 'organisms-bigqueryonboardingmodal--connecting', out: 'connecting.png' },
  { id: 'organisms-bigqueryonboardingmodal--connected',  out: 'connected.png' },
  { id: 'organisms-bigqueryonboardingmodal--failed',     out: 'failed.png' },
]

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })

for (const s of stories) {
  const url = `http://localhost:6006/iframe.html?args=&id=${s.id}&viewMode=story`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  // Wait for modal portal to render
  await page.waitForSelector('[role="dialog"]', { timeout: 10000 })
  await page.waitForTimeout(500)
  const path = `${OUT}/${s.out}`
  await page.screenshot({ path, fullPage: false })
  console.log('saved', path)
}

await browser.close()
