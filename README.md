# A Little Birthday Trip to the Sea 🌊

Website ucapan ulang tahun interaktif — React + Vite + Framer Motion.
Perjalanan: **Arrival → Beach Walk → Birthday Reveal → Crab Interaction → Message Bottle → Wish Stars → Sunset Message → Final Gift**.

## 1. Instalasi

Pastikan Node.js versi 18+ sudah terpasang, lalu di folder project ini jalankan:

```bash
npm install
```

## 2. Menjalankan project (mode development)

```bash
npm run dev
```

Buka link yang muncul di terminal (biasanya `http://localhost:5173`).

## 3. Mengganti nama teman

Buka file:

```
src/data/birthdayData.js
```

Ubah baris:

```js
name: 'Kira',
```

menjadi nama teman kamu. Nama ini otomatis muncul di reveal, surat, dan surprise terakhir (tulis `{name}` di teks manapun di file ini untuk menyisipkan nama secara otomatis).

## 4. Mengganti isi pesan / surat

Masih di file yang sama, edit bagian:

```js
letter: {
  salutation: '...',
  paragraphs: ['...', '...'],
  signoff: '...',
},
```

Tambah/kurangi kalimat di `paragraphs` sesuka kamu — setiap kalimat akan muncul sebagai paragraf terpisah dengan animasi fade-in bertahap.

Kamu juga bisa mengedit:
- `wishes` — daftar kalimat random saat bintang di-klik (Section 6),
- `crabLines` — kalimat lucu si kepiting saat di-klik (Section 4),
- `closing` — teks penutup di surprise terakhir,
- `easterEgg` — teks rahasia (klik "psst..." 5x di Section 2).

## 5. Mengganti musik & sound effect

Taruh file audio kamu di `public/audio/` dengan nama:

- `birthday.mp3` — musik latar (loop, diaktifkan lewat tombol 🔈/🔊 di pojok kanan atas — **tidak autoplay**, sesuai kebiasaan browser)
- `click.mp3` — sfx tombol (opsional)
- `sparkle.mp3` — sfx bintang (opsional)
- `open.mp3` — sfx buka botol/kado (opsional)

Kalau file belum ada, website tetap berjalan normal — audio hanya akan di-skip diam-diam, tidak ada error di layar.

## 6. Build untuk deployment

```bash
npm run build
```

Hasil build ada di folder `dist/`. Upload isi folder tersebut ke hosting statis mana saja (Vercel, Netlify, GitHub Pages, cPanel, dsb).

Untuk cek hasil build secara lokal sebelum upload:

```bash
npm run preview
```

## Struktur folder

```
src/
├── components/
│   ├── BeachBackground.jsx   → langit, matahari, siluet pohon kelapa
│   ├── Ocean.jsx              → ombak animasi
│   ├── Clouds.jsx             → awan & burung
│   ├── Crab.jsx                → kepiting interaktif (Section 4)
│   ├── MessageBottle.jsx      → botol pesan + surat (Section 5)
│   ├── WishStars.jsx          → bintang permintaan (Section 6)
│   ├── GiftBox.jsx             → kado/treasure chest terakhir (Section 8)
│   ├── BeachConfetti.jsx      → confetti bertema pantai
│   ├── StoryLines.jsx         → teks storytelling bertahap
│   ├── EasterEgg.jsx           → easter egg tersembunyi
│   └── MusicToggle.jsx        → tombol musik on/off
├── data/
│   └── birthdayData.js       → SEMUA teks & nama yang perlu kamu edit
├── App.jsx                    → mengatur alur 8 scene
├── App.css                    → semua styling & animasi
└── main.jsx
```

Selamat mengedit dan semoga temanmu suka! 🐚✨
