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

    /*Creating the box plot*/
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

	});
}

//)(jQuery);
