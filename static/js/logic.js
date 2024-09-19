// Create map object
let myMap = L.map ("map",{
    center: [37.09, -95.71],
    zoom: 4
});

  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
legend = L.control({ position: 'bottomright' })


legend.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend')
var grades = [0, 10, 30, 50, 70, 100];
var labels = [];
var lab_limits =['-10-10','10-30','30-50','50-70','70-90','90+']
div.innerHTML +=
    '<div class="legend">'
    for (var i = 0; i < grades.length; i++) {

        div.innerHTML +=
       '<div class="legend-item"><div class="legend-color" style="background:' + getColor(grades[i] + 1) + '"></div>' +
        lab_limits[i] + '</div>';
  }
  div.innerHTML +='</div>  ' 
   
    return div
  }
  legend.addTo(myMap)
  
        // color for depth.
        function getColor(depth) {
          if (depth> 90) return "Red";
          else if (depth >70) return "Orangered";
          else if (depth >50) return "Orange";
          else if (depth >30) return "gold";
          else if (depth >10) return "yellow";
          else return "lightgreen";
        }
  // Create the createMarkers function.
  function createMarkers() {
    // Define the URL for GeoJSON data.
    let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
    // GeoJSON data from the USGS website.
    d3.json(link).then(function (data) {
        console.log(data.features);
        
  
  
  
        // Function to determine the size based on magnitude.
        function getSize(magnitude) {
            return magnitude * 4; // 
        }
      // Create a GeoJSON layer and add it to the map.
      let myLayer = L.geoJSON(data.features, {
        pointToLayer: function (feature, latlng) {
            // Create a circle marker with color and size based on earthquake properties.
            return L.circleMarker(latlng, {
                radius: getSize(feature.properties.mag),
                fillColor: getColor(feature.geometry.coordinates[2]),
                color: 'black',
                weight: 0.5,
                opacity: 1,
                fillOpacity: 0.75
            }).bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(myMap)

    
});
}

createMarkers()