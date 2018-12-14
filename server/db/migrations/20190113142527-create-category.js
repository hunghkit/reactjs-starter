module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Categories', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
      },
      seq: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    }),
  down: (queryInterface) => queryInterface.dropTable('Categories'),
};