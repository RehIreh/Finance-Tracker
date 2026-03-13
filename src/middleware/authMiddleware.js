import jwt from 'jsonwebtoken'
import { pool } from '../config/db'

//Check Token if is valid
const checkToken = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt
  }

  if (!token) {
    return res.status(401).json({
      error: "authorization not valid"
    })
  }


  //Verify token and get data from token
  try {

    const decode = jwt.verify(token, process.env.CLIENT_SECRET);

    const user = await pool.query(
      `select uuid from users where uuid = ?`,
        [decode.uuid]);

     if (!user){
      return res.status(401).json({error: "User not valid"});
    }

    req.user = user;
    next();

  } catch (err) {
    return res.status(401).json({message: "authorization fail", error: err});

  }
};

export {checkToken}