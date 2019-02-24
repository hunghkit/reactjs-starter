module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Options', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
    },
    key: {
      type: Sequelize.STRING
    },
    value: {
      type: Sequelize.JSONB
    },
    active: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Options'),
};