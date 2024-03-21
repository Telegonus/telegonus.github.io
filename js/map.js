document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([20.0, 0.0], 2); // Adjust view as needed

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; OpenStreetMap contributors',
        maxZoom: 18,
    }).addTo(map);

    fetch('coordinates.json')
        .then(response => response.json())
        .then(data => {
            data.locations.forEach(location => {
                L.marker([location.lat, location.lng]).addTo(map)
                    .bindPopup(location.description);
            });
        })
        .catch(error => console.log('Error loading coordinates:', error));
});