// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
  };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv")
    .then(function(povertyData) {
  
    povertyData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    //   data.abbr = +data.abbr;
    });
  
    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(povertyData, d => d.healthcare)])
        .range([0, width]);
  
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(povertyData, d => d.healthcare+5)])
      .range([height, 0]);
  
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);
  
    var circlesGroup = chartGroup.selectAll("circle")
      .data(povertyData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", 20)
      .attr("fill", "#17a2b8")
      .attr("opacity", ".5");
  
    var labelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height + 20})`);
  
    var povertyLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "poverty")
      .classed("active", true)
      .text("In Poverty (%)");

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .classed("axis-text", true)
      .text("Lacks Healthcare (%)");

    chartGroup
      .selectAll(".stateText")
      .data(povertyData)
      .enter()
      .append("text")
      .classed("stateText",true)
      .attr("x", function(data) {
        return xLinearScale(data.poverty - 0);
      })
      .attr("y", function(data) {
        return yLinearScale(data.healthcare - 0.2);
      })
      .text(function(data) {
        console.log(data.abbr);
        return data.abbr; 
      })
});


    