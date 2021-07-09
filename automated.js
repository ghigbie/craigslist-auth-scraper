const puppeteer = require("puppeteer");
const {username, password} = require('./creds');

const loginPage = "https://accounts.craigslist.org/login";
const draftsPage = "https://accounts.craigslist.org/login/home?show_tab=drafts";

const main = async () => {
    try{
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto(loginPage);
        await page.type('input#inputEmailHandle', username, {delay: 2});
        await page.type('input#inputPassword', password, {delay: 2});
        await page.click('button#login');
        await page.waitForNavigation();
        const drafts = await page.goto(draftsPage);
        console.log(drafts);
    }catch (error){
        console.log('***************************');
        console.log('Error: ', error);
        console.log('***************************');
    }
}

main();
