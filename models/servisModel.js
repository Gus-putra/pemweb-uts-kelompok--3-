
const db = require('../config/database');

exports.getAll = async (search = '', status = '') => {
    let sql = `
        SELECT s.*, p.nama AS nama_pelanggan,
               k.nomor_polisi, k.merek, k.tipe
        FROM servis s
        JOIN pelanggan p ON s.id_pelanggan = p.id_pelanggan
        JOIN kendaraan k ON s.id_kendaraan = k.id_kendaraan
        WHERE 1=1
    `;

    const params = [];

    if (search) {
        sql += ` AND (
            p.nama LIKE ? OR
            k.nomor_polisi LIKE ?
        )`;
        params.push(`%${search}%`, `%${search}%`);
    }

    if (status) {
        sql += ' AND s.status = ?';
        params.push(status);
    }

    sql += ' ORDER BY s.id_servis DESC';

    const [rows] = await db.execute(sql, params);
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await db.execute(
        'SELECT * FROM servis WHERE id_servis = ?',
        [id]
    );
    return rows[0];
};

exports.create = async (data) => {
    const [result] = await db.execute(`
        INSERT INTO servis
        (id_pelanggan, id_kendaraan, tanggal_servis, keluhan, status, total_biaya)
        VALUES (?, ?, ?, ?, ?, ?)
    `, [
        data.id_pelanggan,
        data.id_kendaraan,
        data.tanggal_servis,
        data.keluhan,
        data.status,
        data.total_biaya
    ]);

    return result.insertId;
};

exports.update = async (id, data) => {
    const [result] = await db.execute(`
        UPDATE servis
        SET id_pelanggan = ?,
            id_kendaraan = ?,
            tanggal_servis = ?,
            keluhan = ?,
            status = ?,
            total_biaya = ?
        WHERE id_servis = ?
    `, [
        data.id_pelanggan,
        data.id_kendaraan,
        data.tanggal_servis,
        data.keluhan,
        data.status,
        data.total_biaya,
        id
    ]);

    return result;
};

exports.delete = async (id) => {
    const [result] = await db.execute(
        'DELETE FROM servis WHERE id_servis = ?',
        [id]
    );

    return result;
};

exports.getDashboardStats = async () => {
    const [rows] = await db.query(`
        SELECT
            (SELECT COUNT(*) FROM pelanggan) AS pelanggan,
            (SELECT COUNT(*) FROM kendaraan) AS kendaraan,
            (SELECT COUNT(*) FROM servis) AS servis,
            (SELECT COUNT(*) FROM servis
             WHERE status = 'Sedang Dikerjakan') AS sedang_dikerjakan,
            (SELECT COUNT(*) FROM servis
             WHERE status = 'Selesai') AS selesai
    `);

    return rows[0];
};
