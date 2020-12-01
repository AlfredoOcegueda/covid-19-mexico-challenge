function buildData() {

    d3.json('/states/all', function(data) {
    console.log("si funciona")
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
  });

    var barchart = [{
        type: 'bar',
        x: [20, 14, 23],
        y: ['giraffes', 'orangutans', 'monkeys'],
        orientation: 'h'
    }];
  
    Plotly.newPlot('gauge', barchart); 

    Plotly.d3.csv('data2.csv', function(err, rows){
      function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
      }

      var data = [{
          type: 'choropleth',
          locationmode: 'MEXICO-states',
          locations: unpack(rows, 'code'),
          z: unpack(rows, 'Postives'),
          text: unpack(rows, 'States'),
          zmin: 0,
          zmax: 17000,
          colorscale: [
              [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
              [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
              [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
          ],
          colorbar: {
              title: '# cases',
              thickness: 0.2
          },
          marker: {
              line:{
                  color: 'rgb(255,255,255)',
                  width: 2
              }
          }
      }];


      var layout = {
          title: 'COVID 19 cases by State',
          geo:{
              scope: 'mexico',
              showlakes: true,
              lakecolor: 'rgb(255,255,255)'
          }
      };

      Plotly.newPlot("bubble", data, layout, {showLink: false});
});



}

function initFunction(){
  d3.csv("data.csv").then((data) => {
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

//initFunction();
buildData();