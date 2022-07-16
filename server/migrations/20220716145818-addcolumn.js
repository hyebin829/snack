'use strict'
const Sequelize = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('reviews', 'rating', {
      type: Sequelize.FLOAT,
      allowNull: false,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('reviews', 'rating')
  },
}
