import { Model, DataTypes } from "sequelize"
import db from '../core/db.js'
import Question from './questionModel.js'


class AnswerOptions extends Model {}

AnswerOptions.init({
    id: {
        type: DataTypes.UUID,
        primaryKey : true,
        defaultValue: UUID
    },
    text : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_correct : {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    id_question: {
        type: DataTypes.UUID,
    }


}, {sequelize: db, modelName: "answer_options"})

Question.hasMany(AnswerOptions, {foreignKey: 'id_question', as: 'question'})

AnswerOptions.belongsTo(Question, {foreignKey: 'id_question', as: 'question'})


export default AnswerOptions;