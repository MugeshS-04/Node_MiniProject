'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
     {
      product_name: "Horlicks",
      price: 180.00,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      product_name: "Boost",
      price: 185.00,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      product_name: "Complan",
      price: 175.00,
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
