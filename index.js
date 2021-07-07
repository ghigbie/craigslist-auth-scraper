const request = require('request-promise');
const fs = require("fs");
const {username, password} = require('./creds');


const main = async () => {
    try{
        const html = await request.post("https://accounts.craigslist.org/login", {
            form: {
                inputEmailHandle: username,
                inputPassword: password,
            },
            headers: {
                Referer: 'https://accounts.craigslist.org/login'
            },
            simple: false,
            followAllRedirects: true,
        });
        fs.writeFileSync("./login.html", html)
    }catch (error){
        console.log('*********************************');
        console.log('Error: ', error);
        console.log('*********************************');
    }
}

main();