### Reactjs-starter

- This is a simple template project Reactjs and Nextjs. It is included front-end and back-end
- Front-end: [Reactjs](https://reactjs.org), [Nextjs](https://nextjs.org), [Redux](https://redux.js.org), [Redux-saga](https://redux-saga.js.org/), [Immutablejs](https://www.npmjs.com/package/immutable), [Reselect](https://github.com/reduxjs/reselect), [reduxsauce](https://github.com/infinitered/reduxsauce) [Ant design](https://ant.design)...etc
- Back-end: [Nodejs](https://nodejs.org/en/), [Expressjs](https://expressjs.com/), [Sequelize](http://docs.sequelizejs.com/), [Sequelize-sql](https://www.npmjs.com/package/sequelize-sql), [Jsonwebtoken](https://jwt.io/)...etc

## Required
1. Install Nodejs [click here](https://nodejs.org/en)
2. Heroku account [click here](https://heroku.com) if you want to deploy with heroku
3. Amazon account [click here](https://aws.amazon.com/) if you want to deploy with amazon
4. Install PostgreSQL [click here](https://www.postgresql.org/) if you want to use postgresql database
## Use for development
```
1: git clone git@github.com:hunghkit/reactjs-starter.git
2: cd reactjs-starter
3: yarn install or npm install
4: Add ENV: cp .env.example .env

5.1: Run front-end and back-end in a terminal: yarn dev or npm run dev
5.2: Seperate front-end and back-end
5.2.1: Run front-end: yarn fe or npm run fe
5.2.1: Run back-end: yarn be or npm run be
```

## Preview build project
```
1: Build project: yarn build or npm run build
2: Start peview: yarn start or npm start
```
## Deployment with heroku
- Setup:
```
1. `heroku create $APP_NAME`
2. `heroku buildpacks:add heroku/nodejs`
```
- Deploy:
```
1. Deploy from master branch: git push heroku master
2. Deploy from other branch: git push heroku yourbanch:master
```

## Done
1. Config project reactjs 16.8.1 and nextjs
2. Use scss with node-sass
3. Renderserver via nextjs
4. Deploy with heroku
5. Integrate redux
6. Integrate redux-form
7. JWT in server
8. Example with REST
## Demo [click here](https://reactjs-next.herokuapp.com/)
## Licence: MIT
