//Creating map object
var map = L.map("map", {
    center: [23.6345, -102.5528],
    zoom: 5
  });


L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: 'mapbox/light-v9',
  accessToken: API_KEY
}).addTo(map);



// control that shows state info on hover
var info = L.control({ position: "bottomleft" });
info.onAdd = function (map) {
    
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Mexico Covid Cases</h4>' +  (props ?
        '<b>' + props.state_name + '</b><br />' + props.state_code + ' people / mi<sup>2</sup>'
        : 'Hover over a state');
};

info.addTo(map);


// get color depending on population density value

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}



var geoData = "static/data/mx_states.json";
d3.json(geoData, function(error, data) {
    // console.log(data);

    geojson = L.choropleth(data, {

        // Define what  property in the features to use
        valueProperty: "state_code",
    
        // Set color scale
        scale: ["#ffffb2", "#b10026"],
    
        // Number of breaks in step range
        steps: 10,
    
        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: {
          // Border color
          color: "#fff",
          weight: 1,
          fillOpacity: 0.8
        },
    
        // Binding a pop-up to each layer
        onEachFeature: function(feature, layer) {
          layer.bindPopup("Density: " + feature.properties.state_code + "<br>density:<br>" +
             + feature.properties.state_code);

            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            }); 
        },
      }).addTo(map);

    // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Mexico Covid</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(map);



});


map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

console.log('hola')

///////////

var geoData = "static/data/mx_states.json";
var prueba;
d3.json(geoData, function(error, data){
    var x;
    for (x in data.features) {
        data.features[x].properties.prueba = x;
    };
    // for (x in data.features) {
    //      console.log(data.features[x].properties)
    // };
    prueba = data;
    console.log(prueba)
});
