import { DataTypes, Model, UUID, UUIDV4 } from "sequelize";
import Users from './userModel.js'
import db from '../core/db.js'

class Exams extends Model {}

Exams.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue : UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
    },
    duration: {
        type: DataTypes.INTEGER,
    },
    state: {
        type: DataTypes.ENUM(['in progress','finished', 'created' ]),
        defaultValue: 'created'
    },
},{sequelize: db, modelName: "exams"})

Users.hasMany(Exams, {foreignKey: 'user_id', as: "exams"})
Exams.belongsTo(Users, {foreignKey: 'user_id', as: "exams"})

export default Exams;
