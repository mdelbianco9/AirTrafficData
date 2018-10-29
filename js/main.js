



$.ajax({
	url: 'https://data.sfgov.org/resource/rptz-7xyh.json',

	dataType: 'json',

	airLines: [],

	airLineNames: [],

	passenger_count: [],

	passengers: [],

	airObject: [],

	airAndPass: [],

	concated: [],

	/* Get needed data, create a constructor of it. Then Display data neatly in the document*/

	success: function(data){

		// Air constructor
		function Air(airLine, passengers) {
			this.airLine = airLine;
			this.passengers = passengers;
			this.pushToAirObject = function(){this.airObject.push(this)};

		};


		// Gets the names of AirLines and adds it to an empty array called airLines ^
		for(i=0; i<data.length; i++){
			this.airLines.push(data[i].operating_airline);
			this.passenger_count.push(data[i].passenger_count);

			// Concats the airline name and passanger count
			this.airAndPass.push(data[i].operating_airline + "000"+ data[i].passenger_count);

		}

		// Stuff for passenger data (Below)
		var tempSort = this.airAndPass.sort();
		console.log(tempSort)

		var counter = 0;

		for(i=0; i<tempSort.length-1; i++){
			// If the 1st 5 characters of tempSort[i] are the same, slice the passanger count out and add them up, then add that value to the constructor function, or to an array.
			
			var charAt5 = tempSort[i].slice(0,8);
			var charAt10 = tempSort[i+1].slice(0,8);
			// var charAt0 = tempSort[i-1].slice(0,6);

			if(charAt5 === charAt10){
				var start = tempSort[i].indexOf("000")+3;
				var end = tempSort[i].length;
				var cut = tempSort[i].slice(start, end);

				counter = counter + Number(cut);

				// console.log(cut);
			}else if(charAt5 !== charAt10){
				// console.log("Break");
				this.passengers.push(counter);
				counter = 0;
			}

			
		}

		console.log(this.passengers);


		// Stuff for passenger data (Above)


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

			var createP = document.createElement('P');
			createP.textContent = 'Between 2005 and 2006 ' + this.airLineNames[i] + ' flew ' + this.passengers[i] + ' passengers to and from SFO.';
			createP.className = 'list_p';
			createLi.appendChild(createP);



			// Creates new constructor
			var newAir = new Air(this.airLineNames[i], this.passengers[i]);
			this.airObject.push(newAir);


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


		console.log(this.airObject);





	},

	type: 'GET'
})
	









