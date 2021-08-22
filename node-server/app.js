const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;

  res.setHeader('Content-Type', 'text/html');

  res.write(`
    <html>
      <head>
        <title>My First Page</title>
      </head>
      <body>
  `);

  if(url === '/') {
    res.write(`
      <form action="/message" method="POST">
        <input type="text" name="message" />
        <button type="submit">Submit</button>
      </form>
    `);
  }

  res.write(`
      </body>
    </html>
  `);

  res.end();
});

server.listen(3000);
