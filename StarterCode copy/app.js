function buildData(data) {
    d3.csv("data.csv").then((data) => {
      console.log(data);

      var filteredData = data.filter(s => s.State)[0];
      console.log(filteredData);
      
      var sample_metadata = d3.select("#sample-metadata");
      sample_metadata.html("");

      Object.entries(filteredData).forEach((key) => {
        sample_metadata.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");  

        });
    });
}

function buildCharts(){
  d3.csv("data.csv").then((data) => {
    var dates = data.Dates;
    console.log(dates);
    var positives = data.Positives;
    console.log(positives);
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
  });
}

function initFunction(){
  d3.csv("data.csv").then((data) => {
        console.log(data);
        var selection = d3.select("#selDataset");
        Object.entries(data).forEach(([index,value]) => {
            selection.append("option").text(value);
        })
        buildCharts(data[0]);
        buildData(data[0]);
    });
}

function optionChanged(sample){
    buildCharts(sample);
    buildData(sample);
}

initFunction();