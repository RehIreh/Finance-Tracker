import { pool } from "../config/db.js";




const getCategories = async(req, res) => {
  
  const [categories] =  await pool.query(`
      select id, name, type from categories where uuid = ?`, 
      [req.user.uuid])

  if (categories.length === 0){
    return res.status(400).json({
      message: "Belum ada data"
    });
  }


  return res.status(200).json({
    status: "success",
    data: categories
  })

};

 
export { getCategories } 