import next from 'next';
import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import bodyParser from 'body-parser';
import '@server/helpers/prototype';
import Routes from '@server/routes';
import RoutesV1 from '@server/api/v1.0.0';

const { parse } = require('url');
const { join } = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    const secret = process.env.SECRET || 'CRBeL8o5JZsLOG123asd4O2312FcjqWpr';

    server.use(cookieParser());
    server.use(bodyParser.json());
    server.use(methodOverride('X-HTTP-Method-Override'));
    server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    server.use(session({ secret, resave: false, saveUninitialized: true }));

    RoutesV1(server);
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

      console.log(`> [${process.env.NODE_ENV || ''}] Ready on http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
