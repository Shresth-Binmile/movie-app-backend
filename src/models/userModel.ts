import { sequelize } from "../utils/connectDB";
import { DataTypes } from "sequelize";

const Users = sequelize.define(
    'Users',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNo: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    }
)

export default Users;