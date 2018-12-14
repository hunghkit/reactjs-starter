module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users',
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
      email: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      loginKey: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      resetPassword: {
        type: Sequelize.STRING,
      },
      activationKey: {
        type: Sequelize.STRING,
      },
      photoURL: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.DATE,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
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
  down: queryInterface => queryInterface.dropTable('Users'),
};
