import { pool } from "../config/db.js";



const profile = async(req, res) => {

  console.log(req.user.uuid)

  const [[userProfile]] = await pool.query(
    `select u.name, up.address, up.birthDate, up.jobs,up.gender,u.role from userprofile up
    inner join users u on u.uuid = up.uuid
    where up.uuid = ?`,
    [req.user.uuid]
  )

  return res.status(200).json({
    status: "success",
    data: userProfile
  })

};


export { profile };