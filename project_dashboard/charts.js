
var csv_data,con_data,js_data;


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
			male_count = 0;
			female_count = 0;
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
	render(con_data);
 console.log(con_data);
		},
		error: function (error) {
			console.log(error);
		}
	});
}



var svg;
var height,width,yscale,innerheight,innerwidth;
var margin = {left:70,right:20,top:20,bottom:20};

render = data => {
	xscale = d3.scaleBand()
	.domain(data.map(d => d.sex))
	.range([0,innerwidth])
	.padding(.1);

	yscale = d3.scaleLinear()
		.domain([0,d3.max(data,d=>d.count)])
		.range([0,innerheight]);

	yscale2 = d3.scaleLinear()
		.domain([0,d3.max(data,d=>d.count)])
		.range([innerheight,0]);

	g = svg.append('g').attr('transform',`translate(${margin.left},${margin.top})`)

	var greccontainer = g.append('g')
	greccontainer.selectAll('rect').data(data)
	.enter()
	.append('rect')
	.attr('x',d => xscale(d.sex))
	.attr('y',d => innerheight-yscale(d.count))
	.attr('height',d => yscale(d.count))
	.attr('width',xscale.bandwidth());

	svg.append("text")
	    .attr("class", "x label")
	    .attr("text-anchor", "end")
	    .attr("y", 9)
		  .attr("x", margin.top-350)
	    .attr("transform", "rotate(-90)")
			.style('font-weight','bold')
	    .text("Number of People");;

	axiscontainer = g.append('g');
	axiscontainer.append('g').call(d3.axisLeft(yscale2));
	axiscontainer.append('g').attr('transform',`translate(${0},${innerheight})`).call(d3.axisBottom(xscale));

};

var js_data;
function reload(){
	d3.select('svg').html('');
	svg = d3.select('svg');
	height = +svg.attr('height');
	width = +svg.attr('width');
	innerwidth = width - margin.left - margin.right;
	innerheight = height - margin.top - margin.bottom;
	get_data();
}

$(document).ready(function(){
	reload();
});
