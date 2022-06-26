const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const seedAll = require('./seeds/index');
const { init } = require('./models/Category');
const inquirer = require('inquirer');
const { config } = require('dotenv');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable Routes
app.use(routes);



//!=========================== Main Functions ==========================

async function mainMenu() {

  await 1

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'mainMenuChoice',
        choices: ['Seed Database', 'Test Database Connection', 'Start Application', 'View Enviroment Settings', '\x1b[41mExit\x1b[0m'],
        message: "Please Select from the following options",
      },
    ])
    .then(answers => {

      switch (answers.mainMenuChoice) {
        case 'Seed Database':
          console.log("Seed DB...")
          seedServer();
          break;
        case 'Test Database Connection':
          connectionTest();
          mainMenu()
          break;
        case 'Start Application':
          startLocalServer();
          // console.log("Start Server...")
          break;
        case 'View Enviroment Settings':
          viewEnviromentSettings();
          // console.log("Start Server...")
          break;
        case '\x1b[41mExit\x1b[0m':
          console.log(`\x1b[41m==================== Exit! ====================\x1b[0m`);
          process.exit(1);
          break;
      }
    })

}

async function connectionTest() {

  console.log

  try {
    await sequelize.authenticate();
    console.log(`\n\x1b[42m  ~~~ Remote DB Connection Valid ~~~  \x1b[0m\n`);
  } catch (error) {
    console.error('\n\n\x1b[41mUnable to connect to the database!\x1b[0m\n\x1b[43mERROR:', error + "\x1b[0m\n\n");
  }

  //sequelize.close()
};

async function seedServer() {

  // Seed DB / Catch Fail
  try {
    await seedAll();
    console.log('\n\x1b[42m----- SEEDING COMPLETE/VALID -----\x1b[0m\n');
    mainMenu();
  } catch (error) {
    console.log('\n\x1b[41m----- SEEDING FAILED! -----\x1b[0m\n');
    mainMenu();
  }

};

async function startLocalServer() {

  // Enable connection to Remote DB and Start Local server for API to connect

  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`\n\x1b[42m  ~~~ Local Server Start Success! ~~~  \x1b[0m`);
      console.log(`\x1b[45m    http://localhost:${PORT}/api/   \x1b[0m`);
      //TODO Add print out of API commands/paths

    });
  });
}

function viewEnviromentSettings() {

  console.log(`\n\x1b[42m  ~~~ Local Server Config~~~  \x1b[0m`);
  console.log('Address: ' + 'http://localhost:');
  console.log('Port: ' + PORT);

  console.log(`\n\x1b[43m  ~~~ Database Config~~~  \x1b[0m`);
  console.log("JAWSDB URL: " + process.env.JAWSDB_URL);
  console.log("DB_HOST: " + process.env.DB_HOST);
  console.log("DB_HOSTPORT: " + process.env.DB_HOSTPORT);
  console.log("DB_PW: " + process.env.DB_PW);
  console.log("DB_USER: " + process.env.DB_USER);
  console.log("DB_NAME: " + process.env.DB_NAM + "\n\n");

  mainMenu();

}

//!========================= Init =========================






//!========================= Main =========================

//TODO Add promise to make sure main does not start till all init has finished.
mainMenu();



//!========================= EOF =========================