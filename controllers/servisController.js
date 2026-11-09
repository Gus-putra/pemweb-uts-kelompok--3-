
const servisModel = require('../models/servisModel');
const pelangganModel = require('../models/pelangganModel');
const kendaraanModel = require('../models/kendaraanModel');
const db = require('../config/database');

// Menampilkan seluruh data servis
exports.index = async (req, res) => {
    try {
        const search = req.query.search || '';
        const status = req.query.status || '';

        const servis = await servisModel.getAll(search, status);

        res.render('servis/index', {
            title: 'Riwayat Servis',
            servis,
            search,
            status
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal mengambil data servis');
    }
};

// Menampilkan form tambah servis
exports.createForm = async (req, res) => {
    try {
        const pelanggan = await pelangganModel.getAll();
        const kendaraan = await kendaraanModel.getAll();

        res.render('servis/tambah', {
            title: 'Tambah Servis',
            pelanggan,
            kendaraan
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal membuka form servis');
    }
};

// Menyimpan data servis baru
exports.store = async (req, res) => {
    try {
        const {
            id_pelanggan,
            id_kendaraan,
            tanggal_servis,
            keluhan,
            status,
            total_biaya
        } = req.body;

        if (!id_pelanggan || !id_kendaraan || !tanggal_servis) {
            return res.status(400).send('Data wajib belum lengkap');
        }

        const biaya = Number(total_biaya);

        if (!Number.isFinite(biaya) || biaya < 0) {
            return res.status(400).send('Biaya servis tidak valid');
        }

        // Memastikan kendaraan milik pelanggan yang dipilih
        const [kendaraan] = await db.execute(
            `SELECT id_kendaraan
             FROM kendaraan
             WHERE id_kendaraan = ?
             AND id_pelanggan = ?`,
            [id_kendaraan, id_pelanggan]
        );

        if (kendaraan.length === 0) {
            return res.status(400).send(
                'Kendaraan tidak sesuai dengan pelanggan yang dipilih'
            );
        }

        await servisModel.create({
            id_pelanggan,
            id_kendaraan,
            tanggal_servis,
            keluhan,
            status,
            total_biaya: biaya
        });

        res.redirect('/servis');
    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal menyimpan servis');
    }
};

// Menampilkan form edit servis
exports.editForm = async (req, res) => {
    try {
        const servis = await servisModel.getById(req.params.id);

        if (!servis) {
            return res.status(404).send('Data servis tidak ditemukan');
        }

        const pelanggan = await pelangganModel.getAll();
        const kendaraan = await kendaraanModel.getAll();

        res.render('servis/edit', {
            title: 'Edit Servis',
            servis,
            pelanggan,
            kendaraan
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal membuka form edit');
    }
};

// Memperbarui data servis
exports.update = async (req, res) => {
    try {
        const {
            id_pelanggan,
            id_kendaraan,
            tanggal_servis,
            keluhan,
            status,
            total_biaya
        } = req.body;

        const biaya = Number(total_biaya);

        if (
            !id_pelanggan ||
            !id_kendaraan ||
            !tanggal_servis ||
            !Number.isFinite(biaya) ||
            biaya < 0
        ) {
            return res.status(400).send('Data servis tidak valid');
        }

        // Memastikan kendaraan milik pelanggan yang dipilih
        const [kendaraan] = await db.execute(
            `SELECT id_kendaraan
             FROM kendaraan
             WHERE id_kendaraan = ?
             AND id_pelanggan = ?`,
            [id_kendaraan, id_pelanggan]
        );

        if (kendaraan.length === 0) {
            return res.status(400).send(
                'Kendaraan tidak sesuai dengan pelanggan yang dipilih'
            );
        }

        const result = await servisModel.update(req.params.id, {
            id_pelanggan,
            id_kendaraan,
            tanggal_servis,
            keluhan,
            status,
            total_biaya: biaya
        });

        if (!result.affectedRows) {
            return res.status(404).send('Data servis tidak ditemukan');
        }

        res.redirect('/servis');
    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal memperbarui servis');
    }
};

// Menghapus data servis
exports.destroy = async (req, res) => {
    try {
        const result = await servisModel.delete(req.params.id);

        if (!result.affectedRows) {
            return res.status(404).send('Data servis tidak ditemukan');
        }

        res.redirect('/servis');
    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal menghapus servis');
    }
};
