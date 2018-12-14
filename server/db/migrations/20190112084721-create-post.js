module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Posts',
    {
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
      subtitle: {
        type: Sequelize.STRING,
      },
      excerpt: {
        type: Sequelize.STRING,
      },
      authorId: {
        type: Sequelize.UUID,
      },
      categoryId: {
        type: Sequelize.UUID,
      },
      content: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING,
      },
      imageURL: {
        type: Sequelize.STRING,
      },
      view: {
        type: Sequelize.INTEGER,
      },
      slug: {
        unique: true,
        type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('Posts'),
};
