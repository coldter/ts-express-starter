import { AccountType } from '@interfaces/app/common.interface';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class AuthToken extends Model<
  InferAttributes<AuthToken>,
  InferCreationAttributes<AuthToken>
> {
  declare id: CreationOptional<string>;
  // timestamps!
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare accountType: AccountType;
  declare accountId: string;
  declare bearerToken: string | null;
  declare bearerTokenValidTill: Date | null;
  declare refreshToken: string | null;
  declare refreshTokenValidTill: Date | null;
  declare deviceId: string | null;
  declare fcmToken: string | null;

  public declare static associate: (models: any) => void;
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
      accountType: {
        field: 'accountType',
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      accountId: {
        field: 'accountTypeId',
        type: DataTypes.UUID,
        allowNull: false,
      },
      refreshToken: {
        field: 'refreshToken',
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      refreshTokenValidTill: {
        field: 'refreshTokenValidTill',
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      bearerToken: {
        field: 'bearerToken',
        // * this should be jtid if we are using jwt
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      bearerTokenValidTill: {
        field: 'bearerTokenValidTill',
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      fcmToken: {
        field: 'fcmToken',
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      deviceId: {
        field: 'deviceId',
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
    },
    {
      sequelize,
      modelName: 'AuthToken',
      tableName: 'AuthToken',
      paranoid: false,
      timestamps: true,
    },
  );
  return AuthToken;
};
