import { Sequelize, DataTypes } from "sequelize";


export const squelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
{
    dialect: "mysql",
    host: process.env.MYSQL_HOST
});

export const ServerTextChannel = squelize.define('ServerTextChannel', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    serverId: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
});