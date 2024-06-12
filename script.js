// Function to update the current date and time
function updateCurrentDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = now.toLocaleDateString('id-ID', options);
    const currentTime = now.toLocaleTimeString('id-ID');

    document.getElementById('current-day').innerHTML = currentDate;
    document.getElementById('current-time').innerHTML = currentTime;
}

// Set the date we're counting down to
const countDownDate = new Date("Nov 27, 2024 07:00:00").getTime();

// Update the count down every 1 second
const x = setInterval(function() {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="countdown"
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // Update the current date and time
    updateCurrentDateTime();

    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
}, 1000);

// Function to export the HTML as an image
document.getElementById('export-button').addEventListener('click', function() {
    console.log("Tombol Export Gambar Ditekan!"); // console log
    html2canvas(document.querySelector(".back"), { 
        logging: true, // Aktifkan logging untuk debug
        allowTaint: true, // Izinkan gambar dari sumber lintas asal
        useCORS: true // Gunakan CORS untuk permintaan gambar
    }).then(canvas => {
        const img = canvas.toDataURL();
        const link = document.createElement('a');
        link.download = 'countdown_image.png';
        link.href = img;
        link.click();
    }).catch(error => {
        console.error('Gagal mengonversi gambar:', error);
    });
});