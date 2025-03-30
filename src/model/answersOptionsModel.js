import { Model, DataTypes , UUID, UUIDV4} from "sequelize"
import db from '../core/db.js'
import Question from './questionModel.js'


class AnswerOptions extends Model {}

AnswerOptions.init({
    id: {
        type: DataTypes.UUID,
        primaryKey : true,
        defaultValue: UUIDV4
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
    },
    type: {
        type: DataTypes.ENUM(['text', 'image']),
        defaultValue: 'text'
    }


}, {sequelize: db, modelName: "answer_options"})

Question.hasMany(AnswerOptions, {foreignKey: 'id_question', as: 'answers'})

AnswerOptions.belongsTo(Question, {foreignKey: 'id_question', as: 'answers'})


export default AnswerOptions;