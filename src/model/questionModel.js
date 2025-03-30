import { Model, DataTypes, UUID, UUIDV4 } from "sequelize"
import db from '../core/db.js'
import Context from './contextModel.js'
import Category from './categoryModel.js'

class Questions extends Model {}

Questions.init({
    id: {
        type: DataTypes.UUID,
        primaryKey : true,
        defaultValue: UUIDV4
    },
    text : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cat_id: {
        type: DataTypes.UUID,
    },
    context_id: {
        type: DataTypes.UUID,
    },
    
}, {sequelize: db, modelName: "questions"})

Context.hasMany(Questions, {foreignKey: "context_id" , as: "context"})
Questions.belongsTo(Context,{foreignKey: "context_id" , as: "context"} )

Category.hasMany(Questions, {foreignKey: "cat_id" , as: "category"})
Questions.belongsTo(Category,{foreignKey: "cat_id" , as: "category"} )

export default Questions;