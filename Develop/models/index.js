// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

// Product.belongsTo(Category, {
//   // Define the third table needed to store the foreign keys
//   foreignKey: {
//     name: 'category_id',
//     as: 'CategoryRetrived'
//   }
//   // Define an alias for when data is retrieved
//   // as: 'CategoryRetrived'
// });

// // Categories have many Products
// Category.belongsToMany(Product, {
//   // Define the third table needed to store the foreign keys
//   foreignKey: {
//     name: 'id',
//     as: 'ProductRetrived'
//   }
//   // Define an alias for when data is retrieved

// });

// // Products belongToMany Tags (through ProductTag)
// Product.belongsTo(Tag, {
//   // Define the third table needed to store the foreign keys
//   through: {
//     model: ProductTag,
//     unique: false
//   },
//   // Define an alias for when data is retrieved
//   // as: 'planned_trips'
// });

// // Tags belongToMany Products (through ProductTag)
// Tag.belongsToMany(Product, {
//   // Define the third table needed to store the foreign keys
//   through: {
//     model: ProductTag,
//     unique: false
//   },
//   // Define an alias for when data is retrieved
//   // as: 'planned_trips'
// });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

//!========================= EOF =========================