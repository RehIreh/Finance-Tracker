import "dotenv/config";
import { pool } from "../src/config/db.js";

const up = async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          uuid VARCHAR(100) NOT NULL UNIQUE,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) NOT NULL
        )        
        `);
        await pool.query(
          `CREATE TABLE IF NOT EXISTS userprofile (
            id INT AUTO_INCREMENT PRIMARY KEY,
            uuid VARCHAR(100) NOT NULL UNIQUE,
            address VARCHAR(250) DEFAULT NULL,
            birthDate DATE DEFAULT NULL,
            jobs VARCHAR(100) DEFAULT NULL,
            gender ENUM('L','P','N') DEFAULT 'N',
            FOREIGN KEY (uuid) REFERENCES users(uuid) ON DELETE CASCADE
          )`
        );
    } catch (err) {
      console.log("Migrasi gagal :", err)
    } finally {
      await pool.end();
    }
};


up();