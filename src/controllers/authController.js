import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const register = async (req, res, next) => {
  // Body register
  const { name, email, password, role } = req.body;

  try {
    // Check if user exist
    const [[isUserExist]] = await pool.query(
      `select email from users where email = ?`,
      [email],
    );

    if (isUserExist) {
      return res.status(400).json({ error: "Email ini sudah terdaftar" });
    }

    // Hashing password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashUserPassword = await bcrypt.hash(password, salt);

    // Generate uuid
    const uuid = uuidv4();

    // Insert data user into database
    const [result] = await pool.query(
      `insert into users (uuid, name, email, password, role) values (?,?,?,?,?)`,
      [uuid, name, email, hashUserPassword, role],
    );
    return res.status(202).json({
      status: "success",
      data: {
        user: {
          id: uuid,
          name,
          email,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check user Exist
    const [[user]] = await pool.query(
      `select email,password from users where email = ?`,
      [email],
    );

    if (!user) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    // Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    return res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          email: email,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export { register, login };
