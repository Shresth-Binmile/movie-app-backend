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

/*

create table favorites (
	id int primary key auto_increment,
    imdbID varchar(255) not null,
    userID int not null,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    constraint fk_userID foreign key (userID) references Users(id)
);

*/