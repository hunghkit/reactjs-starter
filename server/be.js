import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import bodyParser from 'body-parser';
import '@server/helpers/prototype';
import RoutesV1 from '@server/api/v1.0.0';

const server = express();
const secret = process.env.SECRET || 'CRBeL8o5JZsLOG123asd4O2312FcjqWpr';

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "Token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use(cookieParser());
server.use(bodyParser.json());
server.use(methodOverride('X-HTTP-Method-Override'));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(session({ secret, resave: false, saveUninitialized: true }));

RoutesV1(server);

server.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    throw err;
  }

  console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
});
