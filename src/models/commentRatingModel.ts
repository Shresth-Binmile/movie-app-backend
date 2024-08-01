import { DataTypes } from "sequelize";
import { sequelize } from "../utils/connectDB";

const comRats = sequelize.define(
    'com_rat',
    {
        imdbID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userID: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ratings: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    }
)

export default comRats;