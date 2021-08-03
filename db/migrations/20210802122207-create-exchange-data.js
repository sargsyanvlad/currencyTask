module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ExchangeData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      exchangeData: {
        type: Sequelize.JSONB,
      },
      fsyms: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tsyms: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ExchangeData');
  },
};
