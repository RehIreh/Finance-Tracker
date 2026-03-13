import jwt from 'jsonwebtoken'

const generateToken = (userId, res) => {
    const payLoad = {id: userId};
    const token = jwt.sign(payLoad, process.env.CLIENT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d"
    } );


    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PROD",
      sameSite: "strict",
      maxAge: (1000 * 60 * 60 * 20 * 24 ) * 1,
    });
    return token;
};


export default generateToken

