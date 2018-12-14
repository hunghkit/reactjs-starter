module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('images', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
      },
      uid: {
        type: Sequelize.UUID,
      },
      url: {
        type: Sequelize.STRING,
      },
      public_id: {
        type: Sequelize.STRING,
      },
      version: {
        type: Sequelize.STRING,
      },
      width: {
        type: Sequelize.DECIMAL,
      },
      height: {
        type: Sequelize.DECIMAL,
      },
      format: {
        type: Sequelize.STRING,
      },
      resource_type: {
        type: Sequelize.STRING,
      },
      bytes: {
        type: Sequelize.DECIMAL,
      },
      original_filename: {
        type: Sequelize.STRING,
      },
      secure_url: {
        type: Sequelize.STRING,
      },
      tags: {
        type: Sequelize.JSONB,
      },
      eager: {
        type: Sequelize.JSONB,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('images'),
};
