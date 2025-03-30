import { Model, DataTypes, UUID } from "sequelize"
import db from '../core/db.js'

class Categories extends Model {}

Categories.init({
    id: {
        type: DataTypes.UUID,
        primaryKey : true,
        defaultValue: UUID
    },
    name : {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    num_questions: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    photo:{
        type: DataTypes.TEXT,
        allowNull: true
    }
    
}, {sequelize: db, modelName: "categories"})


export default Categories;