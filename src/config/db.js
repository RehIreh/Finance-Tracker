import mysql from 'mysql2/promise';


const pool = mysql.createPool({
  port: Number(process.env.PORT_DB),
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.PASSWORD,
  waitForConnections: true
});

const connectDB = async () => {
  try {
    const [row] = await pool.query("select 1");
    console.log("Database Connect");
  } catch (error) {
    console.error("Database connection Fail");
    console.error(error);
    process.exit(1);
  }
}
 
export {pool, connectDB}