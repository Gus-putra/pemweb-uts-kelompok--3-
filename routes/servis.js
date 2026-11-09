
const express = require('express');
const router = express.Router();
const controller = require('../controllers/servisController');
const db = require('../config/database');

router.get('/', controller.index);
router.get('/tambah', controller.createForm);
router.post('/tambah', controller.store);
router.get('/edit/:id', controller.editForm);
router.post('/edit/:id', controller.update);
router.post('/hapus/:id', controller.destroy);

// Mengambil kendaraan berdasarkan pelanggan
router.get('/kendaraan/:id_pelanggan', async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM kendaraan WHERE id_pelanggan = ?',
            [req.params.id_pelanggan]
        );

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Gagal mengambil kendaraan'
        });
    }
});

module.exports = router;
