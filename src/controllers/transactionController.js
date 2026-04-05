import { pool } from "../config/db.js";


const getTransaction = async(req, res, next) => {

  const { start_date, end_date } = req.query;

  try {

  const [data] = await pool.query(
    `select category_id, amount, note, type, DATE_FORMAT(transaction_date, '%Y-%m-%d') as date from transactions where uuid = ? and transaction_date >= ? and transaction_date <= ? `,
    [req.user.uuid, start_date, end_date]
  );

  if(data.length < 1) {
    return res.status(404).json({
      status:"failed",
      message:"Belum ada Data"
    })
  }; 

    return res.status(200).json({
    status:"success",
    data: data
  });

 } catch (err) {
   next(err);
 };
};

const addTransaction = async(req, res, next) => {

  const {category_id, amount, note, type, date} = req.body;

  const connection = await pool.getConnection();

  try {

  await connection.beginTransaction();

  const [data] = await pool.query(
    `insert into transactions (uuid, category_id, amount, note, type, transaction_date) values (?,?,?,?,?,?)`,
    [req.user.uuid, category_id, amount, note, type, date]
  );

   await connection.commit();

  const newData = {
    uuid: req.user.uuid,
    id: data.insertId,
    amount: amount,
    note: note,
    type: type,
    date: date

  }

  return res.status(201).json({
    status: "success",
    message: newData
  })
  } catch(err) {

    await connection.rollback();

    next(err)

  } finally {

     connection.release();

  }
};

const deleteTransaction = async(req, res, next) => {

  const id = req.params.id

  try {

    const [[data]] = await pool.query(
      `select id from transactions where id = ?`,
      [id]
    );

    if(!data) {
      return res.status(404).json({
        status:"failed",
        message:"data tidak ditemukan"
      })
    };

   await pool.query(
      `delete from transactions where id = ?`,
      [id]
    );

    return res.status(200).json({
      status: "success",
      message: "transaksi berhasil terhapus"
    });

  } catch(err) {
    next(err)
  }

};

export { getTransaction, addTransaction, deleteTransaction }  