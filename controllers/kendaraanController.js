
const kendaraanModel = require('../models/kendaraanModel');

exports.index = async (req, res) => {
    try {
        const kendaraan = await kendaraanModel.getAll();

        res.render('kendaraan/index', {
            title: 'Data Kendaraan',
            kendaraan
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal mengambil data kendaraan');
    }
};
