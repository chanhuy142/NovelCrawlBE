const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const puppeteer = require('puppeteer-extra')
const pluginStealth = require('puppeteer-extra-plugin-stealth')
const { executablePath } = require('puppeteer')

const link = 'https://truyenfull.vn/ngao-the-dan-than/chuong-1/'

const getHtmlThoughCloudflare = async (url) => {
  puppeteer.use(pluginStealth())
  const result = await puppeteer
    .launch({ headless: true })
    .then(async (browser) => {
      const page = await browser.newPage()
      await page.goto(url)
      
     html = await page.content()
   
    const regex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
    
  
    html = html.replace(regex, '')
      await browser.close()
      return html
    })

  //console.log(` HTML: ${result}`)
  return result // html
}

const getContent = async (url) => {
    const html = await getHtmlThoughCloudflare(url)
    const dom = new JSDOM(html)
    const content = dom.window.document.querySelector('.chapter-c').textContent
    


    
    return content
    }

getContent(link).then(content => {
    console.log(content)
})

