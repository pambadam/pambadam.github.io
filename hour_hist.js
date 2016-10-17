
var margin5 = {top: 20, right: 30, bottom: 30, left: 40},
    width5 = 660 - margin5.left - margin5.right,
    height5 = 300 - margin5.top - margin5.bottom;

var x5 = d3.scale.ordinal()
    .rangeRoundBands([0, width5], .1);

var y5 = d3.scale.linear()
    .range([height5, 0]);

var x5Axis = d3.svg.axis()
    .scale(x5)
    .orient("bottom");

var y5Axis = d3.svg.axis()
    .scale(y5)
    .orient("left");

var chart5 = d3.select(".chart")
    .attr("width", width5 + margin5.left + margin5.right)
    .attr("height", height5 + margin5.top + margin5.bottom)
  .append("g")
    .attr("transform", "translate(" + margin5.left + "," + margin5.top + ")");

d3.tsv("data.tsv", type, function(error, data) {
  x5.domain(data.map(function(d) { return d.hour; }));
  y5.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  chart5.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height5 + ")")
      .call(x5Axis);

  chart5.append("g")
      .attr("class", "y axis")
      .call(y5Axis.ticks(10, "%"));

  chart5.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x5(d.hour); })
      .attr("y", function(d) { return y5(d.frequency); })
      .attr("height", function(d) { return height5 - y5(d.frequency); })
      .attr("width", x5.rangeBand());
});

function type(d) {
  d.frequency = +d.frequency; // coerce to number
  return d;
}