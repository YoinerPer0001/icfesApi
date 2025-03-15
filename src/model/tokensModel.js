import { DataTypes, Model } from "sequelize";
import db from "../core/db.js";
import Users from "./userModel.js";


class Tokens extends Model {}

Tokens.init({
    code: {
        type: DataTypes.STRING,
        primaryKey : true,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        defaultValue : "passwordRecover"
    },
    time_expiration: {
        type: DataTypes.DATE,
    },
    user_id: {
        type: DataTypes.UUID
    }
}, {sequelize: db, modelName: "tokens"})

Users.hasMany(Tokens, {foreignKey: "user_id", as: "user"})
Tokens.belongsTo(Users, {foreignKey: "user_id", as: "user"})

export default Tokens;