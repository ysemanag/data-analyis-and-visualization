

var csv_data,con_data,js_data;
function get_data(){
	con_data = [];
	console.log('Hello World!');
		$.ajax({
		url : 'http://127.0.0.1:5000/home',
		method: 'GET',
		type: 'json',
		data: {},
		success: function (response) {
			console.log(response);
			csv_data = JSON.parse(response);
			// for(i = 0; i < Object.keys(csv_data.PassengerId).length; i++){
			// 	con_data.push({PassengerId:csv_data.PassengerId[i],Population:csv_data.Population[i]});
			// }

		},
		error: function (error) {
			console.log(error);
		}
	});
}
