import { ACCOUNT_STATUS } from '@constants/common.constants';
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
  declare deletedAt: CreationOptional<Date>;

  declare name: string;
  declare email: string;
  declare dob: Date | null;
  declare countryCode: string;
  declare mobile: string;
  declare profileImage: CreationOptional<string>;
  declare status: CreationOptional<AccountStatus>;

  public declare static associate: (models: any) => void;

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
        allowNull: true,
        defaultValue: null,
      },
      email: {
        field: 'email',
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          isLowercase: true,
        },
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
        defaultValue: '',
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
      tableName: 'Users',
      paranoid: true,
      timestamps: true,
    },
  );
  return User;
};
