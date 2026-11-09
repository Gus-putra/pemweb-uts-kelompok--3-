
const layananModel = require('../models/layananModel');

exports.index = async (req, res) => {
    try {
        const layanan = await layananModel.getAll();

        res.render('layanan/index', {
            title: 'Data Layanan',
            layanan
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal mengambil data layanan');
    }
};
