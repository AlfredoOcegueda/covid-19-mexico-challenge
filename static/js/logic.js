var seedData;

d3.json("http://127.0.0.1:5000/ageall").then(function(data) {
    console.log(data);
    seedData = data;

});

  function buildData(state, chartId) {

    am4core.ready(function() {

      // Themes begin
      am4core.useTheme(am4themes_animated);
    
      var mainContainer = am4core.create(chartId, am4core.Container);
      mainContainer.width = am4core.percent(100);
      mainContainer.height = am4core.percent(100);
      mainContainer.layout = "horizontal";
    
      var maleChart = mainContainer.createChild(am4charts.XYChart);
      maleChart.paddingRight = 0;
      maleChart.data = JSON.parse(JSON.stringify(state));
      
      // Create axes
      var maleCategoryAxis = maleChart.yAxes.push(new am4charts.CategoryAxis());
      maleCategoryAxis.dataFields.category = "age";
      maleCategoryAxis.renderer.grid.template.location = 0;
      //maleCategoryAxis.renderer.inversed = true;
      maleCategoryAxis.renderer.minGridDistance = 15;
      
      var maleValueAxis = maleChart.xAxes.push(new am4charts.ValueAxis());
      maleValueAxis.renderer.inversed = true;
      maleValueAxis.min = 0;
      maleValueAxis.max = 10;
      maleValueAxis.strictMinMax = true;
      
      maleValueAxis.numberFormatter = new am4core.NumberFormatter();
      maleValueAxis.numberFormatter.numberFormat = "#.#'%'";
      
      // Create series
      var maleSeries = maleChart.series.push(new am4charts.ColumnSeries());
      maleSeries.dataFields.valueX = "male";
      maleSeries.dataFields.valueXShow = "percent";
      maleSeries.calculatePercent = true;
      maleSeries.dataFields.categoryY = "age";
      maleSeries.interpolationDuration = 1000;
      maleSeries.columns.template.tooltipText = "Males, age {categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
      
      
      var femaleChart = mainContainer.createChild(am4charts.XYChart);
      femaleChart.paddingLeft = 0;
      femaleChart.data = JSON.parse(JSON.stringify(state));
      
      // Create axes
      var femaleCategoryAxis = femaleChart.yAxes.push(new am4charts.CategoryAxis());
      femaleCategoryAxis.renderer.opposite = true;
      femaleCategoryAxis.dataFields.category = "age";
      femaleCategoryAxis.renderer.grid.template.location = 0;
      femaleCategoryAxis.renderer.minGridDistance = 15;
      
      var femaleValueAxis = femaleChart.xAxes.push(new am4charts.ValueAxis());
      femaleValueAxis.min = 0;
      femaleValueAxis.max = 10;
      femaleValueAxis.strictMinMax = true;
      femaleValueAxis.numberFormatter = new am4core.NumberFormatter();
      femaleValueAxis.numberFormatter.numberFormat = "#.#'%'";
      femaleValueAxis.renderer.minLabelPosition = 0.01;
      
      // Create series
      var femaleSeries = femaleChart.series.push(new am4charts.ColumnSeries());
      femaleSeries.dataFields.valueX = "female";
      femaleSeries.dataFields.valueXShow = "percent";
      femaleSeries.calculatePercent = true;
      femaleSeries.fill = femaleChart.colors.getIndex(4);
      femaleSeries.stroke = femaleSeries.fill;
      femaleSeries.columns.template.tooltipText = "Females, age {categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
      femaleSeries.dataFields.categoryY = "age";
      femaleSeries.interpolationDuration = 1000;
    
      var label = mainContainer.createChild(am4core.Label);
      label.isMeasured = false;
      label.x = am4core.percent(50);
      label.horizontalCenter = "middle";
      label.y = 0;
      label.showOnInit = true;
      //label.text = "Population pyramid";
      label.hiddenState.properties.dy = -100;  
    });
    
    };

  function initFunction(){
    d3.json("/ageall").then(data => {
        console.log(data);
        var selection = d3.select("#selDataset");
        var selection2 = d3.select("#selDataset2");
        Object.entries(data).forEach(([index,value]) => {
            selection.append("option").text(index);
            selection2.append("option").text(index);
        })
        console.log(data["AGUASCALIENTES"]);
        buildData(data["AGUASCALIENTES"],"chartdiv");
        buildData(data["AGUASCALIENTES"],"chartdiv2");
    });
  }
    
  function optionChanged(newId){
      console.log(newId)
      buildData(seedData[newId],"chartdiv");
      //Plot(seedData[newId],"chartdiv");
  };

  function optionChanged2(newId){
    console.log(newId)
    buildData(seedData[newId],"chartdiv2");
    //Plot(seedData[newId],"chartdiv2");
};
  
  initFunction();

  function Plot(newId, chartId){
      
    am4core.ready(function() {
      
    // Themes begin
    am4core.useTheme(am4themes_animated);
  
    // Themes end
    var mainContainer = am4core.create(chartId, am4core.Container);
    mainContainer.width = am4core.percent(100);
    mainContainer.height = am4core.percent(100);
    mainContainer.layout = "horizontal";
  
    var maleChart = mainContainer.createChild(am4charts.XYChart);
    maleChart.paddingRight = 0;
    maleChart.data = JSON.parse(JSON.stringify(seedData[newId]));
    maleChart.data = seedData[newId];
    
    // Create axes
    var maleCategoryAxis = maleChart.yAxes.push(new am4charts.CategoryAxis());
    maleCategoryAxis.dataFields.category = "age";
    maleCategoryAxis.renderer.grid.template.location = 0;
    //maleCategoryAxis.renderer.inversed = true;
    maleCategoryAxis.renderer.minGridDistance = 15;
    
    var maleValueAxis = maleChart.xAxes.push(new am4charts.ValueAxis());
    maleValueAxis.renderer.inversed = true;
    maleValueAxis.min = 0;
    maleValueAxis.max = 10;
    maleValueAxis.strictMinMax = true;
    
    maleValueAxis.numberFormatter = new am4core.NumberFormatter();
    maleValueAxis.numberFormatter.numberFormat = "#.#'%'";
    
    // Create series
    var maleSeries = maleChart.series.push(new am4charts.ColumnSeries());
    maleSeries.dataFields.valueX = "male";
    maleSeries.dataFields.valueXShow = "percent";
    maleSeries.calculatePercent = true;
    maleSeries.dataFields.categoryY = "age";
    maleSeries.interpolationDuration = 1000;
    maleSeries.columns.template.tooltipText = "Males, age {categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
    
    
    var femaleChart = mainContainer.createChild(am4charts.XYChart);
    femaleChart.paddingLeft = 0;
    femaleChart.data = JSON.parse(JSON.stringify(seedData[newId]));
    femaleChart.data = seedData[newId];
    
    // Create axes
    var femaleCategoryAxis = femaleChart.yAxes.push(new am4charts.CategoryAxis());
    femaleCategoryAxis.renderer.opposite = true;
    femaleCategoryAxis.dataFields.category = "age";
    femaleCategoryAxis.renderer.grid.template.location = 0;
    femaleCategoryAxis.renderer.minGridDistance = 15;
    
    var femaleValueAxis = femaleChart.xAxes.push(new am4charts.ValueAxis());
    femaleValueAxis.min = 0;
    femaleValueAxis.max = 10;
    femaleValueAxis.strictMinMax = true;
    femaleValueAxis.numberFormatter = new am4core.NumberFormatter();
    femaleValueAxis.numberFormatter.numberFormat = "#.#'%'";
    femaleValueAxis.renderer.minLabelPosition = 0.01;
    
    // Create series
    var femaleSeries = femaleChart.series.push(new am4charts.ColumnSeries());
    femaleSeries.dataFields.valueX = "female";
    femaleSeries.dataFields.valueXShow = "percent";
    femaleSeries.calculatePercent = true;
    femaleSeries.fill = femaleChart.colors.getIndex(4);
    femaleSeries.stroke = femaleSeries.fill;
    femaleSeries.columns.template.tooltipText = "Females, age {categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
    femaleSeries.dataFields.categoryY = "age";
    femaleSeries.interpolationDuration = 1000;
  
    var label = mainContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.x = am4core.percent(50);
    label.horizontalCenter = "middle";
    label.y = 0;
    label.showOnInit = true;
    //label.text = newId + " Population pyramid";
    label.hiddenState.properties.dy = -100;         
  });
  };