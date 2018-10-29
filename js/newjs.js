



$.ajax({
	url: 'https://data.sfgov.org/resource/rptz-7xyh.json',

	dataType: 'json',

	airLines: [],

	airLineNames: [],

	airObject: [],

	/* Get needed data, create a constructor of it. Then Display data neatly in the document*/

	success: function(data){

		// Air constructor
		function Air(activity_period, activity_type_code, boarding_area, geo_region, geo_summary, operating_airline, passenger_count, terminal) {
			this.activity_period = activity_period;
			this.activity_type_code = activity_type_code;
			this.boarding_area = boarding_area;
			this.geo_region = geo_region;
			this.geo_summary = geo_summary;
			this.operating_airline = operating_airline;
			this.passenger_count = passenger_count;
			this.terminal = terminal;

		};

		for(i=0; i<data.length; i++){
			this.airLines.push(data[i].operating_airline);

		}



		// Sorts the AirLine array in Alphabetical order (Multiple names for each exist)
		var airLinesSorted = this.airLines.sort();

		// Gathers the names of each airline and adds that to an empty array called airLineNames.
		for(i=0; i<airLinesSorted.length; i++){
			if(airLinesSorted[i] !== airLinesSorted[i+1]){
				this.airLineNames.push(airLinesSorted[i]);
			}else if(airLinesSorted[i+1] > airLinesSorted.length){
				break
			}
		}

		
		// Goes through Airline data and Appends list elements to Document
		for(i=0; i<this.airLineNames.length; i++){
			// Creates and Appends to Document
			var createLi = document.createElement('LI');
			createLi.textContent = this.airLineNames[i];
			createLi.className = "list_item";
			var list_1 = document.getElementById('list_1');
			list_1.appendChild(createLi);
		}

		// Toggles between size when a list element is clicked on
		var liTags = document.getElementsByClassName('list_item');
		for(i=0; i<liTags.length; i++){
			liTags[i].onclick = function(){
				var li = this;
    			li.classList.toggle("expand");
    			var p = this.children[0];
    			p.classList.toggle("show");

    		}
		}

			for(i=0; i<data.length; i++){
			
				var newAir = new Air(data[i].activity_period, data[i].activity_type_code, data[i].boarding_area, data[i].geo_region, data[i].geo_summary, data[i].operating_airline, data[i].passenger_count, data[i].terminal)

				this.airObject.push(newAir);

			}
		

		console.log(this.airObject);


		// Clone the data to a newObject, then sort that object and pull info from it. 


	},

	type: 'GET'
})
	









