import { Sequelize, DataTypes } from "sequelize";


export const squelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        dialect: "mysql",
        host: process.env.MYSQL_HOST
    }
);

export const ServerTextChannel = squelize.define('ServerTextChannel', {
    channelId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    serverId: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
});

export const RolesExcluded = squelize.define('RolesExcluded', {
    serverId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    roleId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export const ServerCommandsEnabled = squelize.define('ServerCommandsEnabled', {
    serverId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});