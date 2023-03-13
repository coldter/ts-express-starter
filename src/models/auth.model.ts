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
  declare deletedAt: CreationOptional<Date>;

  declare type: AccountType;
  declare typeId: string;
  declare hashedPassword: string;
  declare resetToken: string | null;
  declare resetTokenExpiry: Date | null;

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
  Auth.init(
    {
      id: {
        field: 'id',
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        field: 'type',
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      typeId: {
        field: 'typeId',
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
