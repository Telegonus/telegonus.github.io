document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([20.0, 0.0], 2); // Adjust view as needed

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; OpenStreetMap contributors',
        maxZoom: 18,
    }).addTo(map);

    fetch('../coordinates.json') // Make sure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Initialize an array to hold the coordinates for the polyline
            var polylineCoordinates = [];

            data.locations.forEach(location => {
                var latlng = [location.lat, location.lng];

                // Add marker for each location
                L.marker(latlng).addTo(map)
                    .bindPopup(location.description);

                // Add this location's coordinates to the array
                polylineCoordinates.push(latlng);
            });

            // Create a polyline using the array of coordinates and add it to the map
            console.log(polylineCoordinates); // Check the array content
            var polyline = L.polyline(polylineCoordinates, {color: 'red'}).addTo(map);

            // Optional: adjust the view to show all markers and polylines
            map.fitBounds(polyline.getBounds());
        })
        .catch(error => {
            console.error('Error loading coordinates:', error);
        });
});
