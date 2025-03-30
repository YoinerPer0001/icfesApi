import { Sequelize } from "sequelize";
import "dotenv/config";

const db_Name = process.env.DBNAME || "icfesdb";
const db_user = process.env.DBUSER || "postgres";
const db_passsword = process.env.DBPASSWORD || "12345";
const db_host = process.env.DBHOST || "localhost";
const db_port = process.env.DBPORT || 5432


const db = new Sequelize(db_Name, db_user, db_passsword, {
  host: db_host,
  dialect: "postgres",
  port: db_port,
  timezone: "America/Bogota",
  
});

try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default db