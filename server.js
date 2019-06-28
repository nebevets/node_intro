// Build Static Webserver Here
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log('request url: ', req.url);
  let filePath = '.' + req.url;

  if(filePath === './'){
    filePath = './index.html';
  }

  const fileExt = path.extname(filePath);
  
  const mimeTypes = {
    '.html' : 'text/html',
    '.css' : 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
    '.jpg': 'image/jpg'
  };

  const contentType = mimeTypes[fileExt];

  fs.readFile(filePath, (err, content) => {
    if(err || !contentType){
      console.log('file load error', err);
      if(err.code === 'ENOENT'){
        return fs.readFile('./404.html', (err, content) => {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end(content, 'utf-8');
        });
      }
      res.writeHead(500);
      return res.end('internal server error');
    }
    res.writeHead(200, {
      'Content-Type': contentType
    });
    res.end(content, 'utf-8');
  });
});

server.listen(3001);

console.log('server listening for localhost:3001');
console.log('"control + c" to stop exit');
