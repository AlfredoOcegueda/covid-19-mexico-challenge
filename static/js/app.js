d3.json("http://127.0.0.1:5000/states/all").then(function(data) {
    console.log("si funciona")
    console.log(data);
    });

function buildData(state) {

    d3.json("/states/all").then(data => {
        console.log("si funciona")
        console.log(data);

      var filteredData = data.filter(s => s.state_name == state)[0];
      console.log(filteredData);
      
      var sample_metadata = d3.select("#sample-metadata");
      sample_metadata.html("");

      Object.entries(filteredData).forEach((key) => {
        sample_metadata.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");  

        });
    });
}

function buildCharts(data){
    /*d3.json('/states/all', function(data) {
    var dates = data.Dates;
    var positives = data.Positives;
    var states = data.State;
    console.log(states);

    var trace1 = {
      x: dates,
      y: positives,
      text: states,
      mode: 'markers',
      name: 'Scatter'
    };
  
    var scatterData = [trace1];

    var layout = {
      title: 'TREND',
      xaxis: { title: "Time"}, 
    };

    Plotly.newPlot('bar', scatterData, layout);
  });*/

    var barchart = [{
        type: 'bar',
        x: data.map(e => e.confirmed),
        y: data.map(e => e.state_name),
        orientation: 'h',
        color: 'rgb(142,124,195)'
    }];
    Plotly.newPlot('gauge', barchart);


      var data = [
        {
            type: "scattermapbox",
            text: data.map(e => e.confirmed),
            lon: data.map(e => e.longitude),
            lat: data.map(e => e.latitude),
            marker: { color: "red", size: data.map(e => e.confirmed)*0.2 }
        }
    ];

    var layout = {
        dragmode: "zoom",
        mapbox: { style: "open-street-map", center: { lat: 25, lon: -95 }, zoom: 4 },
        margin: { r: 0, t: 0, b: 0, l: 0 }
    };
      Plotly.newPlot("bubble", data, layout);
}

function initFunction(){
    d3.json("/states/all").then(data => {
        console.log(data);
        var selection = d3.select("#selDataset");
        Object.entries(data).forEach(([index,value]) => {
            selection.append("option").text(value);
        })

        buildCharts(data);
        buildData(data[0]);
    });
}

function optionChanged(sample){
    buildCharts(sample);
    buildData(sample);
}

initFunction();