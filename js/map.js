document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([20.0, 0.0], 2); // Adjust the view as needed

    var customIcon = L.icon({
        iconUrl: '../marker.png', // Ensure this path is correct
        iconSize: [40, 80], // Size of the icon
        iconAnchor: [25, 50], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -50] // Point from which the popup should open relative to the iconAnchor
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; OpenStreetMap contributors',
        maxZoom: 18,
    }).addTo(map);

    // Fetch the combined JSON data (assuming locations and transports are in the same file now)
    fetch('../data.json') // Adjust this path to where your updated JSON file is located
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Initialize an array to hold the coordinates for the polyline
            var polylineCoordinates = [];

            // Plot each location on the map
            data.locations.forEach((location, index) => {
                var latlng = [location.lat, location.lng];
                polylineCoordinates.push(latlng);

                // Optionally, add a marker for the last location
                if (index === data.locations.length - 1) {
                    L.marker(latlng, {icon: customIcon}).addTo(map)
                        .bindPopup(location.description);
                }
            });

            // Create a polyline using the array of coordinates and add it to the map
            var polyline = L.polyline(polylineCoordinates, {color: 'red'}).addTo(map);
            map.fitBounds(polyline.getBounds());

            // Display transport data
            const transportList = document.getElementById('transport-list');
            Object.entries(data.transports).forEach(([type, duration]) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${type}: ${duration} hours`;
                transportList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
});
