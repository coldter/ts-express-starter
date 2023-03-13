/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('Auth', {
      id: {
        field: 'id',
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      type: {
        field: 'type',
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      typeId: {
        field: 'typeId',
        type: Sequelize.UUID,
        allowNull: false,
      },
      hashedPassword: {
        field: 'hashedPassword',
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: '',
      },
      resetToken: {
        field: 'resetToken',
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: '',
      },
      resetTokenExpiry: {
        field: 'resetTokenExpiry',
        type: Sequelize.DATE,
        allowNull: true,
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
    queryInterface.dropTable('Auth');
  },
};
