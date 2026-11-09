
const pelangganModel = require('../models/pelangganModel');

exports.index = async (req, res) => {
    try {
        const pelanggan = await pelangganModel.getAll();

        res.render('pelanggan/index', {
            title: 'Data Pelanggan',
            pelanggan
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal mengambil data pelanggan');
    }
};

exports.detail = async (req, res) => {
    try {
        const pelanggan = await pelangganModel.getById(req.params.id);

        if (!pelanggan) {
            return res.status(404).send('Pelanggan tidak ditemukan');
        }

        res.render('pelanggan/detail', {
            title: 'Detail Pelanggan',
            pelanggan
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan');
    }
};
