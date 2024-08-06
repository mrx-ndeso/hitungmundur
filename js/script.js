const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTYD4OHizhLpv4owqAldeFT4DKkIllo9czWtYdBL1bx48uOhSKcHI77qRI4AzIi3or_NVDNCVfUtw8O/pub?output=csv'; // Ganti dengan URL CSV Anda

// Fungsi untuk mengambil data dari spreadsheet
async function fetchSpreadsheetData() {
    try {
        const response = await fetch(spreadsheetUrl);
        const text = await response.text();

        // Memisahkan data CSV menjadi array dua dimensi
        const data = text.split('\n').map(row => row.split(','));
        return data;
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
    }
}

// Fungsi untuk memperbarui tautan di dalam container
function updateLinks(data) {
    const linksContainer = document.getElementById('links-container');
    linksContainer.innerHTML = ''; // Menghapus tautan yang sudah ada

    data.forEach(([label, link], index) => {
        // Memvalidasi data dan melewati baris yang tidak lengkap
        if (label && link) {
            // Memastikan URL dimulai dengan http:// atau https://
            const url = link.startsWith('http://') || link.startsWith('https://') ? link : `http://${link}`;

            const anchor = document.createElement('a');
            anchor.textContent = label;
            anchor.href = url;
            anchor.classList.add('link');
            anchor.target = '_blank'; // Membuka tautan di tab baru
            linksContainer.appendChild(anchor);
        }
    });
}

// Fungsi untuk memberikan warna acak ke setiap tautan
function applyRandomColors() {
    const links = document.querySelectorAll('.link');
    links.forEach(link => {
        const randomColor = getRandomColor();
        link.style.backgroundColor = randomColor;
    });
}

// Fungsi untuk menghasilkan warna acak
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Eksekusi ketika DOM telah selesai dimuat
document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchSpreadsheetData();
    updateLinks(data);
    applyRandomColors(); // Terapkan warna setelah tautan diperbarui
});
