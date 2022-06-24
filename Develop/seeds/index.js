const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n\x1b[43m ~~~ DATABASE SYNCED ~~~ \x1b[0m\n');

  await seedCategories();
  console.log('\n\x1b[43m ~~~ CATEGORIES SEEDED ~~~ \x1b[0m\n');

  await seedProducts();
  console.log('\n\x1b[43m ~~~ PRODUCTS SEEDED~~~ \x1b[0m\n');

  await seedTags();
  console.log('\n\x1b[43m ~~~ TAGS SEEDED ~~~ \x1b[0m\n');

  await seedProductTags();
  console.log('\n\x1b[43m ~~~ PRODUCT TAGS SEEDED ~~~ \x1b[0m\n');

  // console.log('\n----- SEEDING COMPLETE -----\n');

  return true;
  // process.exit(0);
};

// seedAll();


module.exports = seedAll;