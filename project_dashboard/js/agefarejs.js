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

	});
}

//)(jQuery);
