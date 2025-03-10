import { DataTypes, Model, UUID, UUIDV4 } from "sequelize";
import db from '../core/db.js'
import Exams from "./examsModel.js";
import Question from './questionModel.js'

class ExamQuestions extends Model {}

ExamQuestions.init({
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
    }
}, {sequelize: db, modelName: "exams_questions"})

Exams.hasMany(ExamQuestions, {foreignKey: "exam_id", as: "exam"})
ExamQuestions.belongsTo(Exams, {foreignKey: "exam_id", as: "exam"})

Question.hasMany(ExamQuestions, {foreignKey: "question_id", as: "question"})
ExamQuestions.belongsTo(Question, {foreignKey: "question_id", as: "question"})

export default ExamQuestions;