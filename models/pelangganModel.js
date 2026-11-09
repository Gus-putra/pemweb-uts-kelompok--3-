
const db = require('../config/database');

exports.getAll = async () => {
    const [rows] = await db.query(
        'SELECT * FROM pelanggan ORDER BY id_pelanggan DESC'
    );
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await db.execute(
        'SELECT * FROM pelanggan WHERE id_pelanggan = ?',
        [id]
    );
    return rows[0];
};
