
require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
const dashboardRoutes = require('./routes/dashboard');
const pelangganRoutes = require('./routes/pelanggan');
const kendaraanRoutes = require('./routes/kendaraan');
const layananRoutes = require('./routes/layanan');
const servisRoutes = require('./routes/servis');

// Konfigurasi EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// URL Routes
app.use('/', dashboardRoutes);
app.use('/pelanggan', pelangganRoutes);
app.use('/kendaraan', kendaraanRoutes);
app.use('/layanan', layananRoutes);
app.use('/servis', servisRoutes);

// Halaman 404
app.use((req, res) => {
    res.status(404).send('Halaman tidak ditemukan');
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).send('Terjadi kesalahan pada server');
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`BengkelKu berjalan di http://localhost:${PORT}`);
});
