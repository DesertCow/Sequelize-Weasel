const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const seedAll = require('./seeds/index');
const { init } = require('./models/Category');
const inquirer = require('inquirer');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable Routes
app.use(routes);



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




async function mainMenu() {

  await 1

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'mainMenuChoice',
        choices: ['Seed Database', 'Test Database Connection', 'Start Application', '\x1b[41mExit\x1b[0m'],
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
        case '\x1b[41mExit\x1b[0m':
          console.log(`\x1b[41m==================== Exit! ====================\x1b[0m`);
          process.exit(1);
          break;
      }
    })

}

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


//!========================= Init =========================






//!========================= Main =========================

//TODO Add promise to make sure main does not start till all init has finished.
mainMenu();



//!========================= EOF =========================