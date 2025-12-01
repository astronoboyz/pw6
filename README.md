# ☁️ Weather Dashboard | Tugas Akhir Pemrograman Web

Aplikasi *dashboard* cuaca modern berbasis web yang menampilkan informasi cuaca *real-time* dan ramalan cuaca 5 hari ke depan. Proyek ini dibangun menggunakan **Vanilla JavaScript** (Fetch API) dengan desain antarmuka **Glassmorphism** yang *eye-catching* dan responsif.


## 🖼️ Tampilan Antarmuka (Preview)

Berikut adalah pratinjau visual dari desain **Glassmorphism** dan **Dark/Light Mode** aplikasi *Weather Dashboard* Anda.

### ☀️ Mode Terang (Light Mode)

![Pratinjau Mode Terang](https://raw.githubusercontent.com/username/repo-name/main/assets/light-mode.png) 

### 🌙 Mode Gelap (Dark Mode)

![Pratinjau Mode Gelap](https://raw.githubusercontent.com/username/repo-name/main/assets/dark-mode.png)

## ✨ Fitur Utama (Core Features)

| Fitur | Deskripsi | Status |
| :--- | :--- | :--- |
| **Glassmorphism UI** | Desain antarmuka modern dengan efek kaca (*blur*) dan transparansi yang menonjol. | ✅ |
| **Real-time Weather Data** | Menampilkan suhu, kelembaban, kecepatan angin, jarak pandang, dan kondisi cuaca terkini. | ✅ |
| **5-Day Forecast** | Ramalan cuaca harian untuk 5 hari ke depan, diolah dari data 3-jam. | ✅ |
| **Search & Auto-complete** | Pencarian kota global dengan saran otomatis menggunakan Geocoding API. | ✅ |
| **Favorites System** | Simpan dan tampilkan kota favorit di *Sidebar* menggunakan **Local Storage**. | ✅ |
| **Unit Conversion** | Konversi satuan suhu (Celsius/Fahrenheit) dan kecepatan angin (*km/h* / *mph*). | ✅ |
| **Real-time Update** | Data cuaca utama diperbarui secara otomatis setiap **5 menit**. | ✅ |
| **Dark & Light Mode** | Tema tampilan yang dapat diubah dan disimpan (*persisted*) di *browser*. | ✅ |
| **Localization** | Seluruh data dan antarmuka disajikan dalam **Bahasa Indonesia**. | ✅ |

---

## 🛠️ Teknologi yang Digunakan

Aplikasi ini dikembangkan menggunakan stack web dasar (HTML, CSS, JS) dengan bantuan Bootstrap untuk grid dan komponen.

| Kategori | Teknologi | Versi/Fitur Kunci |
| :--- | :--- | :--- |
| **Data Source** | **OpenWeatherMap API** | Endpoint `/weather` dan `/forecast` |
| **Framework CSS** | **Bootstrap 5.3** | Grid System, Komponen (Switch), Bootstrap Icons |
| **Styling** | CSS3 (Custom) | Efek **Glassmorphism**, CSS Variables, Transisi |
| **Logic** | JavaScript (ES6+) | `Async/Await`, `Fetch API`, DOM Manipulation |
| **Penyimpanan** | **Local Storage** | Menyimpan `favoritesData` dan preferensi tema |

---

## 📂 Struktur Folder Proyek

/weather-dashboard ├── index.html # Struktur dasar halaman (HTML5) ├── style.css # Styling, tema, dan implementasi Glassmorphism ├── script.js # Logika aplikasi dan komunikasi API └── README.md # Dokumentasi proyek


---

## ⚙️ Cara Menjalankan Proyek

1.  **Clone Repository:**
    ```bash
    git clone [https://www.andarepository.com/](https://www.andarepository.com/)
    cd weather-dashboard
    ```

2.  **Dapatkan API Key:**
    * Pastikan Anda memiliki **API Key** yang valid dari [OpenWeatherMap].

3.  **Konfigurasi Kunci API:**
    * Buka file `script.js`.
    * Ganti *placeholder* `API_KEY` pada baris awal dengan kunci Anda:
        ```javascript
        const API_KEY = 'KUNCI_API_ANDA_DI_SINI';
        ```

4.  **Akses Aplikasi:**
    * Buka `index.html` menggunakan *browser* Anda (Disarankan menggunakan fitur Live Server di VS Code untuk menghindari isu CORS).

---

## 🎓 Tentang Proyek

Proyek ini bertujuan untuk mendemonstrasikan penguasaan konsep-konsep inti Pemrograman Web, meliputi:
* Asynchronous JavaScript (AJAX/Fetch API).
* Manajemen *State* Aplikasi sederhana.
* Manipulasi DOM yang efisien.
* Penggunaan **Local Storage** untuk persistensi data pengguna.
* Desain responsif dan modern (Glassmorphism).

---
