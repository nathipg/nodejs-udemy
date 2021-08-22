const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if(method === 'GET') {
    res.setHeader('Content-Type', 'text/html');

    res.write(`
      <html>
        <head>
          <title>My First Page</title>
        </head>
        <body>
    `);
  }

  if(url === '/') {
    res.write(`
      <form action="/message" method="POST">
        <input type="text" name="message" />
        <button type="submit">Submit</button>
      </form>
    `);
  } else if(url === '/message' && method === 'POST') {
    fs.writeFileSync('message.txt', 'DUMMY');
    res.statusCode = 302;
    res.setHeader('Location', '/');
  }

  if(method === 'GET') {
    res.write(`
        </body>
      </html>
    `);
  }

  res.end();
});

server.listen(3000);
