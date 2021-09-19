// Add console.log to check to see if our code is working.
console.log("working");

let cityData = cities;

//Creat the map object with Option
let map = L.map('mapid').setView([37.6213, -122.3790], 5);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

//Create marker to Los Angeles, CA

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
 console.log(city)
 L.circleMarker(city.location, {
	 color: 'orange',
	 lineweight: 4,
	 radius: city.population/200000
 })
 .bindPopup("<h2>" + city.city + "," + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>").addTo(map)
});

let line = [
[33.9416, -118.4085],
[37.6213, -122.3790],
[40.7899, -111.9791],
[47.4502, -122.3088]
];
let myRoute = [
[37.6213, -122.3790],
[30.1975, -97.6664],
[42.2162, -83.3554],
[40.6413, -73.7781],
[43.6777, -79.6248]
];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
  color: "yellow"
}).addTo(map);

L.polyline(myRoute, {
	color: 'blue',
	dashArray: '5, 5',
	weight: 4,
	opacity: 0.5
}).addTo(map);
	