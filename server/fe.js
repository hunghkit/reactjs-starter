import next from 'next';
import express from 'express';
import Routes from '@server/routes';

const { parse } = require('url');
const { join } = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const devProxy = {
  '/api': {
    target: process.env.BE_API_URL || 'http://localhost:3000',
    changeOrigin: true
  }
}

app.prepare()
  .then(() => {
    const server = express();

    if (dev && devProxy) {
      const proxyMiddleware = require('http-proxy-middleware')
      Object.keys(devProxy).forEach(function (context) {
        server.use(proxyMiddleware(context, devProxy[context]))
      })
    }

    Routes(app, server);
    const rootStaticFiles = ['/robots.txt', '/sitemap.xml', '/favicon.ico', '/public/css/template.css'];

    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const path = join(__dirname, '../static', parsedUrl.pathname);

      if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
        app.serveStatic(req, res, path)
      } else {
        handle(req, res)
      }
    });

    server.listen(process.env.PORT || 3000, (err) => {
      if (err) {
        throw err;
      }

      console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
