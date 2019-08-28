const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

exports.handler = async (event, context, callback) => {
  let theTitle = null
  let browser = null
  console.log('spawning chrome headless')
  try {
    const executablePath = await chromium.executablePath

    console.log(executablePath);
    // setup
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: executablePath,
      headless: chromium.headless,
    })
    console.log('browser set up');

    // Do stuff with headless chrome
    const page = await browser.newPage()
    const targetUrl = 'https://davidwells.io'

    console.log('browser new page')

    // Goto page and then do stuff
    await page.goto(targetUrl, {
      waitUntil: ["domcontentloaded", "networkidle0"]
    })

    console.log('browser page loaded')

    // await page.waitForSelector('#phenomic')

    theTitle = await page.title();

    console.log('done on page', theTitle)

  } catch (error) {
    console.log('error', error)
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: error
      })
    })
  } finally {
    // close browser
    if (browser !== null) {
      await browser.close()
    }
  }

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      title: theTitle,
    })
  })
}