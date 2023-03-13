/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('Users', {
      id: {
        field: 'id',
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        field: 'name',
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      email: {
        field: 'email',
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          isLowercase: true,
        },
      },
      dob: {
        field: 'dob',
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      countryCode: {
        field: 'countryCode',
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      mobile: {
        field: 'mobile',
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      profileImage: {
        field: 'profileImage',
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: '',
      },
      status: {
        field: 'status',
        type: Sequelize.TINYINT,
        defaultValue: 1,
        allowNull: false,
      },
      createdAt: {
        field: 'createdAt',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        field: 'updatedAt',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        field: 'deletedAt',
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });
  },
  async down(queryInterface) {
    queryInterface.dropTable('Users');
  },
};
