import { Model, DataTypes } from "sequelize"
import db from '../core/db.js'

class Category extends Model {}

Category.init({
    id: {
        type: DataTypes.UUID,
        primaryKey : true,
        defaultValue: UUID
    },
    name : {
        type: DataTypes.STRING(150),
        allowNull: false
    }
    
}, {sequelize: db, modelName: "category"})


export default Category;