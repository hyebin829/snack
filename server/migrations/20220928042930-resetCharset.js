'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      `ALTER DATABASE ${queryInterface.sequelize.config.database}
      CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
}
