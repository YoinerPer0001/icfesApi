import { Model, DataTypes, UUIDV4 } from "sequelize";
import db from '../core/db.js'
import Roles from './rolesModel.js'

class Users extends Model {}

Users.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  rol_id: {
    type: DataTypes.UUID,
  }

}, {sequelize: db, modelName: "users"});

Roles.hasMany(Users, {foreignKey: "rol_id", as: "rol"})
Users.belongsTo(Roles, {foreignKey: "rol_id", as: "rol"})

export default Users;
