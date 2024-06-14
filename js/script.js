const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTYD4OHizhLpv4owqAldeFT4DKkIllo9czWtYdBL1bx48uOhSKcHI77qRI4AzIi3or_NVDNCVfUtw8O/pubhtml'; // Ganti dengan URL spreadsheet yang dipublish

async function fetchSpreadsheetData() {
    try {
        const response = await fetch(spreadsheetUrl);
        const text = await response.text();

        // Menggunakan DOMParser untuk mengubah HTML menjadi dokumen DOM
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        
        // Mengambil data dari tabel yang ada di spreadsheet
        const table = doc.querySelector('table');
        const rows = table.querySelectorAll('tr');
        
        const data = [];
        rows.forEach((row, index) => {
            const cells = row.querySelectorAll('td');
            if (index !== 0 && cells.length > 1) { // Melewati header
                data.push([cells[0].innerText, cells[1].innerText]);
            }
        });

        return data;
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
    }
}

function updateLinks(data) {
    const linksContainer = document.getElementById('links-container');
    data.forEach(([label, link]) => {
        const anchor = document.createElement('a');
        anchor.textContent = label;
        anchor.href = link;
        anchor.classList.add('link');
        linksContainer.appendChild(anchor);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchSpreadsheetData();
    updateLinks(data);
});


document.addEventListener('DOMContentLoaded', () => {
    // Select all links with the 'link' class
    const links = document.querySelectorAll('.link');

    links.forEach(link => {
        const randomColor = getRandomColor();
        link.style.backgroundColor = randomColor;
    });

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
