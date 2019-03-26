//read node modules http, url,fs,path

//define port number to listen with process object

//define file types

//create a server 

//parse url, sanitize path

//set pathname 

// check if there is any error and if not, sync an index.html file from a local directry to the local server
//extract data from the file

const http=require('http');
const url=require('url');
const fs=require('fs');
const path=require('path');

//if we wanna give argv[2], we can do - node server.js 1111 and it makes the server port become 1111 
const port=process.argv[2] || 8000;

const fileType={
    '.icon': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpeg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'imnage/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/font-sfnt'
}

http.createServer(function (req,res){
    const parsedUrl=url.parse(req.url);
    console.log('parsedURL: ', req.method, req.url);
    
    //replace all unnecessary symbols with empty string
    const sanitizePath=path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
    let pathName=path.join(__dirname, sanitizePath);
    fs.exists(pathName, function (exist){
        if(!exist){
            res.statusCode=404;
            res.end(`File${pathName} not found`);
            return
        }
        //if it's directory
        if(fs.statSync(pathName).isDirectory())pathName+='/index.html';
        console.log('req.getHeader Content-Type: ', req);
        
        fs.readFile(pathName, function (err,data){
            if(err){
                res.statusCode=500;
                res.end(`Error getting the file`);
            }else{
                let ext=path.parse(pathName).ext;
                res.setHeader('Content-type', fileType[ext] || 'text/html');
                res.end(data);
            }
        })
    })
}).listen(parseInt(port));

