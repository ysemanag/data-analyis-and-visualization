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
  
	});
}

//)(jQuery);
