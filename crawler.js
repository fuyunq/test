const puppeteer = require('puppeteer');

process.on('uncaughtException', function (e) {
    console.log(e);
    // 异常可以选择不退出

});
exports.test = async function test(url) {
    console.log(url);
    const browser = await puppeteer.launch({
        headless: false,
        // args: ['--proxy-server=forward.xdaili.cn:80'],
        // args: ['--proxy-server=forward.xdaili.cn:80'],
        ignoreDefaultArgs: ['--enable-automation'],
        timeout: 10000,


    });


    const page = await browser.newPage();

// Pass the Languages Test.
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
        });
    });
    await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        Object.defineProperty(navigator, 'languages', {
            get: () => ['zh-cn', 'zh'],
        });
    });
    await page.setViewport({
        width: 1200,
        height: 800
    });
    let userAgent2 = 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Mobile Safari/537.36';
    const userAgent = 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Mobile Safari/537.36';
    await page.setUserAgent(userAgent2);


// Pass the Chrome Test.
    await page.evaluateOnNewDocument(() => {
        // We can mock this in as much depth as we need for the test.
        window.chrome = {
            runtime: {},
            // etc.
        };
    });
    // Pass the Permissions Test.
    await page.evaluateOnNewDocument(() => {
        const originalQuery = window.navigator.permissions.query;
        return window.navigator.permissions.query = (parameters) => (
            parameters.name === 'notifications' ?
                Promise.resolve({state: Notification.permission}) :
                originalQuery(parameters)
        );
    });
// Pass the Plugins Length Test.
    await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        Object.defineProperty(navigator, 'plugins', {
            // This just needs to have `length > 0` for the current test,
            // but we could mock the plugins too if necessary.
            get: () => [1, 2, 3, 4, 5],
        });
    });

    let tmp = Date.parse(new Date()).toString();
    tmp = tmp.substr(0, 10);
//   console.log(tmp);
    let text = "orderno=ZF201712242879fAzefS,secret=3ecde279cc8c45b585a9f3270bc53d0b,timestamp=" + tmp;
// console.log(text);
    let crypto = require('crypto');
    let md5 = crypto.createHash('md5');
// console.log(md5);
    let sign = md5.update(text).digest('hex').toLocaleUpperCase();
    let head = "sign=" + sign + "&orderno=" + "ZF201712242879fAzefS" + "&timestamp=" + tmp;
//     console.log(head);
//     await page.setExtraHTTPHeaders({'Proxy-Authorization': head});
    // await page.goto('http://www.ip138.com/');
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    await page.waitFor(1000);
    let result = {};

    // await page.waitForSelector("head > title");
    // result.title = await page.$eval('head > title', el => el.textContent);

    // await page.waitForSelector("#video-player");

    result.videoUrl = await page.$eval('#video-player', el => el.src);
    result.img = await page.$eval('#video-player', el => el.poster);

    return result;
    // Pass the Webdriver Test.

// await page.scrshot({
//         path: '1.png',
//         fullPage: true
//     });
    // await autoScroll(page);


// //result.authorImg = await page.$eval("#video-box > div.player-info-bar > div > div.follow-card.open-or-download-app > div.user > div.avatar", ele => ele.style.background-image);
//     try{
//         console.log('开始');
//         result.video = await page.$eval("#video-player", ele => ele.src);
//         console.log('结束');
//     }
//     catch(e){
//     }
//     console.log('下一轮');
//     result.title = await page.$eval("title",el => el.textContent);
//     try{result.coverUrl = await page.$eval("#video-player",el => el.src);
//     }
//     catch(e){
//
//     }
// //     try{
// //         result.authorName = await page.$eval("#video-box > div.player-info-bar > div > div.follow-card.open-or-download-app > div.user > div.info > div.name",el => el.textContent);
// //     }
// //     catch(e){
// //     }
// //console.log(result.authorImg);
//     return result;

//     await browser.close();
};


// function autoScroll(page) {
//     return page.evaluate(() => {
//         return new Promise((resolve, reject) => {
//             var totalHeight = 0;
//             var distance = 100;
//             var timer = setInterval(() => {
//                 var scrollHeight = document.body.scrollHeight;
//                 window.scrollBy(0, distance);
//                 totalHeight += distance;
//                 if (totalHeight >= scrollHeight) {
//                     clearInterval(timer);
//                     resolve();
//                 }
//             }, 100);
//         })
//     });
// }