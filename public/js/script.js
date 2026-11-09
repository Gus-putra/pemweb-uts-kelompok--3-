
document.addEventListener('DOMContentLoaded', () => {
    console.log('BengkelKu berhasil dimuat!');

    const pelangganSelect = document.getElementById('id_pelanggan');
    const kendaraanSelect = document.getElementById('id_kendaraan');

    if (!pelangganSelect || !kendaraanSelect) {
        return;
    }

    async function muatKendaraan(idPelanggan, idKendaraanTerpilih = '') {
        kendaraanSelect.innerHTML =
            '<option value="">Memuat kendaraan...</option>';
        kendaraanSelect.disabled = true;

        if (!idPelanggan) {
            kendaraanSelect.innerHTML =
                '<option value="">Pilih pelanggan terlebih dahulu</option>';
            return;
        }

        try {
            const response = await fetch(`/servis/kendaraan/${idPelanggan}`);

            if (!response.ok) {
                throw new Error('Gagal mengambil data kendaraan');
            }

            const kendaraan = await response.json();

            kendaraanSelect.innerHTML =
                '<option value="">Pilih Kendaraan</option>';

            if (kendaraan.length === 0) {
                kendaraanSelect.innerHTML =
                    '<option value="">Pelanggan belum memiliki kendaraan</option>';
                return;
            }

            kendaraan.forEach(k => {
                const option = document.createElement('option');

                option.value = k.id_kendaraan;
                option.textContent =
                    `${k.nomor_polisi} - ${k.merek} ${k.tipe}`;

                if (String(k.id_kendaraan) === String(idKendaraanTerpilih)) {
                    option.selected = true;
                }

                kendaraanSelect.appendChild(option);
            });

            kendaraanSelect.disabled = false;

        } catch (error) {
            console.error(error);

            kendaraanSelect.innerHTML =
                '<option value="">Gagal memuat kendaraan</option>';
        }
    }

    // Saat pelanggan diganti, muat kendaraan milik pelanggan tersebut.
    pelangganSelect.addEventListener('change', function () {
        muatKendaraan(this.value);
    });
});
