d3.json("http://127.0.0.1:5000/states/all").then(function(data) {
    console.log(data);
    });

function buildData(state) {

    d3.json("/states/all").then(data => {
      console.log(data);
      console.log(state);
      var filteredData = data.filter(s => s.state_name == state)[0];
      console.log(filteredData);
      
      var sample_metadata = d3.select("#sample-metadata");
      sample_metadata.html("");

      Object.entries(filteredData).forEach((key) => {
        sample_metadata.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");  

        });
    });
}

function buildCharts(){
  d3.json("/states/all").then(data => {
    data = data.splice(0, data.length - 1);
    console.log(data);
   var trace1 = {
      x: data.map(e => e.state_name),
      y: data.map(e => e.confirmed),
      name: 'Confirmed',
      type: 'bar'
   };
  
    var trace2 = {
      x: data.map(e => e.state_name),
      y: data.map(e => e.negatives),
      name: 'Negatives',
      type: 'bar'
    };
  
    var trace3 = {
      x: data.map(e => e.state_name),
      y: data.map(e => e.deaths),
      name: 'Deaths',
      type: 'bar'
    };
    var trace4 = {
      x: data.map(e => e.state_name),
      y: data.map(e => e.suspicious),
      name: 'Suspicious',
      type: 'bar'
    };

    var data_trace = [trace1, trace2,trace3,trace4];
  
    var layout_bar = {barmode: 'group'};

    Plotly.newPlot('gauge', data_trace, layout_bar);


    var data_map = [
      {
        type: "scattermapbox",
        text: data.map(e => e.confirmed),
        lon: data.map(e => e.longitude),
        lat: data.map(e => e.latitude),
        marker: { color: "red", size: 15}
     }
    ];
    console.log(data_map);
    var layout_map = {
        dragmode: "zoom",
        mapbox: { style: "open-street-map", center: { lat: 25, lon: -95 }, zoom: 4 },
        margin: { r: 0, t: 0, b: 0, l: 0 }
    };
    
    Plotly.newPlot("bubble", data_map, layout_map);

  });
}

function initFunction(){
    d3.json("/states/all").then(data => {
        console.log(data);
        var selection = d3.select("#selDataset");
        Object.entries(data).forEach(([index,value]) => {
            selection.append("option").text(value.state_name);
        })
        buildData(data[0].state_name);
    });
}
function optionChanged(sample){
    console.log(sample)
    buildData(sample);
}
initFunction();
buildCharts();