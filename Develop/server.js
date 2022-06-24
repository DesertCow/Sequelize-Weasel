const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const seedAll = require('./seeds/index');
const { init } = require('./models/Category');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable Routes
app.use(routes);

// Validate Connection to DB
connectionTest();


// Enable connection to Remote DB and Start Local server for API to connect
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`\n\x1b[42m  ~~~ Local Server Start Success! ~~~  \x1b[0m`);
    console.log(`\x1b[45m    http://localhost:${PORT}/api/   \x1b[0m`);
    //TODO Add print out of API commands/paths

    server_init();

  });
});




//!=========================== Main Functions ==========================

async function connectionTest() {

  try {
    await sequelize.authenticate();
    console.log(`\n\x1b[42m  ~~~ Remote DB Connection Valid ~~~  \x1b[0m\n`);
  } catch (error) {
    console.error('\n\n\x1b[41mUnable to connect to the database!\x1b[0m\n\x1b[43mERROR:', error + "\x1b[0m\n\n");
  }

  //sequelize.close()
};


async function server_init() {

  // Seed DB
  seedAll();
  //TODO: Add Try/Catch if seeding fails

};




//!========================= EOF =========================