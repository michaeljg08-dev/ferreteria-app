const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3001;
const directory = 'c:/Users/Usuario/.gemini/antigravity/scratch/ferreteria-app';

const server = http.createServer((req, res) => {
  let filePath = path.join(directory, req.url === '/' ? 'hr-ferreteria-v2.html' : req.url);
  
  if (filePath.includes('?')) {
    filePath = filePath.split('?')[0];
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.webp':
      contentType = 'image/webp';
      break;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
