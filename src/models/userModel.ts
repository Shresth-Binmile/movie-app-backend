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


/*

create table Users (
	id int primary key auto_increment,
    name varchar(255) not null,
    password varchar(255) not null,
    phoneNo varchar(10) not null,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

*/
