
const db = require('../config/database');

exports.getAll = async () => {
    const [rows] = await db.query(
        'SELECT * FROM layanan ORDER BY id_layanan DESC'
    );
    return rows;
};
