const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if(url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
      <head>
        <title>Assignment 1</title>
      </head>
      <body>
        <h1>Welcome!</h1>
        <br>
        <form action="/create-user" method="POST">
          <input type="text" name="username" value="User 5">
          <button type="submit">Submit</button>
        </form>
      </body>
      </html>
    `);
    return res.end();
  }

  if(url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
      <head>
        <title>Assignment 1</title>
      </head>
      <body>
        <ul>
          <li>User 1</li>
          <li>User 2</li>
          <li>User 3</li>
          <li>User 4</li>
        </ul>
      </body>
      </html>
    `);
    return res.end();
  }

  if(url === '/create-user' && method === 'POST') {
    const body = [];

    req.on('data', chunk => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      console.log(username);
    });

    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  res.setHeader('Content-Type', 'text/html');
  res.write(`
    <html>
    <head>
      <title>Assignment 1</title>
    </head>
    <body>
      <h1>Page not found</h1>
    </body>
    </html>
  `);
  res.end();
};

exports.requestHandler = requestHandler;
