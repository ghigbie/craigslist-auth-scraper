const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const {username, password} = require('./creds');

const loginPage = "https://accounts.craigslist.org/login";
const draftsPage = "https://accounts.craigslist.org/login/home?show_tab=drafts";

const main = async () => {
    try{
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto(loginPage);
        await page.type('input#inputEmailHandle', username);
        await page.type('input#inputPassword', password);
        await page.click('button#login');
        await page.goto(draftsPage);
       // await page.waitForNavigation();
        const drafts = await page.content();
        const $ = cheerio.load(drafts);
        const message = $('section > fieldset > b').text();
        console.log(message);
    }catch (error){
        console.log('***************************');
        console.log('Error: ', error);
        console.log('***************************');
    }
}

main();
