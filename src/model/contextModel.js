import { Model, DataTypes, UUID, UUIDV4 } from "sequelize"
import db from '../core/db.js'

class Context extends Model {}

Context.init({
    id: {
        type: DataTypes.UUID,
        primaryKey : true,
        defaultValue: UUIDV4
    },
    pre_text: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    text : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM(['text', 'image']),
        defaultValue: 'text'
    }
    
}, {sequelize: db, modelName: "contexts"})


export default Context;