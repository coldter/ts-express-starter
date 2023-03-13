'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('AuthToken', {
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
      token: {
        field: 'typeId',
        type: Sequelize.UUID,
        allowNull: false,
      },
      validTill: {
        field: 'validTill',
        type: Sequelize.DATE,
        allowNull: false,
      },
      deviceId: {
        field: 'deviceId',
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      fcmToken: {
        field: 'fcmToken',
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
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

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('AuthToken');
  },
};
