var margin = 15,
    outerDiameter = 700,
    innerDiameter = outerDiameter - margin - margin;

var x = d3.scale.linear() 
    .range([0, innerDiameter]);

var y = d3.scale.linear() 
    .range([0, innerDiameter]);

var color = d3.scale.linear() 
    .domain([-1, 5])
    .range(["hsl(39,100%,50%)", "hsl(60,100%,83%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.layout.pack()
    // .sort(null)
    .padding(3)
    .size([innerDiameter, innerDiameter])
    .value(function(d) { return d.size; })
    .sort(function(a, b) {
          return -(a.value - b.value)
        });

var svg2 = d3.select("#area2").append("svg")
    .attr("width", outerDiameter)
    .attr("height", outerDiameter)
  .append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")");

d3.json("flare.json", function(error, root) {
  var focus = root,
      nodes = pack.nodes(root);

  var circle = svg2.append("g").selectAll("circle")
      .data(nodes)
    .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
      .on("click", function(d)  { if (focus !== d) zoom(d), d3.event.stopPropagation(); });


  var text = svg2.append("g").selectAll("text")
      .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? null : "none"; })
      .text(function(d) { return d.name; });

  d3.select(window)
      .on("click.foo", function() { zoom(root); });

  function zoom(d, i) {
    var focus0 = focus;
    focus = d;

    var k = innerDiameter / d.r / 2;
    x.domain([d.x - d.r, d.x + d.r]);
    y.domain([d.y - d.r, d.y + d.r]);

    d3.event.stopPropagation();

    var transition_text = text.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    var transition_circ = circle.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });


    transition_circ.filter("circle")
        .attr("r", function(d) { return k * d.r; });

    transition_text.filter("text")
      // .filter(function(d) { return d.parent === focus || d.parent === focus0; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }
});

d3.select(self.frameElement).style("height", outerDiameter + "px");
