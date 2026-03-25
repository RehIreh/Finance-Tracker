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


const createCategories = async(req, res, next) => {

  const {name, type} = req.body;

  try {

  const [result] = await pool.query(
    `insert into categories (uuid, name, type) values (?,?,?)`,
    [req.user.uuid, name, type]
  );

  const [data] = await pool.query(
    `select id, name, type from categories where id = ?`,
    [result.insertId]
  );


  return res.status(201).json({
    status:"success",
    data: data[0]
  });

  } catch(err) {
    next(err);
  }

};

const updateCategories = async(req, res, next) => {
  
  const id = req.params.id
  const updates = req.body;

  const fields = Object.keys(updates);
  const values = Object.values(updates);

  const setClause = fields.map(field => `${field} = ?`).join(", ");

  try {

    const [[categoriesId]] = await pool.query(
      `select id,name,type from categories where id = ? `,
      [id]
    );

  
    if(!categoriesId){
      return res.status(500).json({
        status: "failed",
        message: "kategori tidak ada"
      })
    };

    await pool.query(
      `update categories set ${setClause} where id = ?`,
      [...values, id]
    )

    return res.status(200).json({
      status: "success",
      data: updates
    })

  } catch(err) {
    next(err)
  }
 
};

const deleteCategories = async(req, res, next) => {

  const id =  req.params.id

  try {


  const [[deleteCategories]] = await pool.query(
   `select id from categories where id = ? `,
      [id]
    );

  if(!deleteCategories){
    return res.status(404).json({
      status: "failed",
      message: "data tidak ditemukan"
    })
  }

  await pool.query(
    `delete from categories where id  = ?`,
    [id]
  )

  return res.status(200).json({
    status: "success",
    message: "data berhasil dihapus"
  });
    } catch (err){
    next(err)
  }

}
 
export { getCategories, createCategories, updateCategories, deleteCategories } 