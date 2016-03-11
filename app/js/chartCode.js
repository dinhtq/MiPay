/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/******************************************BEGIN Tool Functions*****************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/


/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/******************************************END Tool Functions*****************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/


/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/******************************************BEGIN GENERATE CHART FUNCTIONS*****************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/


// generateChart1Week() will generate the chart instance for 1-Week time-scale 

function generateChart1Week() {

	//declare arraySalesAndLabels array that will contain x-axis data and y-axis data
	var arraySalesAndLabels = [];

	/**** BEGIN update x-axis title i.e. -->  Aug | Sep 2015 for 1-Week time-scale  BEGIN  ***/

	//get current month
	var strMMcurrent = moment().format('MM');
	var strMMMcurrent = moment().format('MMM');
	//get previous month MMM
	var strMMMprevious = moment().subtract(1,'months');
	strMMMprevious = strMMMprevious._d.toString();
	strMMMprevious = strMMMprevious.substring(4,7);

	//get current year
	var strYYYYcurrent = moment().format('YYYY');
	//console.log(strYYYYcurrent);

	//get last 6 days moment objects  ( "_d" : Fri Sep 04 2015 15:36:19 GMT-0400 (EDT) ) into array

	var arrayMomentLast6Days = [];  //use to grab data from database later to populate y-axis
	var arrayMMM = [];  //use to populate x-axis

	//declare var for comparing between months to see if there is more than 1 month
	var isMoreThanOneMonth = false;
	var momentDateTempLAST;

	var strMMMone;
	var strMMMtwo;

	for(var i = 1; i < 7; i++) {

		var momentDateTemp = moment().subtract(i, 'days');
		momentDateTemp = momentDateTemp._d.toString();
		arrayMomentLast6Days.unshift(momentDateTemp);
		momentDateTemp = momentDateTemp.substring(4,7);

		//compare current index month to strMMMpre
		//if index is 1, then assign strMMMpre to momentDateTemp
		if( i == 1){
			momentDateTempLAST = momentDateTemp;
			strMMMtwo = momentDateTemp;
		} else{

			//check momemtDateTempLAST against momemtDateTemp to see if they are equal
			// if they are not equal, then see isMoreThanOneMonth to true
			if (momentDateTemp != momentDateTempLAST) {
				isMoreThanOneMonth = true;
				strMMMone = momentDateTemp;
			};

			momentDateTempLAST = momentDateTemp;
		}

		arrayMMM.unshift(momentDateTemp);

	}

	//default for MMM tags are to show both previous and current month tag first

	// if isMoreThanOneMonth is true, then strMMMone is previous month and strMMMtwo is current month
	// replace x-axis tag accordingly
	if(isMoreThanOneMonth == true) {

		//replace preMMMTag with strMMMone
		$('#preMMMTag').html(strMMMone + "&nbsp;&nbsp;|&nbsp;&nbsp;");

		//replace currentMMMTag with strMMMtwo
		$('#currentMMMTag').html(strMMMtwo + "&nbsp;");
		//replace currentYYYYTag with strYYYYcurrent

		$('#currentYYYYTag').html(strYYYYcurrent);
		//console.log(strYYYYcurrent);
		
	}
	// else, current month is strMMMtwo
	else {
		//hide preMMMTag
		$('#preMMMTag').hide();
		//keep currentMMMTag and currentYYYYTag shown and replace currentMMMTag with strMMMtwo and replace currentYYYYTag with strYYYYcurrent
		$('#currentMMMTag').html(strMMMtwo + "&nbsp;");
		$('#currentYYYYTag').html(strYYYYcurrent);

	}


	/**** END update x-axis title i.e. -->  Aug | Sep 2015 for 1-Week time-scale   END  ***/

	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/

	/*********** BEGIN update y-axis for 1 week by grabbing data from database END ***********/

	// generate an array of moment objects that contains the last 6 dates, and current date, in format MM-DD-YYYY 
	// and then append 'sales' to each item in array using getDateSales() 
	var arraySales1Week = [];

	for(var t=0; t < 7; t++) {

		//if index is 0, then current day
		if( t == 0) {
			//console.log(t);

			var momentTempCurrent = moment().format("MM-DD-YYYY");
			momentTempCurrent.toString();
			//console.log(momentTempCurrent);
			//get date sales and convert to integer
			var strTempDateSales = getDateSales(momentTempCurrent);

			//if sales data has not been entered, then set sales data to 0
			if (strTempDateSales == null || strTempDateSales == "") {
				strTempDateSales = "0";
			}
			var intTempDateSales = parseInt(strTempDateSales);
			//console.log(intTempDateSales);

			arraySales1Week.unshift(intTempDateSales);
		}
		//else, subtract days accordingly to get appropriate moment object
		else{
			//console.log(t);
			var momentTempDate = moment().subtract(t, 'days').format("MM-DD-YYYY");
			momentTempDate.toString();
			//console.log(momentTempDate);
			//get date sales and convert to integer
			var strTempDateSales = getDateSales(momentTempDate);
			//if sales data has not been entered, then set sales data to 0
			if (strTempDateSales == null || strTempDateSales == "") {

				strTempDateSales = "0";
			}

			var intTempDateSales = parseInt(strTempDateSales);
			//console.log(intTempDateSales);
			arraySales1Week.unshift(intTempDateSales);

		}

	}

	/*  arraySales1Week now is an array of integers of sales data for 1 week, with the current day as the last item */
	


	/*********** END update y-axis for 1 week  by grabbing data from database END ***********/

	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/

	/**** BEGIN create global array of strings that contains the current day and the last 7 days BEGIN  ***/



	//get current day
	var strDDcurrent = moment().format('DD');


	//get current day - 1
	var strDDminus1 = subtractDaysFromCurrentDay(1);
	var strDDminus2 = subtractDaysFromCurrentDay(2);
	var strDDminus3 = subtractDaysFromCurrentDay(3);
	var strDDminus4 = subtractDaysFromCurrentDay(4);
	var strDDminus5 = subtractDaysFromCurrentDay(5);
	var strDDminus6 = subtractDaysFromCurrentDay(6);

	//create array1Week
	var array1Week = [strDDminus6, strDDminus5, strDDminus4, strDDminus3, strDDminus2, strDDminus1, strDDcurrent ];



	/**** END create global array of strings that contains the current day and the last 7 days for 1-Week time-scale END  ***/

	/* creating chart instance*/
	//get the context
          var ctx = $('#myChart').get(0).getContext("2d");

          /* data structure */

          //data with sales and tips
          var dataSalesTips = {
              labels: array1Week,
              datasets: [
              		{
                      label: "Tips per day",
                      fillColor: "rgba(220,220,220,0.2)",
                      strokeColor: "rgba(220,220,220,1)",
                      pointColor: "rgba(220,220,220,1)",
                      pointStrokeColor: "#fff",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(151,187,205,1)",
                      data: ["45", "32", "78", "56", "67", "29", "90"]
                  },
                 
                  {
                      label: "Sales per day",
                      fillColor: "rgba(151,187,205,0.2)",
                      strokeColor: "rgba(151,187,205,1)",
                      pointColor: "rgba(151,187,205,1)",
                      pointStrokeColor: "#fff",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(151,187,205,1)",
                      data: arraySales1Week
                  }
                  

              ]
          };

          //data with tips only
          var dataTips = {
              labels: array1Week,
              datasets: [
              		{
                      label: "Tips per day",
                      fillColor: "rgba(220,220,220,0.2)",
                      strokeColor: "rgba(220,220,220,1)",
                      pointColor: "rgba(220,220,220,1)",
                      pointStrokeColor: "#fff",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(151,187,205,1)",
                      data: ["45", "32", "78", "56", "67", "29", "90"]
                  }
                  

              ]
          };

          //data with sales only
          var dataSales = {
              labels: array1Week,
              datasets: [

                  {
                      label: "Sales per day",
                      fillColor: "rgba(151,187,205,0.2)",
                      strokeColor: "rgba(151,187,205,1)",
                      pointColor: "rgba(151,187,205,1)",
                      pointStrokeColor: "#fff",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(151,187,205,1)",
                      data: arraySales1Week
                  }
                  

              ]
          };



          /*begin line chart*/
          //check db for chart-sales and chart-tips values
          
           window.lineChart = new Chart(ctx).Line(dataSales, {
                responsive: false // change to "false" and it will work


            });
	



}// end generateChart1Week function




/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/


// generateChart3Week() will generate the chart instance for 3-Week time-scale 

function generateChart3Week() {

	//declare arraySalesAndLabels array that will contain x-axis data and y-axis data
	var arraySalesAndLabels = [];

	/**** BEGIN update x-axis title i.e. -->  Aug | Sep 2015 for 3-Week time-scale  BEGIN  ***/

	//get current month
	var strMMcurrent = moment().format('MM');
	var strMMMcurrent = moment().format('MMM');
	//get previous month MMM
	var strMMMprevious = moment().subtract(1,'months');
	strMMMprevious = strMMMprevious._d.toString();
	strMMMprevious = strMMMprevious.substring(4,7);

	//get current year
	var strYYYYcurrent = moment().format('YYYY');
	//console.log(strYYYYcurrent);

	//get last 6 days moment objects  ( "_d" : Fri Sep 04 2015 15:36:19 GMT-0400 (EDT) ) into array

	var arrayMomentLast6Days = [];  //use to grab data from database later to populate y-axis
	var arrayMMM = [];  //use to populate x-axis

	//declare var for comparing between months to see if there is more than 1 month
	var isMoreThanOneMonth = false;
	var momentDateTempLAST;

	var strMMMone;
	var strMMMtwo;

	for(var i = 1; i < 21; i++) {

		var momentDateTemp = moment().subtract(i, 'days');
		momentDateTemp = momentDateTemp._d.toString();
		arrayMomentLast6Days.unshift(momentDateTemp);
		momentDateTemp = momentDateTemp.substring(4,7);

		//compare current index month to strMMMpre
		//if index is 1, then assign strMMMpre to momentDateTemp
		if( i == 1){
			momentDateTempLAST = momentDateTemp;
			strMMMtwo = momentDateTemp;
		} else{

			//check momemtDateTempLAST against momemtDateTemp to see if they are equal
			// if they are not equal, then see isMoreThanOneMonth to true
			if (momentDateTemp != momentDateTempLAST) {
				isMoreThanOneMonth = true;
				strMMMone = momentDateTemp;
			};

			momentDateTempLAST = momentDateTemp;
		}

		arrayMMM.unshift(momentDateTemp);

	}

	//default for MMM tags are to show both previous and current month tag first

	// if isMoreThanOneMonth is true, then strMMMone is previous month and strMMMtwo is current month
	// replace x-axis tag accordingly
	if(isMoreThanOneMonth == true) {
		$('#preMMMTag').show();

		//replace preMMMTag with strMMMone
		$('#preMMMTag').html(strMMMone + "&nbsp;&nbsp;|&nbsp;&nbsp;");
		console.log(strMMMone);

		//replace currentMMMTag with strMMMtwo
		$('#currentMMMTag').html(strMMMtwo + "&nbsp;");
		//replace currentYYYYTag with strYYYYcurrent

		$('#currentYYYYTag').html(strYYYYcurrent);
		//console.log(strYYYYcurrent);
		
	}
	// else, current month is strMMMtwo
	else {
		//hide preMMMTag
		$('#preMMMTag').hide();
		//keep currentMMMTag and currentYYYYTag shown and replace currentMMMTag with strMMMtwo and replace currentYYYYTag with strYYYYcurrent
		$('#currentMMMTag').html(strMMMtwo + "&nbsp;");
		$('#currentYYYYTag').html(strYYYYcurrent);

	}


	/**** END update x-axis title i.e. -->  Aug | Sep 2015 for 3-Week time-scale   END  ***/

	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/

	/*********** BEGIN update y-axis for 3 week by grabbing data from database END ***********/

	// generate an array of moment objects that contains the last 20 dates, and current date, in format MM-DD-YYYY 
	// and then append 'sales' to each item in array using getDateSales() 
	var arraySales3Week = [];

	for(var t=0; t < 21; t++) {

		//if index is 0, then current day
		if( t == 0) {

			var momentTempCurrent = moment().format("MM-DD-YYYY");
			momentTempCurrent.toString();
			//get date sales and convert to integer
			var strTempDateSales = getDateSales(momentTempCurrent);

			//if sales data has not been entered, then set sales data to 0
			if (strTempDateSales == null) {
				strTempDateSales = "0";
			}
			var intTempDateSales = parseInt(strTempDateSales);

			arraySales3Week.unshift(intTempDateSales);
		}
		//else, subtract days accordingly to get appropriate moment object
		else{
			var momentTempDate = moment().subtract(t, 'days').format("MM-DD-YYYY");
			momentTempDate.toString();
			//get date sales and convert to integer
			var strTempDateSales = getDateSales(momentTempDate);
			//if sales data has not been entered, then set sales data to 0
			if (strTempDateSales == null) {
				strTempDateSales = "0";
			}

			var intTempDateSales = parseInt(strTempDateSales);
			arraySales3Week.unshift(intTempDateSales);

		}

	}

	/*  arraySales3Week now is an array of integers of sales data for 1 week, with the current day as the last item */
	


	/*********** END update y-axis for 1 week  by grabbing data from database END ***********/

	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/

	/**** BEGIN update x-axis labels BEGIN  ***/
	// create global array of strings that contains the current day and the last 21 days 



	//get current day
	var strDDcurrent = moment().format('DD');

	var array3Week = [];

	//set counter for adding hyphens strings every three dates
	var counterDays = 0;

	for( var p = 0; p < 21; p++){

		if(p == 0){

			
			array3Week.unshift(strDDcurrent);

			counterDays++;
		}
		else{

			if(counterDays % 2 != 0){
				array3Week.unshift("");
			}
			else{
				var strDDminusP = subtractDaysFromCurrentDay(p);
				array3Week.unshift(strDDminusP);
			}

			
			counterDays++;
		}


	}

	//console.log(array3Week);



	/**** END update x-axis labels END  ***/



	/* creating chart instance*/
	//get the context
          var ctx = $('#myChart').get(0).getContext("2d");

          // data structure
          var data = {
              labels: array3Week,
              datasets: [
                 
                  {
                      label: "My  dataset",
                      fillColor: "rgba(151,187,205,0.2)",
                      strokeColor: "rgba(151,187,205,1)",
                      pointColor: "rgba(151,187,205,1)",
                      pointStrokeColor: "#fff",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(151,187,205,1)",
                      data: arraySales3Week
                  }
              ]
          };



          //begin line chart
           window.lineChart = new Chart(ctx).Line(data, {
                responsive: false // change to "false" and it will work
            });
	



}// end generateChart3Week function


/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/


// generateChart6Month() will generate the chart instance for 6-Month time-scale 

function generateChart6Month() {

	//declare arraySalesAndLabels array that will contain x-axis data and y-axis data
	var arraySalesAndLabels = [];



	/**** BEGIN update x-axis title i.e. --> 2014 | 2015 for 6-Month  time-scale  BEGIN  ***/

	var isMoreThanOneYear = false;




	//get current year 
	var strYYYYcurrent = moment().format("YYYY");

	//declare referenced YYYY
	var strYYYYtemp = "";

	//loop back 6 months and see if isMoreThanOneYear is true or not
	for(var y=0; y < 6; y++){

		//if current month index, then set strYYYYtemp to current year
		if(y == 0) {
			strYYYYtemp = strYYYYcurrent;
		}
		//else, not current month index, then loop backwards
		else{
			//get indexed year into strings from moment object
			var momentDate = moment().subtract(y, 'months');
			momentDate = momentDate._d;
			var strDate = momentDate.toString();
			var strYYYY = strDate.substring(11,15);

			 
			//if isMoreThanOneYear is still false, then compare strYYYY with strYYYYtemp
			if (isMoreThanOneYear == false) {

				//if current year indexed is not equal to temp year, then assign strYYYone to current year
				if(strYYYY != strYYYYtemp){
					isMoreThanOneMonth = true;
					strYYYone = strYYYY;
				}


			};

			strYYYYtemp = strYYYY;



			
		}
		



	}//end for loop 


	//set strYYYYtwo to current year
	strYYYYtwo = strYYYYcurrent;

	
	//default for MMM tags are to show both previous and current YYYY tag first

	// if isMoreThanOneYear is true, then strYYYYone is previous year and strYYYYtwo is current year
	// replace x-axis tag accordingly
	if(isMoreThanOneYear == true) {

		//hide #currentYYYYTag
		$('#currentYYYYTag').hide();

		//show #preMMMTag and #currentMMMTag
		$('#preMMMTag').show();
		$('#currentMMMTag').show();

		//set preMMMTag value 
		$('#preMMMTag').html(strYYYYone + "&nbsp;&nbsp;|&nbsp;&nbsp;");
		
		//set #currentMMMTag value
		$('#currentMMMTag').html(strYYYYtwo + "&nbsp;");

		
	}
	// else, current Year is strYYYYtwo
	else {

		//hide #currentYYYYTag
		$('#currentYYYYTag').hide();

		//hide preMMMTag
		$('#preMMMTag').hide();

		//show #currentMMMTag
		$('#currentMMMTag').show();

		//set #currentMMMTag value
		$('#currentMMMTag').html(strYYYYtwo + "&nbsp;");
		

	}





	/**** END update x-axis title i.e. -->  Aug | Sep 2015 for 3-Week time-scale   END  ***/

	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/

	/*********** BEGIN update y-axis for 6 months by grabbing data from database END ***********/

	// generate an array of moment objects that contains the last 5 dates, and current date, in format MM-DD-YYYY 
	// and then append 'sales' to each item in array using getDateSales() 
	var arraySales6Months = [];

	for(var t=0; t < 6; t++) {

		//if index is 0, then current month
		if( t == 0) {

			var momentTempCurrent = moment().format("MM-DD-YYYY");
			momentTempCurrent.toString();
			console.log(momentTempCurrent);

			//get the month total sales
			var numTotalSales = getMonthTotalSales(momentTempCurrent);
			console.log(numTotalSales);

			//stringify totalSales
			var strTotalSales = numTotalSales.toString();

			
			arraySales6Months.unshift(strTotalSales);
		}
		//else, subtract days accordingly to get appropriate moment object
		else{
			var momentTempDate = moment().subtract(t, 'months').format("MM-DD-YYYY");
			momentTempDate.toString();

			//get the month total sales
			var numTotalSales = getMonthTotalSales(momentTempDate);
			//console.log(totalSales);

			//stringify totalSales
			var strTotalSales = numTotalSales.toString();
			console.log(strTotalSales);
			arraySales6Months.unshift(strTotalSales);

		}

	}

	/*  arraySales3Week now is an array of integers of sales data for 1 week, with the current day as the last item */
	


	/*********** END update y-axis for 1 week  by grabbing data from database END ***********/

	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/

	/**** BEGIN update x-axis labels BEGIN  ***/
	// create global array of strings that contains the current month and the last 5 months



	//get current month
	var strMMcurrent = moment().format('MM');
	//set 1st of the day
	var strDDfirst = "01";


	var array6Month = [];

	

	for( var p = 0; p < 6; p++){

		//the current month
		if(p == 0){

			/* show label in form of MM-DD-YYYY */
			//if strMMcurrent have a  leading zero, then remove the zero
			if (strMMcurrent.substring(0,1) == "0"){
				strMMcurrent = strMMcurrent.slice(-1);
			}
			//get current year
			var strYYYYcurrent = moment().format('YYYY');
			//combine dates to make MM-DD-YYYY
			var strDate = strMMcurrent + "/" + strDDfirst + "/" + strYYYYcurrent;

			

			/* show label in form of MMM */
			var strMMMcurrent = moment().format('MMM');


			//pass in  label formatted as desired
			array6Month.unshift(strMMMcurrent);

			
		}
		//after the current month
		else{

			/* show label in form of MM-DD-YYYY */
			//get p subtracted month 
			var strMMminusP = subtractMonthsFromCurrentMonth(p);
			//if strMMminusP have a  leading zero, then remove the zero
			if (strMMminusP.substring(0,1) == "0"){
				strMMminusP = strMMminusP.slice(-1);
			}
			//get p subtracted year
			var strYYYYminusP = subtractYearsFromCurrentYear(p);
			//combine dates
			var strDate = strMMminusP + "/" + strDDfirst + "/" + strYYYYminusP;
			

			/* show label in form of MMM */
			var strMMM = moment().subtract(p,'months').format('MMM');

			//pass in  label formatted as desired
			array6Month.unshift(strMMM);
			

			
		}


	}

	



	/**** END update x-axis labels END  ***/

	console.log("arraySales6Months: " + arraySales6Months);

	/* creating chart instance*/
	//get the context
          var ctx = $('#myChart').get(0).getContext("2d");

          // data structure
          var data = {
              labels: array6Month,
              datasets: [
                 
                  {
                      label: "My  dataset",
                      fillColor: "rgba(151,187,205,0.2)",
                      strokeColor: "rgba(151,187,205,1)",
                      pointColor: "rgba(151,187,205,1)",
                      pointStrokeColor: "#fff",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(151,187,205,1)",
                      data: arraySales6Months
                  }
              ]
          };



          //begin line chart
           window.lineChart = new Chart(ctx).Line(data, {
                responsive: false // change to "false" and it will work
            });
	



}// end generateChart6Month function


/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/



// generateChart1Year() will generate the chart instance for 1-Month time-scale 

function generateChart1Year() {

	//declare arraySalesAndLabels array that will contain x-axis data and y-axis data
	var arraySalesAndLabels = [];



	/**** BEGIN update x-axis title i.e. --> 2014 | 2015 for 1-year  time-scale  BEGIN  ***/

	var isMoreThanOneYear = false;

	//get current year 
	var strYYYYcurrent = moment().format("YYYY");

	//declare referenced YYYY
	var strYYYYtemp = "";

	//loop back 12 months and see if isMoreThanOneYear is true or not
	for(var y=0; y < 13; y++){

		//if current month index, then set strYYYYtemp to current year
		if(y == 0) {
			strYYYYtemp = strYYYYcurrent;
		}
		//else, not current month index, then loop backwards
		else{
			//get indexed year into strings from moment object
			var momentDate = moment().subtract(y, 'months');
			momentDate = momentDate._d;
			//console.log(momentDate);
			var strDate = momentDate.toString();
			var strYYYY = strDate.substring(11,15);

			 
			//if isMoreThanOneYear is still false, then compare strYYYY with strYYYYtemp
			if (isMoreThanOneYear == false) {

				//if current year indexed is not equal to temp year, then assign strYYYone to current year
				if(strYYYY != strYYYYtemp){

					isMoreThanOneYear = true;
					strYYYYone = strYYYY;

				}


			};

			strYYYYtemp = strYYYY;
	
		}
		
	}//end for loop 


	//set strYYYYtwo to current year
	strYYYYtwo = strYYYYcurrent;

	//console.log("strYYYYOne: " + strYYYYone);
	//console.log("strYYYYtwo: " + strYYYYtwo);
	//default for MMM tags are to show both previous and current YYYY tag first

	// if isMoreThanOneYear is true, then strYYYYone is previous year and strYYYYtwo is current year
	// replace x-axis tag accordingly
	if(isMoreThanOneYear == true) {

		//hide #currentYYYYTag
		$('#currentYYYYTag').hide();

		//show #preMMMTag and #currentMMMTag
		$('#preMMMTag').show();
		$('#currentMMMTag').show();

		//set preMMMTag value 
		$('#preMMMTag').html(strYYYYone + "&nbsp;&nbsp;|&nbsp;&nbsp;");
		
		//set #currentMMMTag value
		$('#currentMMMTag').html(strYYYYtwo + "&nbsp;");

		
	}
	// else, current Year is strYYYYtwo
	else {

		//hide #currentYYYYTag
		$('#currentYYYYTag').hide();

		//hide preMMMTag
		$('#preMMMTag').hide();

		//show #currentMMMTag
		$('#currentMMMTag').show();

		//set #currentMMMTag value
		$('#currentMMMTag').html(strYYYYtwo + "&nbsp;");
		

	}





	/**** END update x-axis title i.e. -->  2014 | 2015 for 1-year time-scale   END  ***/

	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/

	/*********** BEGIN update y-axis for 1-year by grabbing data from database END ***********/

	// generate an array of moment objects that contains the last 12 dates, and current date, in format MM-DD-YYYY 
	// and then append 'sales' to each item in array using getDateSales() 
	var arraySales1Year = [];

	for(var t=0; t < 13; t++) {

		//if index is 0, then current month
		if( t == 0) {

			var momentTempCurrent = moment().format("MM-DD-YYYY");
			momentTempCurrent.toString();
			//console.log(momentTempCurrent);

			//get the month total sales
			var numTotalSales = getMonthTotalSales(momentTempCurrent);
			//console.log(totalSales);

			//stringify totalSales
			var strTotalSales = numTotalSales.toString();
			
			arraySales1Year.unshift(strTotalSales);
		}
		//else, subtract days accordingly to get appropriate moment object
		else{
			var momentTempDate = moment().subtract(t, 'months').format("MM-DD-YYYY");
			momentTempDate.toString();

			//get the month total sales
			var numTotalSales = getMonthTotalSales(momentTempDate);
			//console.log(totalSales);

			//stringify totalSales
			var strTotalSales = numTotalSales.toString();
			
			arraySales1Year.unshift(strTotalSales);

		}

	}

	/*  arraySales1Year now is an array of integers of sales data for 1 year, with the current month data as the last item */
	
	//console.log(arraySales1Year);

	/*********** END update y-axis for 1 year  by grabbing data from database END ***********/

	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/

	/**** BEGIN update x-axis labels BEGIN  ***/
	// create global array of strings that contains the current month and the last 12 months



	//get current month
	var strMMcurrent = moment().format('MM');
	//set 1st of the day
	var strDDfirst = "01";


	var array1Year = [];

	

	for( var p = 0; p < 13; p++){

		//the current month
		if(p == 0){

			/* show label in form of MM-DD-YYYY */
			//if strMMcurrent have a  leading zero, then remove the zero
			if (strMMcurrent.substring(0,1) == "0"){
				strMMcurrent = strMMcurrent.slice(-1);
			}
			//get current year
			var strYYYYcurrent = moment().format('YYYY');
			//combine dates to make MM-DD-YYYY
			var strDate = strMMcurrent + "/" + strDDfirst + "/" + strYYYYcurrent;

			
			/* show label in form of MMM */
			var strMMMcurrent = moment().format('MMM');


			//pass in  label formatted as desired
			array1Year.unshift(strMMMcurrent);

			
		}
		//after the current month
		else{

			/* show label in form of MM-DD-YYYY */
			//get p subtracted month 
			var strMMminusP = subtractMonthsFromCurrentMonth(p);
			//if strMMminusP have a  leading zero, then remove the zero
			if (strMMminusP.substring(0,1) == "0"){
				strMMminusP = strMMminusP.slice(-1);
			}
			//get p subtracted year
			var strYYYYminusP = subtractYearsFromCurrentYear(p);
			//combine dates
			var strDate = strMMminusP + "/" + strDDfirst + "/" + strYYYYminusP;
			

			/* show label in form of MMM */
			var strMMM = moment().subtract(p,'months').format('MMM');

			//pass in  label formatted as desired
			array1Year.unshift(strMMM);
			
		}

	}

	//console.log(array1Year);	

	/**** END update x-axis labels END  ***/

	/* creating chart instance*/
	//get the context
          var ctx = $('#myChart').get(0).getContext("2d");

          // data structure
          var data = {
              labels: array1Year,
              datasets: [
                 
                  {
                      label: "My  dataset",
                      fillColor: "rgba(151,187,205,0.2)",
                      strokeColor: "rgba(151,187,205,1)",
                      pointColor: "rgba(151,187,205,1)",
                      pointStrokeColor: "#fff",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(151,187,205,1)",
                      data: arraySales1Year
                  }
              ]
          };



          //begin line chart
           window.lineChart = new Chart(ctx).Line(data, {
                responsive: false // change to "false" and it will work
            });
	



}// end generateChart1Year function





/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/



// generateChart5Year() will generate the chart instance for 5-year time-scale 

function generateChart5Year() {

	//declare arraySalesAndLabels array that will contain x-axis data and y-axis data
	var arraySalesAndLabels = [];



	/**** BEGIN update x-axis title i.e. --> 2011 | 2015 for 5-year  time-scale  BEGIN  ***/

	

	//get current year 
	var strYYYYcurrent = moment().format("YYYY");
	var strYYYYsubtracted4 = moment().subtract(4,'years').format("YYYY");

	
	//hide #currentYYYYTag
	$('#currentYYYYTag').hide();

	//show #preMMMTag and #currentMMMTag
	$('#preMMMTag').show();
	$('#currentMMMTag').show();

	//set preMMMTag value 
	$('#preMMMTag').html(strYYYYsubtracted4 + "&nbsp;&nbsp;|&nbsp;&nbsp;");
		
	//set #currentMMMTag value
	$('#currentMMMTag').html(strYYYYcurrent + "&nbsp;");



	/**** END update x-axis title i.e. -->  2014 | 2015 for 1-year time-scale   END  ***/

	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/

	/*********** BEGIN update y-axis for 1-year by grabbing data from database END ***********/

	// generate an array of moment objects that contains the last 12 dates, and current date, in format MM-DD-YYYY 
	// and then append 'sales' to each item in array using getDateSales() 
	var arraySales5Year = [];

	for(var t=0; t < 5; t++) {

		//if index is 0, then current year
		if( t == 0) {

			var momentTempCurrent = moment().format("YYYY");
			momentTempCurrent.toString();
			//console.log(momentTempCurrent);

			//get the year total sales
			var numTotalSales = getcurrentYearTotalSales(momentTempCurrent);
			//console.log(totalSales);

			//stringify totalSales
			var strTotalSales = numTotalSales.toString();
			
			arraySales5Year.unshift(strTotalSales);
		}
		//else, subtract days accordingly to get appropriate moment object
		else{
			var momentTempDate = moment().subtract(t, 'years').format("YYYY");
			momentTempDate.toString();

			//get the month total sales
			var numTotalSales = getYearTotalSales(momentTempDate);
			//console.log(totalSales);

			//stringify totalSales
			var strTotalSales = numTotalSales.toString();
			
			arraySales5Year.unshift(strTotalSales);

		}

	}

	/*  arraySales1Year now is an array of integers of sales data for 1 year, with the current month data as the last item */
	
	console.log(arraySales5Year);

	/*********** END update y-axis for 1 year  by grabbing data from database END ***********/

	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/
	/*****************************************************************************************************************/

	/**** BEGIN update x-axis labels BEGIN  ***/
	// create global array of strings that contains the current year and the last 4 years



	var array5Year = [];

	

	for( var p = 0; p < 5; p++){

		//the current month
		if(p == 0){

			
			/* show label in form of YYYY */
			var strYYYYcurrent = moment().format('YYYY');


			//pass in  label formatted as desired
			array5Year.unshift(strYYYYcurrent);

			
		}
		//after the current month
		else{


			/* show label in form of YYYY */
			var strYYYY = moment().subtract(p,'years').format('YYYY');

			//pass in  label formatted as desired
			array5Year.unshift(strYYYY);
			
		}

	}

	//console.log(array1Year);	

	/**** END update x-axis labels END  ***/

	/* creating chart instance*/
	//get the context
          var ctx = $('#myChart').get(0).getContext("2d");

          // data structure
          var data = {
              labels: array5Year,
              datasets: [
                 
                  {
                      label: "My  dataset",
                      fillColor: "rgba(151,187,205,0.2)",
                      strokeColor: "rgba(151,187,205,1)",
                      pointColor: "rgba(151,187,205,1)",
                      pointStrokeColor: "#fff",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(151,187,205,1)",
                      data: arraySales5Year
                  }
              ]
          };



          //begin line chart
           window.lineChart = new Chart(ctx).Line(data, {
                responsive: false // change to "false" and it will work
            });
	



}// end generateChart5Year function


/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/******************************************END GENERATE CHART FUNCTIONS*****************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/


/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*******************************************************BEGIN*******************************************************/
/*****************************************************************************************************************/
/******************************************DEFAULT CHART ON CHART PAGE LOAD***************************************/
/********************************************************||*******************************************************/
/********************************************************||*******************************************************/
/********************************************************||*******************************************************/
/********************************************************\/*******************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/

/**** BEGIN instantiate default chart ( 1-Week time-scale) BEGIN  ***/

var lineChart;

/*  fire chart when #chart-page is shown using jQuery mobile event handler */

$( "body" ).on( "pagecontainershow", function( event, ui ) {
    if (ui.toPage.prop("id") == "chart-page"){

    	//remove selected-time-scale class from all buttons
		$('#btn1Week').removeClass("selected-time-scale");
		$('#btn3Week').removeClass("selected-time-scale");
		$('#btn6Month').removeClass("selected-time-scale");
		$('#btn1Week').removeClass("selected-time-scale");
		$('#btn1Year').removeClass("selected-time-scale");
		$('#btn5Year').removeClass("selected-time-scale");

    	//add selected-time-scale class to 1W button
    	$('#btn1Week').addClass("selected-time-scale");

    	//set chart-sales and chart-tips key-values in db
    	localStorage.setItem("chart-sales", "True");
    	localStorage.setItem("chart-tips", "True");



        //generate chart instance for 1-Week 
        generateChart1Week();

        //set in db that 1W chart is live on canvas
        localStorage.setItem("time-scale", "1W");



    
    }

  });


/**** END instantiate default chart ( 1-Week time-scale) END  ***/

/*****************************************************************************************************************/
/*****************************************************************************************************************/
/********************************************************END*********************************************************/
/*****************************************************************************************************************/
/******************************************DEFAULT CHART ON CHART PAGE LOAD***************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/





/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/******************************************BEGIN TIME-SCALE BUTTONS CLICK EVENTS**********************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/



$('#btn1Week').click(function(){

	//remove current chart instance
	$('#myChart').remove();

	//remove selected-time-scale class from all buttons
	$('#btn1Week').removeClass("selected-time-scale");
	$('#btn3Week').removeClass("selected-time-scale");
	$('#btn6Month').removeClass("selected-time-scale");
	$('#btn1Week').removeClass("selected-time-scale");
	$('#btn1Year').removeClass("selected-time-scale");
	$('#btn5Year').removeClass("selected-time-scale");


	//add selected-time-scale class to time-scale button
	$('#btn1Week').addClass("selected-time-scale");

	//instantiate another chart instance by first adding <canvas id="myChart" width="350" height="400"></canvas> 
	$('#xAxisTag').before("<canvas id='myChart' width='350' height='400'></canvas>");

	generateChart1Week();





}); //end btn1Week click event



$('#btn3Week').click(function(){

	//remove current chart instance
	$('#myChart').remove();

	//remove selected-time-scale class from all buttons
	$('#btn1Week').removeClass("selected-time-scale");
	$('#btn3Week').removeClass("selected-time-scale");
	$('#btn6Month').removeClass("selected-time-scale");
	$('#btn1Week').removeClass("selected-time-scale");
	$('#btn1Year').removeClass("selected-time-scale");
	$('#btn5Year').removeClass("selected-time-scale");


	//add selected-time-scale class to time-scale button
	$('#btn3Week').addClass("selected-time-scale");

	//instantiate another chart instance by first adding <canvas id="myChart" width="350" height="400"></canvas> 
	$('#xAxisTag').before("<canvas id='myChart' width='350' height='400'></canvas>");

	generateChart3Week();





}); //end btn3Week click event


$('#btn6Month').click(function(){

	//remove current chart instance
	$('#myChart').remove();

	//remove selected-time-scale class from all buttons
	$('#btn1Week').removeClass("selected-time-scale");
	$('#btn3Week').removeClass("selected-time-scale");
	$('#btn6Month').removeClass("selected-time-scale");
	$('#btn1Week').removeClass("selected-time-scale");
	$('#btn1Year').removeClass("selected-time-scale");
	$('#btn5Year').removeClass("selected-time-scale");


	//add selected-time-scale class to time-scale button
	$('#btn6Month').addClass("selected-time-scale");

	//instantiate another chart instance by first adding <canvas id="myChart" width="350" height="400"></canvas> 
	$('#xAxisTag').before("<canvas id='myChart' width='350' height='400'></canvas>");

	generateChart6Month();





}); //end btn6Month click event




$('#btn1Year').click(function(){

	//remove current chart instance
	$('#myChart').remove();

	//remove selected-time-scale class from all buttons
	$('#btn1Week').removeClass("selected-time-scale");
	$('#btn3Week').removeClass("selected-time-scale");
	$('#btn6Month').removeClass("selected-time-scale");
	$('#btn1Week').removeClass("selected-time-scale");
	$('#btn1Year').removeClass("selected-time-scale");
	$('#btn5Year').removeClass("selected-time-scale");


	//add selected-time-scale class to time-scale button
	$('#btn1Year').addClass("selected-time-scale");

	//instantiate another chart instance by first adding <canvas id="myChart" width="350" height="400"></canvas> 
	$('#xAxisTag').before("<canvas id='myChart' width='350' height='400'></canvas>");


	generateChart1Year();



}); //end btn1Year click event



$('#btn5Year').click(function(){

	//remove current chart instance
	$('#myChart').remove();

	//remove selected-time-scale class from all buttons
	$('#btn1Week').removeClass("selected-time-scale");
	$('#btn3Week').removeClass("selected-time-scale");
	$('#btn6Month').removeClass("selected-time-scale");
	$('#btn1Week').removeClass("selected-time-scale");
	$('#btn1Year').removeClass("selected-time-scale");
	$('#btn5Year').removeClass("selected-time-scale");


	//add selected-time-scale class to time-scale button
	$('#btn5Year').addClass("selected-time-scale");

	//instantiate another chart instance by first adding <canvas id="myChart" width="350" height="400"></canvas> 
	$('#xAxisTag').before("<canvas id='myChart' width='350' height='400'></canvas>");

	generateChart5Year();





}); //end btn3Year click event



$('#btnTips').click(function(){
	//check db tips key value
	if (localStorage.getItem("chart-tips") == "True") {
		//remove btnTips-Clicked class
		$('#btnTips').removeClass("btnTips-clicked");
		//set value in db to false
		localStorage.setItem("chart-tips", "False");
	}
	else{
		//add btnTips-Clicked class
		$('#btnTips').addClass("btnTips-clicked");
		//set value in db to false
		localStorage.setItem("chart-tips", "True");
	};

	//check db which time-scale chart is live on canvas: 1W, 3W, 6M, 1Y, 5Y
	switch(localStorage.getItem("time-scale"))
	{
		case "1W": 
			generateChart1Week();
			break;
		case "3W":
			generateChart3Week();
			break;
		case "6M":
			generateChart6Month();
			break;
		case "1Y":
			generateChart1Year();
			break;
		case "5Y":
			generateChart5Year();
			break;
		default:
			console.log("No time-scale key-value in db");

	}


});

$('#btnSales').click(function(){
	//check db sales key value
	if (localStorage.getItem("chart-sales") == "True") {
		//remove btnTips-Clicked class
		$('#btnSales').removeClass("btnSales-clicked");
		//set value in db to false
		localStorage.setItem("chart-sales", "False");

	}
	else{
		//add btnTips-Clicked class
		$('#btnSales').addClass("btnSales-clicked");
		//set value in db to false
		localStorage.setItem("chart-sales", "True");
	};

	//check db which time-scale chart is live on canvas: 1W, 3W, 6M, 1Y, 5Y
	switch(localStorage.getItem("time-scale"))
	{
		case "1W": 
			generateChart1Week();
			break;
		case "3W":
			generateChart3Week();
			break;
		case "6M":
			generateChart6Month();
			break;
		case "1Y":
			generateChart1Year();
			break;
		case "5Y":
			generateChart5Year();
			break;
		default:
			console.log("No time-scale key-value in db");

	}

});


/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/******************************************END TIME-SCALE BUTTONS CLICK EVENTS**********************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/














