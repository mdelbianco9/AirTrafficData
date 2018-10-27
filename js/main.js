



$.ajax({
	url: 'https://data.sfgov.org/resource/rptz-7xyh.json',

	dataType: 'json',

	newData: [],

	finalData: [],

	success: function(data){

		var airLines = [].sort();

		for(i=0; i<data.length; i++){
			airLines.push(data[i].operating_airline);
		}

		for(i=0; i<airLines.length; i++){
			if(airLines[i] !== airLines[i+1]){
				this.newData.push(airLines[i]);
			}else if(airLines[i+1] > airLines.length){
				break
			}
		}

		var nextData = this.newData.sort();

		for(i=0; i<nextData.length; i++){
			if(nextData[i] !== nextData[i+1]){
				this.finalData.push(nextData[i]);
			}else if(nextData[i+1] > nextData.length){
				break
			}
		}


		console.log(this.finalData)
		

	},

	type: 'GET'
})







