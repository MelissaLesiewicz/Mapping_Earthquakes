// Add console.log to check to see if our code is working.
console.log("working");

let cityData = cities;

// We create the tile layer that will show street map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Create tile layer that add dark back drop
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
//credt base layer that holds both maps.
let baseMaps = {
	satStreets: satelliteStreets,
	streets: streets
};

//Creat the map object with Option
let map = L.map('mapid', {
	center: [43.7, -79.3],
	zoom: 11,
	layers: [streets]
});

//Add control layer to the map
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/MelissaLesiewicz/Mapping_Earthquakes/main/majorAirports.json";
let torontoData = "https://raw.githubusercontent.com/MelissaLesiewicz/Mapping_Earthquakes/main/torontoRoutes.json";
let torontoHoods = "https://raw.githubusercontent.com/MelissaLesiewicz/Mapping_Earthquakes/main/torontoNeighborhoods.json";

let myStyle = {
	fillColor: "yellow",
	lineweight: 1,
	color: "blue",
	opacity: 0.5
};

// Grabbing our GeoJSON Toronto data.
d3.json(torontoHoods).then(function(data) {
    console.log(data);
 // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
	  style: myStyle,
	  onEachFeature: function(feature, layer) {
		layer.bindPopup("<h3>" + feature.properties.AREA_NAME + "</h3>")
	  }
  }).addTo(map);
});





//Create marker to Los Angeles, CA

/* // Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
 console.log(city)
 L.circleMarker(city.location, {
	 color: 'orange',
	 lineweight: 4,
	 radius: city.population/200000
 })
 .bindPopup("<h2>" + city.city + "," + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>").addTo(map)
});

/* // Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

L.geoJSON(sanFranAirport, {
	OnEachFeature: function(feature, layer) {
		console.log(layer);
		layer.bindPopup()
	}
}).addTo(map); */
	