document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([20.0, 0.0], 2); // Adjust view as needed

    var customIcon = L.icon({
            iconUrl: '../marker.png',
            iconSize: [40, 80], // Size of the icon
            iconAnchor: [25, 50], // Point of the icon which will correspond to marker's location
            popupAnchor: [0, -50] // Point from which the popup should open relative to the iconAnchor
            });

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

    // Get the index of the last location in the array
    var lastIndex = data.locations.length - 1;

    data.locations.forEach((location, index) => {
        var latlng = [location.lat, location.lng];
        
        // Add this location's coordinates to the array
        polylineCoordinates.push(latlng);

        // Check if this is the last location; if so, add the marker
        if (index === lastIndex) {
            L.marker(latlng, {icon: customIcon}).addTo(map)
                .bindPopup(location.description);
        }
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
