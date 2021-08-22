const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (method === 'GET') {
    res.setHeader('Content-Type', 'text/html');

    res.write(`
    <html>
      <head>
        <title>My First Page</title>
      </head>
      <body>
  `);
  }

  if (url === '/') {
    res.write(`
    <form action="/message" method="POST">
      <input type="text" name="message" />
      <button type="submit">Submit</button>
    </form>
  `);
  } else if (url === '/message' && method === 'POST') {
    const body = [];

    req.on('data', chunk => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  res.write(`
    </body>
  </html>
`);

  res.end();
};

// module.exports = {
//   handler: requestHandler,
// };

exports.handler = requestHandler;
