import { Model, DataTypes, UUID } from "sequelize"
import db from '../core/db.js'

class Context extends Model {}

Context.init({
    id: {
        type: DataTypes.UUID,
        primaryKey : true,
        defaultValue: UUID
    },
    text : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM(['text', 'image']),
        defaultValue: 'text'
    }
    
}, {sequelize: db, modelName: "context"})


export default Context;