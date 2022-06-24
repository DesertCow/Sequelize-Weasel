const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable Routes
app.use(routes);

// Enable connection to Remote DB and Start Local server for API to connect
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`\n\x1b[42m  ~~~ Server Start Success! ~~~  \x1b[0m`);
    console.log(`\x1b[43m    http://localhost:${PORT}/api/   \x1b[0m`);
    //TODO Add print out of API commands/paths
  });
});