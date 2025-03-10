import db from '../core/db.js'
import { DataTypes, Model, UUID } from 'sequelize'

class Roles extends Model {}

Roles.init({
    id: {
        type: DataTypes.UUID,
        primaryKey : true,
        defaultValue: UUID
    },
    name : {
        type: DataTypes.STRING(100),
        allowNull: false
    }
    
}, {sequelize: db, modelName: "roles"})

export default Roles;