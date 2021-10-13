const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getDrink': jsonHandler.getDrink,
    '/getUserDrink': jsonHandler.getUserDrink,
    '/getRandomDrink': jsonHandler.getRandomDrink,
    notFound: jsonHandler.getNotReal,
  },
  HEAD: {
    '/getDrink': jsonHandler.getDrinkMeta,
    '/getUserDrink': jsonHandler.getUserDrinkMeta,
    '/getRandomDrink': jsonHandler.getRandomDrinkMeta,
    notFound: jsonHandler.getNotRealMeta,
  },
  POST: {
    '/addUserDrink': jsonHandler.addUserDrink,
    notFound: jsonHandler.getNotReal,
  },
};

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addUserDrink') {
    const res = response;
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      jsonHandler.addUserDrink(request, res, bodyParams);
    });
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  if (urlStruct[request.method][parsedUrl.pathname] && request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else if (urlStruct[request.method][parsedUrl.pathname]) { // GET or HEAD
    urlStruct[request.method][parsedUrl.pathname](request, response, params);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);
