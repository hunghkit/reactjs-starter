import next from 'next';
import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import bodyParser from 'body-parser';
import '@server/helpers/prototype';
import Routes from '@server/routes';
import RoutesV1 from '@server/api/v1.0.0';

const cloudinary = require('cloudinary').v2;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    const secret = process.env.SECRET || 'CRBeL8o5JZsLOG123asd4O2312FcjqWpr';
    Routes(app, server);

    if (process.env.CLOUDINARY_URL) {
      cloudinary.config();
    }

    server.use(cookieParser());
    server.use(bodyParser.json());
    server.use(methodOverride('X-HTTP-Method-Override'));
    server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    server.use(session({ secret, resave: false, saveUninitialized: true }));

    RoutesV1(server);

    server.get('*', (req, res) => handle(req, res));

    server.listen(3005, (err) => {
      if (err) {
        throw err;
      }

      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
