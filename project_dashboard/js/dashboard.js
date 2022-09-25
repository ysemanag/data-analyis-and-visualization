var survived_count = 0, dead_count = 0, male_count = 0, female_count = 0;
var survived_class1 = 0, survived_class2 = 0, survived_class3 = 0;
var dead_class1 = 0, dead_class2 = 0, dead_class3 = 0;
var all_data;
//var heatMapData;
var age_values = [], age_index = [], age_array = [];
var pclass_values = [], sibsp_values = [], fare_values = [];

function get_data(){
	var status;
	console.log('Hello World!');
		$.ajax({
		url : 'http://127.0.0.1:5000/home',
		method: 'GET',
		type: 'json',
		data: {},
		success: function (response) {

			//printing survived vs dead \
			csv_data = JSON.parse(response);
			all_data = response;
			// console.log(all_data);

			status = csv_data.Survived;
      sex = csv_data.Sex;
			pclass = csv_data.Pclass;
			age = csv_data.Age;
			sibsp = csv_data.SibSp;
			fare = csv_data.Fare;

      //console.log(age);
      age_values = Object.values(age);
			age_index = Object.keys(age);

			pclass_values = Object.values(pclass);
			sibsp_values = Object.values(sibsp);
			fare_values = Object.values(fare);

			// age_array = age_index.map(function(index, val){
			// 	return [index, age_values[val]];
			// });

			// console.log(pclass_values);
			// console.log(sibsp_values);
      //  console.log( age_values);
			// console.log( age_index);

      //Getting survived and perished counts
			for (const item in status) {
				if(status[item] === 1){
					survived_count = survived_count + 1;
					//Getting survived count by class
					cl = pclass[item];
					if (cl === 1){
						survived_class1 = survived_class1 + 1;
					}
					else if (cl === 2){
						survived_class2 = survived_class2 + 1;
					}
					else if (cl === 3){
						survived_class3 = survived_class3 + 1;
					}
				}
				else if(status[item] === 0){
							dead_count = dead_count + 1;
							//Getting perished count by class
							cl = pclass[item];
							if (cl === 1){
								dead_class1 = dead_class1 + 1;
							}
							else if (cl === 2){
								dead_class2 = dead_class2 + 1;
							}
							else if (cl === 3){
								dead_class3 = dead_class3 + 1;
							}
				}
		}

    //Getting male and female counts
		for (const item in sex) {
			if(sex[item] === 'male'){
				male_count = male_count + 1;
			}

			else if(sex[item] === 'female'){
				female_count = female_count + 1;
			}

	 //  for (const item in status) {
		// 	if(status[item] === 0){
		// 	dead_count = dead_count + 1;
	 // }
   }
   generate_graphs();

		},
		error: function (error) {
			console.log(error);
		}

	});
}


$(document).ready(function(){
	 get_data();
});

function generate_graphs() {
	'use strict';
	$(function() {

    /*Creating the box plot*/
		// window.onload = function () {
		var a_val, p_val;
		var age_values1 = [], age_values2 = [], age_values3 = [];
		var index1 = 0, index2 = 0, index3 = 0;

		for (var i=0; i<age_values.length;i++){
			p_val = pclass_values[i];
			a_val = age_values[i];

			if (p_val === 1 && a_val !== null){
				age_values1[index1] = a_val;
				index1 = index1 + 1;
			}
			else if (p_val === 2 && a_val !== null){
				age_values2[index2] = a_val;
				index2 = index2 + 1;
			}
			else if (p_val === 3 && a_val !== null){
				age_values3[index3] = a_val;
				index3 = index3 + 1;
			}
		}
		var boxPlotData = [
			{x: pclass_values, y: age_values}
		];

     age_values1 = age_values1.slice(0,5);
		 age_values2 = age_values2.slice(0,5);
		 age_values3 = age_values3.slice(0,5);
		 //age_values3.slice(,173);
		// for (var i = 0; i <= age_values.length; i++){
		// 		boxPlotData.push({x: pclass_values[i], y: age_values[i]});
		//  }

		 // var age_arr = {
		 //  y: age_values,
		 //  type: 'box'
		 // };
		 //
		 // var pclass_arr = {
		 //  y: pclass_values,
		 //  type: 'box'
		 // };
		 //
		 // var boxPlotData = [age_arr, pclass_arr];



		//window.onload = function () {
		var t1 = [4, 5, 8, 9, 7], t2 = [5, 6, 7, 8, 6.5], t3 = [6, 8, 10, 11, 9.5];
		//console.log(age_values1, age_values2, age_values3);
		//console.log(t1,t2,t3);

			var box_chart = new CanvasJS.Chart("boxPlotChart", {
				title: {
					text: "Box Plot for Pclass vs Age"
				},
				axisX: {
					title: "Pclass"
				},
				axisY: {
					title: "Age"
				},
				data: [
				{
					type: "boxAndWhisker",
					dataPoints: [
					{ label: "1", y: age_values1 }, 
					{ label: "2", y: age_values2 },
					{ label: "3", y: age_values3 }
					]
				}
				]
			});
			box_chart.render();
    //}

		 /*Scatter Plot for age vs fare*/
			// Define Data
			var scatterPlotData = [{
			  x: age_values,
			  y: fare_values,
			  mode:"markers"
			}];

			// Define Layout
			var layout = {
			  xaxis: {range: [0, 100], title: "Age"},
			  yaxis: {range: [0, 600], title: "Fare"},
			  title: "Age vs. Fare"
			};

			// Display with Plotly
			Plotly.newPlot("scatterPlot", scatterPlotData, layout);

		// var boxplot_chart = new CanvasJS.Chart("boxPlotChart", {
		// 	animationEnabled: true,
		// 	title:{
		// 		text: "Box Plot for Pclass vs Age"
		// 	},
		// 	axisX: {
		// 		//valueFormatString: "DDD"
		// 		title: "Pclass"
		// 	},
		// 	axisY: {
		// 		title: "Age",
		// 		includeZero: true
		// 	},
		// 	data: [{
		// 		type: "boxAndWhisker",
		// 		//xValueFormatString: "DDDD",
		// 		//yValueFormatString: "#0.0 Hours",
		// 		dataPoints: [
		// 			{ label: "1", y: age_values1},
	  //       { label: "2", y: age_values2 },
		// 			{ label: "3", y: age_values3 }
		// 		 ]
		// 		// 	{ x: new Date(2017, 6, 3),  y: [4, 6, 8, 9, 7] },
		// 		// 	{ x: new Date(2017, 6, 4),  y: [5, 6, 7, 8, 6.5] },
		// 		// 	{ x: new Date(2017, 6, 5),  y: [4, 5, 7, 8, 6.5] },
		// 		// 	{ x: new Date(2017, 6, 6),  y: [3, 5, 6, 9, 5.5] },
		// 		// 	{ x: new Date(2017, 6, 7),  y: [6, 8, 10, 11, 8.5] },
		// 		// 	{ x: new Date(2017, 6, 8),  y: [5, 7, 9, 12, 7.5] },
		// 		// 	{ x: new Date(2017, 6, 9),  y: [4, 6, 8, 9, 7] }
		// 		//]
		// 	}]
		// });
		// //boxplot_chart.options.data[0].dataPoints = boxPlotData;
		// boxplot_chart.render();
		// //Plotly.newPlot('boxPlot', data);

// }

		// // var y0 = [];
		// // var y1 = [];
		// // for (var i = 0; i < age_values.length; i ++) {
		// //  y0[i] = age;
		// //  y1[i] = Math.random() + 1;
		// // }
		//
		// var trace1 = {
		//  y: age_values,
		//  type: 'box'
		// };
		//
		// var trace2 = {
		//  y: pclass_values,
		//  type: 'box'
		// };
		//
		// var data = [trace1, trace2];
		//
		// Plotly.newPlot('boxPlot', data);


		/* generating visualization of missing data using seaborn */
		//create the data
		var heatMapData = [];
		for (var i = 0; i <= age_values.length; i++){
				heatMapData.push({x: sibsp_values[i], y: pclass_values[i], heat: age_values[i]});
     }

		// create the chart and set the data
		var heatMapChart = anychart.heatMap(heatMapData);
		var legend = heatMapChart.legend();
    legend.enabled(true);

		// set the chart title
		heatMapChart.title("Age missing data visualization by Pclass and SibSp");

		// create and configure the color scale.
		var customColorScale = anychart.scales.ordinalColor();
		customColorScale.ranges([
		  { less: 20 },
			{ equals: NaN },
		  { from: 20, to: 40 },
		  { from: 40, to: 60 },
		  { greater: 60}
		]);

		//customColorScale.colors(["#ACE8D4", "#00726A"]);
		customColorScale.colors(["#CF7A78", "#0000FF", "#E69645", "#69A231", "#4D7623"]);

		// set the color scale as the color scale of the chart
		heatMapChart.colorScale(customColorScale);

		// set the container id
		heatMapChart.container("heatMapContainer");

		// initiate drawing the chart
		heatMapChart.draw();


    /*Creating a linechart of the age of the titanic population*/

		var dps = [];
		var max = Math.max(...age_values);
		var min = Math.min(...age_values);
		console.log(max,min);

    for (var i = 0; i <= age_values.length; i++)
		  if (age_values[i] === max){
				dps.push({y: age_values[i], indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle"});
			}
			else if (age_values[i] === min){
				dps.push({y: age_values[i], indexLabel: "\u2193 lowest",markerColor: "DarkSlateGrey", markerType: "cross"});
			}
			else {
				dps.push({y: age_values[i]});
			}

		var line_chart = new CanvasJS.Chart("ageFareLineChart", {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Simple Line Chart"
			},
			data: [{
				type: "line",
		      	indexLabelFontSize: 16,
			}]
		});
		line_chart.options.data[0].dataPoints = dps;
		line_chart.render();



		var deadOrSurviveddata = {
			labels: ["Survived", "Dead"],
			datasets: [{
			label: 'Best Sellers',
			data: [survived_count, dead_count],
			backgroundColor: [
						'#8169f2',
						'#6a4df5',
						// '#4f2def',
						// '#2b0bc5',
						// '#180183',
				],
				borderColor: [
						'#8169f2',
						'#6a4df5',
						// '#4f2def',
						// '#2b0bc5',
						// '#180183',
				],
				borderWidth: 2,
				fill: false
			}],
		};
		var deadOrSurvivedOptions = {
			scales: {
				xAxes: [{
					position: 'bottom',
					display: false,
					gridLines: {
							display: false,
							drawBorder: true,
					},
					ticks: {
							display: false ,//this will remove only the label
							beginAtZero: true
					}
				}],
				yAxes: [{
					display: true,
					gridLines: {
						drawBorder: true,
						display: false,
					},
					ticks: {
						beginAtZero: true
					},
				}]
			},
			legend: {
				display: false
			},
			tooltips: {
				show: false,
				backgroundColor: 'rgba(31, 59, 179, 1)',
			},
			plugins: {
			datalabels: {
					display: true,
					align: 'start',
					color: 'white',
				}
			}

		};
		if ($("#deadOrSurvived").length) {
			var barChartCanvas = $("#deadOrSurvived").get(0).getContext("2d");
			// This will get the first returned node in the jQuery collection.
			var barChart = new Chart(barChartCanvas, {
				type: 'horizontalBar',
				data: deadOrSurviveddata,
				options: deadOrSurvivedOptions,

			});
		}

		var genderPieChartData = {
			datasets: [{
				data: [female_count, male_count], //change data to mal and female
				backgroundColor: [
					'#ee5b5b',
					// '#fcd53b',
					// '#0bdbb8',
					// '#464dee',
					'#0ad7f7'
				],
				borderColor: [
					'#ee5b5b',
					// '#fcd53b',
					// '#0bdbb8',
					// '#464dee',
					'#0ad7f7'
				],
			}],
			// These labels appear in the legend and in the tooltips when hovering different arcs
			labels: [
				'Male',
				// 'Books',
				// 'Software',
				// 'Toys',
				'Female'
			]
		};
		var genderPieChartOptions = {
			responsive: true,
			cutoutPercentage: 80,
			legend: {
					display: false,
			},
			animation: {
					animateScale: true,
					animateRotate: true
			},
			plugins: {
				datalabels: {
					 display: false,
					 align: 'center',
					 anchor: 'center'
				}
			}

		};
		if ($("#genderPieChart").length) {
			var pieChartCanvas = $("#genderPieChart").get(0).getContext("2d");
			var pieChart = new Chart(pieChartCanvas, {
				type: 'doughnut',
				data: genderPieChartData,
				options: genderPieChartOptions
			});
		}

		var barChartStackedData = {
			datasets: [{
				label: 'Instagram (40%)',
				data: [60],
				backgroundColor: [
					'#ee5b5b'

				],
				borderColor: [
					'#ee5b5b'
				],
				borderWidth: 1,
				fill: false
			},
			{
				label: 'Facebook',
				data: [25],

				backgroundColor: [
					'#fcd53b'
				],
				borderColor: [
					'#fcd53b',

				],
				borderWidth: 1,
				fill: false
			},
			{
				label: 'Website',
				data: [10],

				backgroundColor: [
					'#0bdbb8'
				],
				borderColor: [
					'#0bdbb8',

				],
				borderWidth: 1,
				fill: false
			},
			{
				label: 'Youtube',
				data: [15],

				backgroundColor: [
					'#444bee'
				],
				borderColor: [
						"#444bee",

				],
				borderWidth: 1,
				fill: false
			}]
		};
		var barChartStackedOptions = {
			scales: {
				xAxes: [{
					display: false,
					stacked: true,
					gridLines: {
							display: false //this will remove only the label
					},
				}],
				yAxes: [{
					stacked: true,
					display: false,
				}]
			},
			legend: {
				display: false,
				position: "bottom"
			},
			elements: {
				point: {
						radius: 0
				},
				plugins: {
					datalabels: {
						display: false,
						align: 'center',
						anchor: 'center'
					}
				}

		}
		};
		if ($("#barChartStacked").length) {
			var barChartCanvas = $("#barChartStacked").get(0).getContext("2d");
			// This will get the first returned node in the jQuery collection.
			var barChart = new Chart(barChartCanvas, {
				type: 'horizontalBar',
				data: barChartStackedData,
				options: barChartStackedOptions
			});
		}

		var revenueChartData = {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "No", "Dec"],
			datasets: [{
				label: 'Margin',
				data: [45, 45, 70, 70, 50, 50, 70, 60, 65, 60, 55, 55],
				backgroundColor: [
						'#0ddbb9',
				],
				borderColor: [
						'#0ddbb9'
				],
				borderWidth: 2,
				fill: false,
			},
			{
				label: 'Product',
				borderDash: [3, 4],
				data: [35, 35, 60, 60, 40, 40, 60, 50, 55, 50, 45, 45],
				borderColor: [
						'#464dee',
				],
				borderWidth: 2,
				fill: false,
				pointBorderWidth: 4,
			},
			{
				label: 'Cost',
				data: [25, 25, 50, 50, 30, 30, 50, 40, 45, 40, 35, 35],
				borderColor: [
						'#ee5b5b',
				],
				borderWidth: 2,
				fill: false,
				pointBorderWidth: 4,
			}],
		};
		var revenueChartOptions = {
			scales: {
					yAxes: [{
						display: true,
						gridLines: {
							drawBorder: false,
							display: false,
						},
					}],
					xAxes: [{
						position: 'bottom',
						gridLines: {
							drawBorder: false,
							display: false,
						},
						ticks: {
							beginAtZero: true,
							stepSize: 30
						}
					}],

			},
			legend: {
					display: false,
			},
			legendCallback: function(chart) {
				var text = [];
				text.push('<ul class="' + chart.id + '-legend">');
				for (var i = 0; i < chart.data.datasets.length; i++) {
					text.push('<li><span class="legend-box" style="background:' + chart.data.datasets[i].borderColor + ';"></span><span class="legend-label" style="">');
					if (chart.data.datasets[i].label) {
							text.push(chart.data.datasets[i].label);
					}
					text.push('</span></li>');
				}
				text.push('</ul>');
				return text.join("");
			},
			elements: {
				point: {
					radius: 0
				},
				line: {
					tension: 0
				}
			},
			tooltips: {
				backgroundColor: 'rgba(2, 171, 254, 1)',
			},
			plugins: {
				datalabels: {
					display: false,
					align: 'center',
					anchor: 'center'
				}
			}

		};
		if ($("#revenue-for-last-month-chart").length) {
			var lineChartCanvas = $("#revenue-for-last-month-chart").get(0).getContext("2d");
			var saleschart = new Chart(lineChartCanvas, {
				type: 'line',
				data: revenueChartData,
				options: revenueChartOptions
			});
			document.getElementById('revenuechart-legend').innerHTML = saleschart.generateLegend();
		}

		var serveLoadingData = {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "No", "Dec"],
			datasets: [{
				label: 'Margin',
				data: [45, 45, 70, 70, 50, 50, 70, 60, 65, 60, 55, 55],
				backgroundColor: [
						'#0ddbb9',
				],
				borderColor: [
						'#0ddbb9'
				],
				borderWidth: 2,
				fill: false,
			},
			{
				label: 'Product',
				borderDash: [3, 4],
				data: [35, 35, 60, 60, 40, 40, 60, 50, 55, 50, 45, 45],
				borderColor: [
						'#464dee',
				],
				borderWidth: 2,
				fill: false,
				pointBorderWidth: 4,
			},
			{
				label: 'Cost',
				data: [25, 25, 50, 50, 30, 30, 50, 40, 45, 40, 35, 35],
				borderColor: [
						'#ee5b5b',
				],
				borderWidth: 2,
				fill: false,
				pointBorderWidth: 4,
			}],
		};
		var serveLoadingOptions = {
			scales: {
				yAxes: [{
					display: true,
					gridLines: {
						drawBorder: false,
						display: false,
					},
				}],
				xAxes: [{
					position: 'bottom',
					gridLines: {
						drawBorder: false,
						display: false,
					},
					ticks: {
						beginAtZero: false,
						stepSize: 200
					}
				}],

			},
			legend: {
				display: false,
			},
			legendCallback: function(chart) {
				var text = [];
				text.push('<ul class="' + chart.id + '-legend">');
				for (var i = 0; i < chart.data.datasets.length; i++) {
					text.push('<li><span class="legend-box" style="background:' + chart.data.datasets[i].borderColor + ';"></span><span class="legend-label" style="">');
					if (chart.data.datasets[i].label) {
							text.push(chart.data.datasets[i].label);
					}
					text.push('</span></li>');
				}
				text.push('</ul>');
				return text.join("");
			},
			elements: {
				point: {
					radius: 0
				},
				line: {
					tension: 0
				}
			},
			tooltips: {
				backgroundColor: 'rgba(2, 171, 254, 1)',
			},
			plugins: {
				datalabels: {
					display: false,
					align: 'center',
					anchor: 'center'
				}
			}

		};
		if ($("#serveLoading").length) {
			var lineChartCanvas = $("#serveLoading").get(0).getContext("2d");
			var saleschart = new Chart(lineChartCanvas, {
				type: 'line',
				data: serveLoadingData,
				options: serveLoadingOptions
			});
			document.getElementById('serveLoading-legend').innerHTML = saleschart.generateLegend();
		}
		var dataManagedData = {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "No", "Dec"],
			datasets: [{
						label: 'Margin',
						data: [45, 45, 70, 70, 50, 50, 70, 60, 65, 60, 55, 55],
						backgroundColor: [
							'#0ddbb9',
						],
						borderColor: [
							'#0ddbb9'
						],
						borderWidth: 2,
						fill: false,
					},
					{
						label: 'Product',
						borderDash: [3, 4],
						data: [35, 35, 60, 60, 40, 40, 60, 50, 55, 50, 45, 45],
						borderColor: [
								'#464dee',
						],
						borderWidth: 2,
						fill: false,
						pointBorderWidth: 4,
					},
					{
						label: 'Cost',
						data: [25, 25, 50, 50, 30, 30, 50, 40, 45, 40, 35, 35],
						borderColor: [
								'#ee5b5b',
						],
						borderWidth: 2,
						fill: false,
						pointBorderWidth: 4,
					}
			],
		};
		var dataManagedOptions = {
			scales: {
				yAxes: [{
					display: true,
					gridLines: {
						drawBorder: false,
						display: false,
					},
				}],
				xAxes: [{
					position: 'bottom',
					gridLines: {
						drawBorder: false,
						display: false,
					},
					ticks: {
						beginAtZero: false,
						stepSize: 200
					}
				}],
			},
			legend: {
				display: false,
			},
			legendCallback: function(chart) {
				var text = [];
				text.push('<ul class="' + chart.id + '-legend">');
				for (var i = 0; i < chart.data.datasets.length; i++) {
					text.push('<li><span class="legend-box" style="background:' + chart.data.datasets[i].borderColor + ';"></span><span class="legend-label" style="">');
					if (chart.data.datasets[i].label) {
							text.push(chart.data.datasets[i].label);
					}
					text.push('</span></li>');
				}
				text.push('</ul>');
				return text.join("");
			},
			elements: {
				point: {
					radius: 0
				},
				line: {
					tension: 0
				}
			},
			tooltips: {
				backgroundColor: 'rgba(2, 171, 254, 1)',
			},
			plugins: {
				datalabels: {
					display: false,
					align: 'center',
					anchor: 'center'
				}
			}
		};
		if ($("#dataManaged").length) {
			var lineChartCanvas = $("#dataManaged").get(0).getContext("2d");
			var saleschart = new Chart(lineChartCanvas, {
				type: 'line',
				data: dataManagedData,
				options: serveLoadingOptions
			});
			document.getElementById('dataManaged-legend').innerHTML = saleschart.generateLegend();
		}
		var salesTraficData = {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "No", "Dec"],
			datasets: [{
				label: 'Margin',
				data: [45, 45, 70, 70, 50, 50, 70, 60, 65, 60, 55, 55],
				backgroundColor: [
						'#0ddbb9',
				],
				borderColor: [
						'#0ddbb9'
				],
				borderWidth: 2,
				fill: false,
				},
				{
				label: 'Product',
				borderDash: [3, 4],
				data: [35, 35, 60, 60, 40, 40, 60, 50, 55, 50, 45, 45],
				borderColor: [
						'#464dee',
				],
				borderWidth: 2,
				fill: false,
				pointBorderWidth: 4,
				},
				{
				label: 'Cost',
				data: [25, 25, 50, 50, 30, 30, 50, 40, 45, 40, 35, 35],
				borderColor: [
						'#ee5b5b',
				],
				borderWidth: 2,
				fill: false,
				pointBorderWidth: 4,
				}
			],
		};
		var salesTraficOptions = {
			scales: {
				yAxes: [{
					display: true,
					gridLines: {
						drawBorder: false,
						display: false,
					},
				}],
				xAxes: [{
					position: 'bottom',
					gridLines: {
						drawBorder: false,
						display: false,
					},
					ticks: {
						beginAtZero: false,
						stepSize: 200
					}
				}],

			},
			legend: {
				display: false,
			},
			legendCallback: function(chart) {
				var text = [];
				text.push('<ul class="' + chart.id + '-legend">');
				for (var i = 0; i < chart.data.datasets.length; i++) {
					text.push('<li><span class="legend-box" style="background:' + chart.data.datasets[i].borderColor + ';"></span><span class="legend-label" style="">');
					if (chart.data.datasets[i].label) {
							text.push(chart.data.datasets[i].label);
					}
					text.push('</span></li>');
				}
				text.push('</ul>');
				return text.join("");
			},
			elements: {
					point: {
						radius: 0
					},
					line: {
						tension: 0
					}
			},
			tooltips: {
					backgroundColor: 'rgba(2, 171, 254, 1)',
			},
			plugins: {
				datalabels: {
					display: false,
					align: 'center',
					anchor: 'center'
				}
			}

		};
		if ($("#salesTrafic").length) {
			var lineChartCanvas = $("#salesTrafic").get(0).getContext("2d");
			var saleschart = new Chart(lineChartCanvas, {
				type: 'line',
				data: salesTraficData,
				options: salesTraficOptions
			});
			document.getElementById('salesTrafic-legend').innerHTML = saleschart.generateLegend();
		}

		var visitorsTodayData = {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
			datasets: [
				{
				label: 'Cost',
				data: [15, 25, 20, 18, 24, 20, 16, 20],
				backgroundColor: [
						'rgba(238, 91, 91, .9)',
				],
				borderColor: [
						'#ee5b5b',
				],
				borderWidth: 2,
				fill: true,
				pointBorderWidth: 4,
				},
				{
				label: 'Product',
				data: [20, 30, 25, 23, 29, 25, 21, 25],
				backgroundColor: [
						'rgba(70, 77, 238, 1)',
				],
				borderColor: [
						'#464dee',
				],
				borderWidth: 2,
				fill: true,
				pointBorderWidth: 4,
				},
				{
				label: 'Margin',
				data: [25, 35, 30, 28, 33, 30, 26, 30],
				backgroundColor: [
						'rgba(81, 225, 195, .9)',
				],
				borderColor: [
						'#51e1c3'
				],
				borderWidth: 2,
				fill: true,
				},
			],
		};
		var visitorsTodayOptions = {
			scales: {
				yAxes: [{
					display: false,
					gridLines: {
						drawBorder: false,
						display: false,
					},
				}],
				xAxes: [{
					position: 'bottom',
					display: true,
					gridLines: {
						drawBorder: false,
						display: true,
						color: "#f2f2f2",
						borderDash: [8, 4],
					},
					ticks: {
						beginAtZero: false,
						stepSize: 200
					}
				}],
			},
			legend: {
				display: false,
			},
			elements: {
					point: {
						radius: 0
					},
			},
			plugins: {
				datalabels: {
					display: false,
					align: 'center',
					anchor: 'center'
				}
			}
		};
		if ($("#visitorsToday").length) {
			var lineChartCanvas = $("#visitorsToday").get(0).getContext("2d");
			var saleschart = new Chart(lineChartCanvas, {
				type: 'line',
				data: visitorsTodayData,
				options: visitorsTodayOptions
			});
		}
		if ($('#circleProgress1').length) {
			var bar = new ProgressBar.Circle(circleProgress1, {
				color: '#0aadfe',
				strokeWidth: 10,
				trailWidth: 10,
				easing: 'easeInOut',
				duration: 1400,
				width: 42,
			});
			bar.animate(.18); // Number from 0.0 to 1.0
		}
		if ($('#circleProgress2').length) {
			var bar = new ProgressBar.Circle(circleProgress2, {
				color: '#fa424a',
				strokeWidth: 10,
				trailWidth: 10,
				easing: 'easeInOut',
				duration: 1400,
				width: 42,

			});
			bar.animate(.36); // Number from 0.0 to 1.0
		}
		var newClientData = {
			labels: ["Jan", "Feb", "Mar", "Apr", "May"],
			datasets: [{
				label: 'Margin',
				data: [35, 37, 34, 36, 32],
				backgroundColor: [
						'#f7f7f7',
				],
				borderColor: [
						'#dcdcdc'
				],
				borderWidth: 2,
				fill: true,
			},],
		};
		var newClientOptions = {
			scales: {
				yAxes: [{
					display: false,
				}],
				xAxes: [{
					display: false,
				}],
			},
			legend: {
				display: false,
			},
			elements: {
				point: {
					radius: 0
				},
			},
			plugins: {
				datalabels: {
					display: false,
					align: 'center',
					anchor: 'center'
				}
			}
		};
		if ($("#newClient").length) {
			var lineChartCanvas = $("#newClient").get(0).getContext("2d");
			var saleschart = new Chart(lineChartCanvas, {
				type: 'line',
				data: newClientData,
				options: newClientOptions
			});
		}
		var allProductsData = {
			labels: ["Jan", "Feb", "Mar", "Apr", "May"],
			datasets: [{
				label: 'Margin',
				data: [37, 36, 37, 35, 36],
				backgroundColor: [
						'#f7f7f7',
				],
				borderColor: [
						'#dcdcdc'
				],
				borderWidth: 2,
				fill: true,
			}, ],
		};
		var allProductsOptions = {
			scales: {
				yAxes: [{
					display: false,
				}],
				xAxes: [{
					display: false,
				}],
			},
			legend: {
				display: false,
			},
			elements: {
				point: {
					radius: 0
				},
			},
			plugins: {
				datalabels: {
					display: false,
					align: 'center',
					anchor: 'center'
				}
			}

		};
		if ($("#allProducts").length) {
			var lineChartCanvas = $("#allProducts").get(0).getContext("2d");
			var saleschart = new Chart(lineChartCanvas, {
				type: 'line',
				data: allProductsData,
				options: allProductsOptions
			});
		}
		var invoicesData = {
			labels: ["Jan", "Feb", "Mar", "Apr", "May"],
			datasets: [{
				label: 'Margin',
				data: [35, 37, 34, 36, 32],
				backgroundColor: [
						'#f7f7f7',
				],
				borderColor: [
						'#dcdcdc'
				],
				borderWidth: 2,
				fill: true,
			}, ],
		};
		var invoicesOptions = {
			scales: {
				yAxes: [{
					display: false,
				}],
				xAxes: [{
					display: false,
				}],
			},
			legend: {
				display: false,
			},
			elements: {
					point: {
						radius: 0
					},
			},
			plugins: {
				datalabels: {
					display: false,
					align: 'center',
					anchor: 'center'
				}
			}

		};
		if ($("#invoices").length) {
			var lineChartCanvas = $("#invoices").get(0).getContext("2d");
			var saleschart = new Chart(lineChartCanvas, {
				type: 'line',
				data: invoicesData,
				options: invoicesOptions
			});
		}
		var projectsData = {
			labels: ["Jan", "Feb", "Mar", "Apr", "May"],
			datasets: [{
				label: 'Margin',
				data: [38, 39, 37, 40, 36],
					backgroundColor: [
							'#f7f7f7',
					],
				borderColor: [
						'#dcdcdc'
				],
				borderWidth: 2,
				fill: true,
			}, ],
		};
		var projectsOptions = {
			scales: {
				yAxes: [{
					display: false,
				}],
				xAxes: [{
					display: false,
				}],
			},
			legend: {
				display: false,
			},
			elements: {
				point: {
					radius: 0
				},
			},
			plugins: {
				datalabels: {
					display: false,
					align: 'center',
					anchor: 'center'
				}
			}
		};
		if ($("#projects").length) {
			var lineChartCanvas = $("#projects").get(0).getContext("2d");
			var saleschart = new Chart(lineChartCanvas, {
				type: 'line',
				data: projectsData,
				options: projectsOptions
			});
		}
		var orderRecievedData = {
			labels: ["Jan", "Feb", "Mar", "Apr", "May"],
			datasets: [{
				label: 'Margin',
				data: [35, 37, 34, 36, 32],
				backgroundColor: [
						'#f7f7f7',
				],
				borderColor: [
						'#dcdcdc'
				],
				borderWidth: 2,
				fill: true,
			}, ],
		};
		var orderRecievedOptions = {
			scales: {
				yAxes: [{
					display: false,
				}],
				xAxes: [{
					display: false,
				}],
			},
			legend: {
				display: false,
			},
			elements: {
				point: {
					radius: 0
				},
			},
			plugins: {
				datalabels: {
					display: false,
					align: 'center',
					anchor: 'center'
				}
			}

		};
		if ($("#orderRecieved").length) {
			var lineChartCanvas = $("#orderRecieved").get(0).getContext("2d");
			var saleschart = new Chart(lineChartCanvas, {
				type: 'line',
				data: orderRecievedData,
				options: orderRecievedOptions
			});
		}
		var transactionsData = {
			labels: ["Jan", "Feb", "Mar", "Apr", "May"],
			datasets: [{
				label: 'Margin',
				data: [38, 35, 36, 38, 34],
				backgroundColor: [
						'#f7f7f7',
				],
				borderColor: [
						'#dcdcdc'
				],
				borderWidth: 2,
				fill: true,
			}, ],
		};
		var transactionsOptions = {
			scales: {
				yAxes: [{
					display: false,
				}],
				xAxes: [{
					display: false,
				}],
			},
			legend: {
				display: false,
			},
			elements: {
				point: {
					radius: 0
				},
			},
			plugins: {
				datalabels: {
					display: false,
					align: 'center',
					anchor: 'center'
				}
			}
		};
		if ($("#transactions").length) {
			var lineChartCanvas = $("#transactions").get(0).getContext("2d");
			var saleschart = new Chart(lineChartCanvas, {
				type: 'line',
				data: transactionsData,
				options: transactionsOptions
			});
		}
		var survivedByClassData = {
			//labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ],
			labels: ["1st Class", "2nd Class", "3rd Class",],
			datasets: [{
				label: 'Survived',
				data: [survived_class1, survived_class2, survived_class3],
				backgroundColor: [
					'#4E944F', '#4E944F', '#4E944F',
				],
				borderColor: [
					'#464dee', '#464dee', '#464dee',
				],
				borderWidth: 1,
				fill: false
			},
			{
					label: 'Perished',
					data: [dead_class1, dead_class2, dead_class3],
					backgroundColor: [
						'#FF6363', '#FF6363', '#FF6363',
					],
					borderColor: [
						'#d8d8d8', '#d8d8d8', '#d8d8d8',
					],
					borderWidth: 1,
					fill: false
			}
			]
		};
		var survivedByClassOptions = {
			scales: {
				xAxes: [{
				stacked: true,
				barPercentage: 0.6,
				position: 'bottom',
				display: true,
				gridLines: {
					display: false,
					drawBorder: false,
				},
				ticks: {
					display: true, //this will remove only the label
					stepSize: 300,
				}
				}],
				yAxes: [{
					stacked: true,
					display: true,
					gridLines: {
						drawBorder: false,
						display: true,
						color: "#f0f3f6",
						borderDash: [8, 4],
					},

					ticks: {
						beginAtZero: true,
						callback: function(value, index, values) {
						return value;
						}
					},
				}]
			},
			legend: {
				display: false
			},
			legendCallback: function(chart) {
				var text = [];
				text.push('<ul class="' + chart.id + '-legend">');
				for (var i = 0; i < chart.data.datasets.length; i++) {
					text.push('<li><span class="legend-box" style="background:' + chart.data.datasets[i].backgroundColor[i] + ';"></span><span class="legend-label text-dark">');
					if (chart.data.datasets[i].label) {
							text.push(chart.data.datasets[i].label);
					}
					text.push('</span></li>');
				}
				text.push('</ul>');
				return text.join("");
			},
			tooltips: {
				backgroundColor: 'rgba(0, 0, 0, 1)',
			},
			plugins: {
				datalabels: {
					display: false,
					align: 'center',
					anchor: 'center'
				}
			},
			plugins: [ChartDataLabels], //plugin for prinitng data in the stacked bars of the barchart
			plugins: {
      // Change options for ALL labels of THIS CHART
      datalabels: {
        color: '#000000'
      }
     }
		};
		if ($("#survivedByClass").length) {
			var barChartCanvas = $("#survivedByClass").get(0).getContext("2d");
			// This will get the first returned node in the jQuery collection.
			var barChart = new Chart(barChartCanvas, {
				type: 'bar',
				data: survivedByClassData,
				options: survivedByClassOptions
			});
			document.getElementById('survived-byclass-legend').innerHTML = barChart.generateLegend();
		}
		var productorderGage = new JustGage({
			id: 'productorder-gage',
			value: 3245,
			min: 0,
			max: 5000,
			hideMinMax: true,
			symbol: 'K',
			label: 'You have done 57.6% more ordes today',
			valueFontColor: "#001737",
			labelFontColor: "#001737",
			gaugeWidthScale: 0.3,
			counter: true,
			relativeGaugeSize: true,
			gaugeColor: "#f0f0f0",
			levelColors: [ "#fcd53b" ]
		});
		$("#productorder-gage").append('<div class="product-order"><div class="icon-inside-circle"><i class="mdi mdi-basket"></i></div></div>');

		// Remove pro banner on close
    document.querySelector('#bannerClose').addEventListener('click',function() {
			$('#pro-banner').slideUp();
    });
	});
}

//)(jQuery);
