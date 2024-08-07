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

/* 

create table com_rats (
	id int primary key auto_increment,
    imdbID varchar(255) not null,
    userID int not null,
    comments varchar(255) not null,
    ratings int not null,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    constraint fk_user foreign key (userID) references Users(id)
);

*/