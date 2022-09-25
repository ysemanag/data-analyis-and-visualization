

var csv_data,con_data,js_data, male_count = 0, female_count = 0;

function get_data(){
	con_data = [];
	fmale_male_data = [];
	var sex;
	console.log('Hello World!');
		$.ajax({
		url : 'http://127.0.0.1:5000/home',
		method: 'GET',
		type: 'json',
		data: {},
		success: function (response) {
			// console.log(response);
			csv_data = JSON.parse(response);
			sex = csv_data.Sex;
			// male_count = 0;
			// female_count = 0;
			for (const item in sex) {
				if(sex[item] === 'male'){
					male_count = male_count + 1;
				}
}

for (const item in sex) {
	if(sex[item] === 'female'){
		female_count = female_count + 1;
	}

}
console.log(male_count);
console.log(female_count);

	con_data.push({'sex':'male','count':male_count});
	con_data.push({'sex':'female','count':female_count})
	//render(con_data);

  // anychart.onDocumentReady(function(){
  //   var data = [
  //     {x: "Male", value: male_count},
  //     {x: "Female", value: female_count}
  //   ];
  //
  //   var chart = anychart.pie();
  //
  //   chart.title("Titanic data population by gender");
  //   chart.data(data);
  //   chart.container('container');
  //   chart.draw();
  // });

  d3.select('svg').html('');
	svg = d3.select('svg');
	height = +svg.attr('height');
	width = +svg.attr('width');
  radius = 200;
	//innerwidth = width - margin.left - margin.right;
	//innerheight = height - margin.top - margin.bottom;

    var data = [
      {name: "Male", value: male_count},
      {name: "Female", value: female_count}
    ];

  var g = svg.append("g")
             .attr("transform", "translate("+ width / 2 + "," + height / 2 + ")");

  var ordScale = d3.scaleOrdinal()
                   .domain(data)
                   .range(['#ffd384', '#94ebcd']);
  var pie = d3.pie().value(function(d){
      return d.value;
  });

  var arc = g.selectAll("arc")
             .data(pie(data))
             .enter();
  var path = d3.arc()
               .outerRadius(radius)
               .innerRadius(0);
  arc.append("path")
     .attr("d", path)
     .attr("fill", function(d) {return ordScale(d.data.name); });
  var label = d3.arc()
                .outerRadius(radius)
                .innerRadius(0);
  arc.append("text")
     .attr("transform", function(d) {
       return "translate(" + label.centroid(d) +")";
     })
     .text(function(d) { return d.data.name; })
     .style("font-family", "arial")
     style("font-size", 15);


 console.log(con_data);
		},
		error: function (error) {
			console.log(error);
		}
	});
}



// var js_data;
// function reload(){
//
// 	get_data();
// }

$(document).ready(function(){
	get_data();
});
