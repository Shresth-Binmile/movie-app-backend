import { DataType, DataTypes } from "sequelize";
import { sequelize } from "../utils/connectDB";

const favs = sequelize.define(
    'favorites',
    {
        imdbID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userID: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    }
)

export default favs;