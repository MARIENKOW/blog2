import { sequelize } from "../services/DB.js";
import Sequelize, { sql, DataTypes } from "@sequelize/core";
import config from "../config.js";

export const Access = sequelize.define(
    "Access",
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        token: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        // date_end: {
        //     type: DataTypes.DATE,
        //     defaultValue: sequelize.fn(
        //         "TIMESTAMPADD",
        //         sequelize.literal("MINUTE"),
        //         config.ACTIVATE_TOKEN_MINUTES,
        //         sequelize.fn("NOW")
        //     ),
        //     allowNull: false,
        // },
    },
    {
        tableName: "Access",
        timestamps: false,
    }
);
