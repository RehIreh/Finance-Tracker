import { pool } from "../config/db.js";



const profile = async(req, res) => {

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

const updateProfile = async(req, res) => {

  const updates = req.body;

  const fields = Object.keys(updates);
  const values = Object.values(updates);

  const setClause = fields.map(field => `${field} = ?`).join(", ");

  try{ 
  // Verify user if exist
  const [[userData]] = await pool.query(
    `select uuid,email from users where uuid = ?`,
    [req.user.uuid]
  )

  if(!userData){ 
    return res.status(400).json({
      status: "failed",
      message: "Data tidak ditemukan"
    })
  }

  await pool.query(
    `update userprofile set ${setClause} where uuid = ?`,
    [...values, req.user.uuid]
  )

  res.status(200).json({
    message: "sucess update data",
    updatedFields : updates
  })
  } catch(err) {
    next(err)
  }

};


export { profile, updateProfile };