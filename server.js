// import url, fs, and http modules

const http = require('http'),
  fs = require('fs'),
  url = require('url');

// create server

http.createServer((request, response) => {
  let addr = request.url,
    q = new URL(addr, 'http://' + request.headers.host),
    filePath = '';

// log the request

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  });

// check if the request is for documentation, else serve the home page

  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

// read the file and serve it to the client

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });

// declare the port as 8080  

}).listen(8080);

// log message to the console declaring the server is running and on which port
console.log('My test server is running on Port 8080.');


