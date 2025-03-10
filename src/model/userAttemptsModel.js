import { DataTypes, Model, UUID, UUIDV4 } from "sequelize";
import db from '../core/db.js'
import Exams from "./examsModel.js";
import Question from './questionModel.js'
import AnswerOptions from './answersOptionsModel.js'

class UserAttempts extends Model {}

UserAttempts.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue : UUIDV4
    },
    exam_id: {
        type: DataTypes.UUID,
    },

    question_id: {
        type: DataTypes.UUID,
    },

    answer_id: {
        type: DataTypes.UUID,
    },

    is_correct: {
        type: DataTypes.BOOLEAN
    }

}, {sequelize: db, modelName: "user_attempts"})

AnswerOptions.hasMany(UserAttempts, {foreignKey: "answer_id", as: "answer"})
UserAttempts.belongsTo(AnswerOptions, {foreignKey: "answer_id", as: "answer"})

Question.hasMany(UserAttempts, {foreignKey: "question_id", as: "question"})
UserAttempts.belongsTo(Question, {foreignKey: "question_id", as: "question"})

Exams.hasMany(UserAttempts, {foreignKey: "exam_id", as: "exam"})
UserAttempts.belongsTo(Exams, {foreignKey: "exam_id", as: "exam"})


export default UserAttempts;