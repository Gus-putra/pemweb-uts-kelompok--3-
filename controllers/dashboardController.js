
const servisModel = require('../models/servisModel');

exports.index = async (req, res) => {
    try {
        const stats = await servisModel.getDashboardStats();
        const terbaru = await servisModel.getAll();

        res.render('dashboard/index', {
            title: 'Dashboard',
            stats,
            terbaru: terbaru.slice(0, 5)
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal memuat dashboard');
    }
};
