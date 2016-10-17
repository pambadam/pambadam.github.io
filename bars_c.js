var svg1 = d3.select("svg");
var margin1 = {top: 20, right: 40, bottom: 30, left: 120},
    width = +svg1.attr("width") - margin1.left - margin1.right,
    height = +svg1.attr("height") - (2*margin1.top) - (2*margin1.bottom);


  
var tooltip = d3.select("body").append("div").attr("class", "toolTip");
  
var x_domain = d3.scaleLinear().range([0, width]);
var y_domain = d3.scaleBand().range([height, 0]);

var g1 = svg1.append("g")
    .attr("transform", "translate(" + margin1.left + "," + (2*margin1.top) + ")");
  
 cities = [
          {"area": "Ростов-на-Дону", "pop":76510},
          {"area":"Самара", "pop":18873},
          {"area":"Омск", "pop":15446},
          {"area":"Челябинск", "pop":22461},
          {"area":"Казань", "pop":8953},
          {"area":"Нижний Новгород", "pop":57372},
          {"area":"Екатеринбург", "pop":36361},
          {"area":"Новосибирск", "pop":54268},
          {"area":"Санкт-Петербург", "pop":73251},
          {"area":"Москва", "pop":250552}
        ]
        
  
    x_domain.domain([0, d3.max(cities, function(d) { return d.pop; })]);
    y_domain.domain(cities.map(function(d) { return d.area; })).padding(0.1);

    g1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x_domain).ticks(5).tickFormat(function(d) { return parseInt(d / 1000); }).tickSizeInner([-height]));

    g1.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y_domain));

    g1.selectAll(".bar")
        .data(cities)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", y_domain.bandwidth())
        .attr("y", function(d) { return y_domain(d.area); })
        .attr("width", function(d) { return x_domain(d.pop); })
        // .on("mousemove", function(d){
        //     tooltip
        //       .style("left", (d3.event.pageX - 30)+ "px")
        //       .style("top", (d3.event.pageY - 50) + "px")
        //       .style("display", "inline-block")
        //       .html((d.area) + ":"+ "<br>" + (d.pop));
        // })
        // .on("mouseout", function(d){ tooltip.style("display", "none");});


