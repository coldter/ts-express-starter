import { ACCOUNT_STATUS, ACCOUNT_TYPE } from '@constants/common.constants';
import { Db } from '@database/index';
import { AccountStatus } from '@interfaces/app/common.interface';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  literal,
} from 'sequelize';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  // timestamps!
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;

  declare name: string;
  declare email: string;
  declare dob: Date | null;
  declare countryCode: string;
  declare mobile: string;
  declare profileImage: string | null;
  declare status: CreationOptional<AccountStatus>;

  public static associate({ Auth }: Db) {
    this.hasOne(Auth, {
      foreignKey: 'accountId',
      as: 'auth',
      sourceKey: 'id',
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
  User.init(
    {
      id: {
        field: 'id',
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        field: 'name',
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'anonymous',
      },
      email: {
        field: 'email',
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          isLowercase: true,
        },
        unique: true,
        defaultValue: 'anonymous@example.com',
      },
      dob: {
        field: 'dob',
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      countryCode: {
        field: 'countryCode',
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      mobile: {
        field: 'mobile',
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
      profileImage: {
        field: 'profileImage',
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      status: {
        field: 'status',
        type: DataTypes.TINYINT,
        defaultValue: ACCOUNT_STATUS.ACTIVE,
        allowNull: false,
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
      modelName: 'User',
      tableName: 'User',
      paranoid: true,
      timestamps: true,
    },
  );
  return User;
};
