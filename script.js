// ==========================================================
// KONFIGURASI API DAN VARIABEL GLOBAL
// ==========================================================
const API_KEY = 'd2497c1d037baf6eb3c558b4173faea6';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// State global
let currentCity = 'Jakarta';
let units = 'metric'; // Default: 'metric' untuk Celsius
let updateInterval;

// Fitur Save Favorite Cities (di-load dari Local Storage)
let favoritesData = JSON.parse(localStorage.getItem('weatherFavoritesData')) || [];


// ==========================================================
// ELEMEN DOM (Pastikan ID ini ada di index.html)
// ==========================================================
// Search & Controls
const searchForm = document.getElementById('searchForm'); // ID form jika ada
const cityInput = document.getElementById('cityInput');
const btnSearch = document.getElementById('btnSearch'); 
const btnFavorite = document.getElementById('btnFavorite');
const btnManualRefresh = document.getElementById('btnManualRefresh'); 
const unitToggleBtn = document.getElementById('unitToggle');

// Display
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const forecastGrid = document.getElementById('forecastGrid');
const favoritesListContainer = document.getElementById('favoritesList');
const citySuggestions = document.getElementById('citySuggestions');

// Theme Toggle
const themeToggleSwitch = document.getElementById('themeToggleSwitch'); 


// ==========================================================
// INITIALIZATION & EVENT LISTENERS
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Tema Gelap/Terang
    if (themeToggleSwitch) { // <--- PENTING: Mencegah TypeError jika element null
        themeToggleSwitch.checked = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    }

    // 2. Muat dan Tampilkan Kota Favorit
    loadFavoritesUI();
    
    // 3. Muat data cuaca awal
    getWeatherData(currentCity);
    
    // 4. Mulai pembaruan otomatis (setiap 5 menit)
    startRealTimeUpdate();

    // 5. Listener untuk pencarian (saat tombol 'Enter' ditekan)
    if (cityInput) {
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }

    // Assign listeners
    if (btnSearch) btnSearch.addEventListener('click', handleSearch);
    if (btnManualRefresh) btnManualRefresh.addEventListener('click', manualRefresh);
    if (unitToggleBtn) unitToggleBtn.addEventListener('click', handleUnitToggle);
    if (btnFavorite) btnFavorite.addEventListener('click', toggleFavorite); // <--- PENTING: Mencegah TypeError
    
    // Handle Toggle Tema Gelap/Terang
    if (themeToggleSwitch) {
        themeToggleSwitch.addEventListener('change', () => {
            const html = document.documentElement;
            const newTheme = themeToggleSwitch.checked ? 'dark' : 'light';
            html.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
        // Set tema dari localStorage saat dimuat
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
        themeToggleSwitch.checked = savedTheme === 'dark';
    }
});


// ==========================================================
// HANDLERS
// ==========================================================

function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        currentCity = city;
        getWeatherData(city);
        cityInput.value = ''; 
        cityInput.blur(); 
    }
}

function manualRefresh() {
    getWeatherData(currentCity);
}

function handleUnitToggle() {
    units = units === 'metric' ? 'imperial' : 'metric';
    unitToggleBtn.innerText = units === 'metric' ? '°C' : '°F'; 
    getWeatherData(currentCity); 
    refreshFavoritesData(); 
}

function startRealTimeUpdate() {
    if (updateInterval) clearInterval(updateInterval);
    updateInterval = setInterval(() => {
        getWeatherData(currentCity);
        refreshFavoritesData();
    }, 300000); // 5 menit
}


// ==========================================================
// CORE FUNCTIONS: FETCH DATA
// ==========================================================

async function getWeatherData(city) {
    if (loadingIndicator) showLoading(true);
    if (errorMessage) errorMessage.classList.add('d-none');

    try {
        const currentResponse = await fetch(`${BASE_URL}/weather?q=${city}&units=${units}&lang=id&appid=${API_KEY}`);
        if (!currentResponse.ok) throw new Error(`Kota "${city}" tidak ditemukan.`);
        const currentData = await currentResponse.json();

        const forecastResponse = await fetch(`${BASE_URL}/forecast?q=${city}&units=${units}&lang=id&appid=${API_KEY}`);
        const forecastData = await forecastResponse.json();

        updateCurrentUI(currentData);
        updateForecastUI(forecastData);
        checkFavoriteStatus(currentData.name);
        updateFavoriteItemData(currentData);

    } catch (error) {
        if (errorMessage) {
            errorMessage.innerText = "Gagal memuat data: " + error.message;
            errorMessage.classList.remove('d-none');
        }
    } finally {
        if (loadingIndicator) showLoading(false);
    }
}

// ... (Fungsi updateCurrentUI, updateForecastUI, showLoading, dan semua fungsi FAVORITES tetap sama persis) ...
// Saya tidak mengulang fungsi-fungsi ini di sini karena ukurannya besar, 
// tetapi pastikan Anda menggunakan kode lengkap yang saya berikan sebelumnya untuk bagian ini.
// Di bawah ini adalah fungsi-fungsi yang TIDAK diulang:

// 1. function updateCurrentUI(data) { ... }
// 2. function updateForecastUI(data) { ... }
// 3. function showLoading(isLoading) { ... }
// 4. function toggleFavorite() { ... }
// 5. function updateFavoriteItemData(data) { ... }
// 6. async function refreshFavoritesData() { ... }
// 7. function checkFavoriteStatus(cityName) { ... }
// 8. function saveFavorites() { ... }
// 9. function loadFavoritesUI() { ... }

// ==========================================================
// SALIN DAN TEMPEL SISA KODE DARI JAWABAN SAYA SEBELUMNYA DI SINI!
// (Mulai dari updateCurrentUI hingga loadFavoritesUI)
// ==========================================================


/* MULAI BAGIAN JAVASCRIPT YANG TIDAK DIULANG */
// Pastikan Anda menyalin sisa kode (fungsi updateCurrentUI, updateForecastUI, showLoading, dan semua fungsi FAVORITES)
// dari balasan saya sebelumnya (sejak "function updateCurrentUI(data) { ... }") dan menempelkannya di sini.

function updateCurrentUI(data) {
    document.getElementById('locationName').innerText = `${data.name}, ${data.sys.country}`;

    const now = new Date(data.dt * 1000); // Gunakan timestamp dari API
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('currentTime').innerText = now.toLocaleDateString('id-ID', options);
    document.getElementById('lastUpdatedTime').innerText = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    document.getElementById('currentTemp').innerText = Math.round(data.main.temp);

    const desc = data.weather[0].description;
    document.getElementById('weatherDesc').innerText = desc.replace(/\b\w/g, l => l.toUpperCase());

    document.getElementById('humidity').innerText = data.main.humidity;
    
    // Konversi Kecepatan Angin (OpenWeatherMap memberikan m/s, diubah ke km/j jika metric)
    const windSpeedValue = units === 'metric' ? Math.round(data.wind.speed * 3.6) : Math.round(data.wind.speed);
    document.getElementById('windSpeed').innerText = windSpeedValue;

    // Keterlihatan (Visibility)
    const visibilityUnit = units === 'metric' ? 'km' : 'mi';
    const visibilityValue = units === 'metric' ? (data.visibility / 1000).toFixed(1) : (data.visibility / 1609.34).toFixed(1);
    document.getElementById('visibility').innerHTML = `${visibilityValue} <span class="small">${visibilityUnit}</span>`;


    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    document.getElementById('weatherIcon').alt = desc;

    // Simbol Unit
    const unitSymbol = units === 'metric' ? '°C' : '°F';
    const speedSymbol = units === 'metric' ? 'km/j' : 'mph';
    document.querySelectorAll('.unit-disp').forEach(el => el.innerText = unitSymbol);
    document.querySelector('.speed-unit').innerText = speedSymbol;
}

function updateForecastUI(data) {
    const grid = forecastGrid;
    if (!grid) return;
    grid.innerHTML = '';

    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyForecasts.slice(0, 5).forEach(day => {
        const dateDay = new Date(day.dt * 1000).toLocaleDateString('id-ID', { weekday: 'short' });
        
        const tempMax = Math.round(day.main.temp_max); 
        const tempMin = Math.round(day.main.temp_min - (units === 'metric' ? 2 : 3)); 

        const icon = day.weather[0].icon;
        const desc = day.weather[0].description.replace(/\b\w/g, l => l.toUpperCase());

        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `
            <div class="card h-100 text-center p-3 border-0 forecast-card">
                <div class="fw-medium mb-2 adaptive-text">${dateDay}</div>
                <img src="https://openweathermap.org/img/wn/${icon}.png" class="mx-auto forecast-icon" alt="${desc}">
                <div class="small mb-2 adaptive-text-50">${desc}</div>
                <div class="fw-bold adaptive-text">
                    <span class="temp-max">${tempMax}°</span> 
                    <span class="adaptive-text-50 ms-2 temp-min">${tempMin}°</span>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });
}

function showLoading(isLoading) {
    if (loadingIndicator) {
        if (isLoading) loadingIndicator.classList.remove('d-none');
        else loadingIndicator.classList.add('d-none');
    }
}

function toggleFavorite() {
    const index = favoritesData.findIndex(item => item.name === currentCity);

    if (index === -1) {
        // Tambahkan ke favorit
        const currentTemp = document.getElementById('currentTemp').innerText;
        const iconSrc = document.getElementById('weatherIcon').src;
        const iconCodeMatch = iconSrc ? iconSrc.match(/wn\/(.+)@4x\.png/) : null;
        const iconCode = iconCodeMatch ? iconCodeMatch[1] : '01d';

        favoritesData.push({
            name: currentCity,
            temp: currentTemp,
            icon: iconCode
        });
        btnFavorite.classList.add('active');
    } else {
        // Hapus dari favorit
        favoritesData.splice(index, 1);
        btnFavorite.classList.remove('active');
    }

    saveFavorites();
}

function updateFavoriteItemData(data) {
    const index = favoritesData.findIndex(item => item.name === data.name);
    if (index !== -1) {
        favoritesData[index].temp = Math.round(data.main.temp);
        favoritesData[index].icon = data.weather[0].icon;
        saveFavorites();
    }
}

async function refreshFavoritesData() {
    if (favoritesData.length === 0) {
        loadFavoritesUI();
        return;
    }

    const promises = favoritesData.map(item =>
        fetch(`${BASE_URL}/weather?q=${item.name}&units=${units}&lang=id&appid=${API_KEY}`)
            .then(res => res.json())
    );

    const results = await Promise.all(promises);
    results.forEach((data, index) => {
        if (data.cod === 200) {
            favoritesData[index].temp = Math.round(data.main.temp);
            favoritesData[index].icon = data.weather[0].icon;
        }
    });
    saveFavorites();
}

function checkFavoriteStatus(cityName) {
    currentCity = cityName;
    const isFavorite = favoritesData.some(item => item.name === cityName);
    if (btnFavorite) {
        if (isFavorite) {
            btnFavorite.classList.add('active');
        } else {
            btnFavorite.classList.remove('active');
        }
    }
}

function saveFavorites() {
    localStorage.setItem('weatherFavoritesData', JSON.stringify(favoritesData));
    loadFavoritesUI();
}

function loadFavoritesUI() {
    const list = favoritesListContainer;
    const suggestions = citySuggestions;
    
    if (!list || !suggestions) return;

    list.innerHTML = '';
    suggestions.innerHTML = '';

    if (favoritesData.length === 0) {
        list.innerHTML = '<span class="text-muted small fst-italic px-3 py-2 d-block">Belum ada kota disimpan.</span>';
    }

    favoritesData.forEach(item => {
        const listItem = document.createElement('button');
        listItem.className = 'saved-city-item list-group-item list-group-item-action d-flex justify-content-between align-items-center';
        const unitSymbol = units === 'metric' ? '°C' : '°F';

        listItem.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <img src="https://openweathermap.org/img/wn/${item.icon}.png" alt="icon" style="width: 30px; height: 30px;">
                <span class="city-name fw-medium">${item.name}</span>
            </div>
            <span class="city-temp fw-bold">${item.temp}${unitSymbol}</span>
        `;

        listItem.onclick = () => {
            currentCity = item.name;
            getWeatherData(item.name);
        };
        list.appendChild(listItem);

        const option = document.createElement('option');
        option.value = item.name;
        suggestions.appendChild(option);
    });
}