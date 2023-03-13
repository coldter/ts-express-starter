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

export class AuthToken extends Model<
  InferAttributes<AuthToken>,
  InferCreationAttributes<AuthToken>
> {
  declare id: CreationOptional<string>;
  // timestamps!
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare type: AccountType;
  declare typeId: string;
  declare token: string;
  declare validTill: Date;
  declare deviceId: string | null;
  declare fcmToken: string | null;

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
  AuthToken.init(
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
      token: {
        field: 'typeId',
        type: DataTypes.UUID,
        allowNull: false,
      },
      validTill: {
        field: 'validTill',
        type: DataTypes.DATE,
        allowNull: false,
      },
      deviceId: {
        field: 'deviceId',
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      fcmToken: {
        field: 'fcmToken',
        type: DataTypes.STRING(255),
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
      modelName: 'AuthToken',
      tableName: 'AuthToken',
      paranoid: true,
      timestamps: true,
    },
  );
  return AuthToken;
};
