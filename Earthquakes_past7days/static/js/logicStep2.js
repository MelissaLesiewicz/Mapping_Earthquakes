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
	center: [39.5, -98.5],
	zoom: 3,
	layers: [streets]
});

//Add control layer to the map
L.control.layers(baseMaps).addTo(map);

//Funtion taht returns the style data for each element. Radius of marker is determined by the magnitude of the earthquake.
function styleInfo(feature) {
	return {
	opacity: 1,
	fillOpacity: 1,
	fillColor: "#ffae42",
	color: "#000000",
	radius: getRadius(feature.properties.mag),
	stroke: true,
	weight: 0.5
  };
};

function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
	L.geoJson(data, {
	pointToLayer: function(feature, latlng) {
		console.log(feature);
		return L.circleMarker(latlng);
		},	
		style: styleInfo
	}).addTo(map);
});



