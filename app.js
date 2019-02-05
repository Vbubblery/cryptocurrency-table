const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');
const cors = require('cors')
const routes = require('./routers');
const rp = require('request-promise');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();
  server.use(cors());
  server.get('/api/cryptocurrency/listings/latest',async(req,res)=>{
    const requestOptions = {
      method: 'GET',
      uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      qs: req.query,
      headers: {
        'X-CMC_PRO_API_KEY': '2d865ef2-013b-48ee-b7fc-deb3713922b3'
      },
      json: true,
      gzip: true
    };
    var result = await rp(requestOptions);
    res.send(result);
  })
  server.get('*', (req, res) => handler(req, res));
  server.use(handler).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`)
  })
});
