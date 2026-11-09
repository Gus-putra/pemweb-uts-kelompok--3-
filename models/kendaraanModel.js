
const db = require('../config/database');

exports.getAll = async () => {
    const [rows] = await db.query(`
        SELECT k.*, p.nama AS nama_pelanggan
        FROM kendaraan k
        JOIN pelanggan p
        ON k.id_pelanggan = p.id_pelanggan
        ORDER BY k.id_kendaraan DESC
    `);
    return rows;
};
