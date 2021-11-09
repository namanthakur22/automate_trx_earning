import puppeteer from "puppeteer-extra";
import RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha";
import bypass from "./bypass/captchaBypasser.js";

puppeteer.use(
    RecaptchaPlugin({
        provider: {
            fn: bypass,
        },
    })
);
 
puppeteer.launch({headless: false, userDataDir: './cache', args: ["--proxy-server=proxyaddress","--no-sandbox", "--disable-setuid-sandbox"]}).then(async (broswer) => {
    const page = await broswer.newPage()
    await page.authenticate({
        username: 'username',
        password: 'password'
    })
    await page.goto('https://trxking.site/')
    await page.waitFor(5000)
    console.log('solving captcha...')
    await page.solveRecaptchas()
    console.log('Captcha solved')
    await page.$eval('input[class=form-control]', el => el.value = 'TB4JgNdd7562Aq7J9akDY2ARxPuuv7LY2s')
    await page.waitFor(15000)
    await Promise.all([page.click('input[class="btn btn-primary btn-lg claim-button"]'), page.waitForNavigation()])
    const info = await page.$eval("body > div.container-fluid > div:nth-child(2) > div.col-xs-12.col-md-6.col-md-push-3.text-success.active > div", el => el.textContent)
    console.log(info)
    await broswer.close()
})