console.log("Hello Sem");
var survived_count = 0, dead_count = 0, male_count = 0, female_count = 0;
var survived_class1 = 0, survived_class2 = 0, survived_class3 = 0;
var dead_class1 = 0, dead_class2 = 0, dead_class3 = 0;

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
			status = csv_data.Survived;
      sex = csv_data.Sex;
			pclass = csv_data.Pclass;

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

  console.log("Survived 1:" +survived_class1+ " 2: " +survived_class2+ " 3: " +survived_class3);
  console.log("Dead 1:" +dead_class1+ " 2: " +dead_class2+ " 3: " + dead_class3);
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
	
	});
}

//)(jQuery);
