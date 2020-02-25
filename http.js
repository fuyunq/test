let http = require('http');
let url = require('url');
const querystring = require('querystring');

let crawler = require('./crawler.js');
http.createServer(function (request, response) {
    let parseResult =  url.parse(request.url);
    if(parseResult.query!=null){
        let json = querystring.parse(parseResult.query);
        if(json.type==='1'){
            // response.writeHead(200,{'content-type':'application/json'});
            // let res={"video":"http://alimov2.a.yximgs.com/bs2/newWatermark/MTMyNzgxMDg2MTE_zh_4.mp4\n"};
            // let text =JSON.stringify(res);
            // response.write(text);
            // response.end();
            crawler.test(json.url).then(result=>{
                response.writeHead(200,{'content-type':'application/json'});
                let res={"video":result.videoUrl,"img":result.img};
                let text =JSON.stringify(res);
                console.log(text);
                response.write(text);
                response.end();
            }).catch(function (error) {
                console.log('',error);
            });

        }else {
            response.writeHead(400,{'content-type':'application/json'});
            response.end();
        }

    }

}).listen(3000);