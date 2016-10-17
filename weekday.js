    datasetTotal = [{"label":"Понедельник","value":11.9},{"label":"Вторник","value":12.3},{"label":"Среда","value":11.9},{"label":"Четверг","value":12.0},{"label":"Пятница","value":15.1},{"label":"Суббота","value":13.4},{"label":"Воскресенье","value":14.1}];

    dataset_msk =[{"label":"Понедельник","value":13.1},{"label":"Вторник","value":13.6},{"label":"Среда","value":13.1},{"label":"Четверг","value":13.3},{"label":"Пятница","value":16.5},{"label":"Суббота","value":14.8},{"label":"Воскресенье","value":15.5}];

    dataset_spb =[{"label":"Понедельник","value":13.0},{"label":"Вторник","value":13.9},{"label":"Среда","value":13.4},{"label":"Четверг","value":13.1},{"label":"Пятница","value":16.6},{"label":"Суббота","value":15.1},{"label":"Воскресенье","value":14.9}];

    dataset_nsib =[{"label":"Понедельник","value":13.0},{"label":"Вторник","value":13.5},{"label":"Среда","value":13.1},{"label":"Четверг","value":13.3},{"label":"Пятница","value":16.2},{"label":"Суббота","value":14.9},{"label":"Воскресенье","value":16.1}];
    dataset_ekb = [{"label":"Понедельник","value":13.3},{"label":"Вторник","value":13.6},{"label":"Среда","value":12.5},{"label":"Четверг","value":13.1},{"label":"Пятница","value":17.2},{"label":"Суббота","value":14.5},{"label":"Воскресенье","value":15.8}];

    dataset_nnov = [{"label":"Понедельник","value":13.3},{"label":"Вторник","value":13.7},{"label":"Среда","value":13.5},{"label":"Четверг","value":13.2},{"label":"Пятница","value":16.7},{"label":"Суббота","value":14.4},{"label":"Воскресенье","value":15.2}];
    dataset_kaz =  [{"label":"Понедельник","value":13.2},{"label":"Вторник","value":14.2},{"label":"Среда","value":13.2},{"label":"Четверг","value":12.9},{"label":"Пятница","value":17.4},{"label":"Суббота","value":13.6},{"label":"Воскресенье","value":15.5}];

    dataset_chb =[{"label":"Понедельник","value":13.0},{"label":"Вторник","value":13.4},{"label":"Среда","value":13.1},{"label":"Четверг","value":13.1},{"label":"Пятница","value":17.4},{"label":"Суббота","value":13.9},{"label":"Воскресенье","value":16.1}];
    dataset_omsk =[{"label":"Понедельник","value":13.7},{"label":"Вторник","value":13.0},{"label":"Среда","value":13.2},{"label":"Четверг","value":12.1},{"label":"Пятница","value":17.1},{"label":"Суббота","value":14.9},{"label":"Воскресенье","value":16.0}];

    dataset_sam = [{"label":"Понедельник","value":14.4},{"label":"Вторник","value":14.3},{"label":"Среда","value":13.0},{"label":"Четверг","value":13.7},{"label":"Пятница","value":16.4},{"label":"Суббота","value":13.2},{"label":"Воскресенье","value":15.0}];
    dataset_rost = [{"label":"Понедельник","value":13.0},{"label":"Вторник","value":12.9},{"label":"Среда","value":13.3},{"label":"Четверг","value":13.2},{"label":"Пятница","value":16.7},{"label":"Суббота","value":14.9},{"label":"Воскресенье","value":15.9}];



    d3.selectAll("input").on("change", selectDataset);

    function selectDataset()
    {
        var value = this.value;
        if (value == "Всего")
        {
            change(datasetTotal);
        }
        else if (value == "Москва")
        {
            change(dataset_msk);
        }
        else if (value == "Санкт-Петербург")
        {
            change(dataset_spb);
        }
        else if (value == "Новосибирск")
        {
            change(dataset_nsib);
        }
         else if (value == "Екатеринбург")
        {
            change(dataset_ekb);
        }
        else if (value == "Нижний Новгород")
        {
            change(dataset_nnov);
        }
        else if (value == "Казань")
        {
            change(dataset_kaz);
        }
        else if (value == "Челябинск")
        {
            change(dataset_chb);
        }
         else if (value == "Омск")
        {
            change(dataset_omsk);
        }
        else if (value == "Самара")
        {
            change(dataset_sam);
        }
        else if (value == "Ростов-на-Дону")
        {
            change(dataset_rost);
        }
    }

   var margin4 = {top: 40, right: 40, bottom: 60, left: 120},
    width4 = 450,
    height4 = 300;


     var div = d3.select("#area1").append("div").attr("class", "toolTip");

    var formatPercent = d3.format("");

    var y4 = d3.scale.ordinal()
            .rangeRoundBands([height4, 0], .2, 0.5);

    var x4 = d3.scale.linear()
            .range([0, width4]);

    var xAxis = d3.svg.axis()
            .scale(x4)
            .tickSize(-height4)
            .orient("bottom");

    var yAxis = d3.svg.axis()
            .scale(y4)
            .orient("left");
    //.tickFormat(formatPercent);

    var svg4 = d3.select("#area1").append("svg")
            .attr("width", width4 + margin4.left + margin4.right)
            .attr("height", height4 + margin4.top + margin4.bottom)
            .append("g")
            .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

    svg4.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height4 + ")")
            .call(xAxis);

    d3.select("input[value=\"Total\"]").property("checked", true);
    change(datasetTotal);

    function change(dataset) {

        y4.domain(dataset.map(function(d) { return d.label; }));
        x4.domain([0, d3.max(dataset, function(d) { return d.value; })]);

        svg4.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height4 + ")")
                .call(xAxis);

        svg4.select(".y.axis").remove();
        svg4.select(".x.axis").remove();

        svg4.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(90)")
                .attr("x", 50)
                .attr("dx", ".1em")
                .style("text-anchor", "end")


        var bar = svg4.selectAll(".bar")
                .data(dataset, function(d) { return d.label; });
        // new data:
        bar.enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x4(d.value); })
                .attr("y", function(d) { return y4(d.label); })
                .attr("width", function(d) { return width4-x4(d.value); })
                .attr("height", y4.rangeBand());

        bar
                .on("mousemove", function(d){
                    div.style("left", d3.event.pageX+10+"px");
                    div.style("top", d3.event.pageY-25+"px");
                    div.style("display", "inline-block");
                    div.html((d.label)+"<br>"+(d.value)+"%");
                });
        bar
                .on("mouseout", function(d){
                    div.style("display", "none");
                });


        // removed data:
        bar.exit().remove();

        // updated data:
        bar.transition()
                .duration(750)
                .attr("x", function(d) { return 0; })
                .attr("y", function(d) { return y4(d.label); })
                .attr("width", function(d) { return x4(d.value); })
                .attr("height", y4.rangeBand());

    };