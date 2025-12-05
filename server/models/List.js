import { sequelize } from "../services/DB.js";
import { DataTypes } from "@sequelize/core";

export const List = sequelize.define(
    "List",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "list",
        timestamps: false,
    }
);
