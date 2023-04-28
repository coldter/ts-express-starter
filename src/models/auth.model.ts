import { ACCOUNT_TYPE } from '@constants/common.constants';
import { Db } from '@database/index';
import { AccountType } from '@interfaces/app/common.interface';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  literal,
} from 'sequelize';

export class Auth extends Model<InferAttributes<Auth>, InferCreationAttributes<Auth>> {
  declare id: CreationOptional<string>;
  // timestamps!
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;

  declare accountType: AccountType;
  declare accountId: string;
  declare hashedPassword: string;
  declare resetToken: string | null; // for password reset
  declare resetTokenExpiry: Date | null; // for password reset expiry
  declare emailVerificationToken: string | null;
  declare emailVerificationTokenExpiry: Date | null;
  declare loginVerificationToken: string | null;
  declare loginVerificationTokenExpiry: Date | null;

  public static associate({ User }: Db) {
    this.belongsTo(User, {
      foreignKey: 'accountId',
      as: 'user',
      targetKey: 'id',
      scope: {
        accountType: ACCOUNT_TYPE.USER,
      },
      constraints: false,
      foreignKeyConstraint: false,
    });
  }

  // !! use this instead of the destroy method
  public static async softDelete({ id, ...rest }: { id: string; [key: string]: any }) {
    return this.update(
      {
        deletedAt: new Date(),
        updatedAt: literal('updatedAt'),
        ...rest,
      },
      {
        where: {
          id,
        },
        silent: true,
      },
    );
  }
}

export default (sequelize: Sequelize) => {
  Auth.init(
    {
      id: {
        field: 'id',
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      accountType: {
        field: 'accountType',
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      accountId: {
        field: 'accountId',
        type: DataTypes.UUID,
        allowNull: false,
      },
      hashedPassword: {
        field: 'hashedPassword',
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
      },
      resetToken: {
        field: 'resetToken',
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
      },
      resetTokenExpiry: {
        field: 'resetTokenExpiry',
        type: DataTypes.DATE,
        allowNull: true,
      },
      emailVerificationToken: {
        field: 'emailVerificationToken',
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      emailVerificationTokenExpiry: {
        field: 'emailVerificationTokenExpiry',
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      loginVerificationToken: {
        field: 'loginVerificationToken',
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      loginVerificationTokenExpiry: {
        field: 'loginVerificationTokenExpiry',
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        field: 'createdAt',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        field: 'updatedAt',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        field: 'deletedAt',
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: 'Auth',
      tableName: 'Auth',
      paranoid: true,
      timestamps: true,
    },
  );
  return Auth;
};
