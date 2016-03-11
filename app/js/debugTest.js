/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*	This script will generate and insert fake data into database for debugging and testing purposes */
/*****************************************************************************************************************/
/*****************************************************************************************************************/

/*****************************************************************************************************************/
/********************************************BEGIN GLOBALS DEFAULT*********************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
//if testing, set miPayDebug to true
var miPayDebug = false;




/*****************************************************************************************************************/
/********************************************END GLOBALS DEFAULT*********************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/



/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/******************************************BEGIN On Page Load events*****************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/

$( "body" ).on( "pagecontainershow", function( event, ui ) {
    if (ui.toPage.prop("id") == "settings-page"){

    	

    	//check db debug mode
    	//if ON, then show ON button
    	if (localStorage.getItem("debugMode") == "ON") {
    		//show btnDebugActionOFF
			$('#btnDebugActionOFF').show();
			//hide btnDebugActionON
			$('#btnDebugActionON').hide();

			//update debug label
			$('#lblDebugMode').html("ON");


    		console.log("on page load: debug mode is ON");
    		
    		
    	}
    	else{
    		//hide btnDebugActionOFF
			$('#btnDebugActionOFF').hide();
			//show btnDebugActionON
			$('#btnDebugActionON').show();

			//update debug label
			$('#lblDebugMode').html("OFF");

    		console.log("on page load: debug mode is OFF");
    		checkMiPayDebug(miPayDebug);
    	};
    	

    
    }

  });








/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/******************************************END On Page Load events*****************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/


function checkMiPayDebug(miPayDebug){

	// if miPayDebug is true, then generate and insert fake data into database
	if(miPayDebug == true){

		generateFAKEdata(60);
		setDebugON();


	}//end miPayDebug if statement

	else{
		
		setDebugOFF();
	}

}//end checkMiPayDebug function





function generateFAKEdata(intMonthsBack){
	//loop back number of months
		for(var i=0; i < intMonthsBack + 1; i++){

			//if i = 0, then current month
			if(i == 0){

				//get current month and year
				var strMM = moment().format('MM');
				var strYYYY = moment().format('YYYY');

				var counterDays = 0;

				//if leap year and current month is feb, then set day counter to 29
				if( isLeapYear(strYYYY) == true){

					// if Apr, Jun, Sep, or Nov then counterDays is 30
					if (strMM == "04" || strMM == "06" || strMM == "09" || strMM == "11") {
						counterDays = 30;
					}
					else{
						counterDays = 31;
					}

					if(strMM == "02"){
						counterDays = 29;
					}
					
				}
				//else, not leap year
				else{

					// if Apr, Jun, Sep, or Nov then counterDays is 30
					if (strMM == "04" || strMM == "06" || strMM == "09" || strMM == "11") {
						counterDays = 30;
					}
					else{
						counterDays = 31;
					}

					//if feb, then counterDays is 28
					if (strMM == "02") {
						counterDays = 28;
					}
				}

				/* counterDays now should represent how days are in the current month */

				//generate the data for the current month and get an array that consist of all the dates that were
				//added by the function
				generateMonthData(counterDays, strMM, strYYYY);

				


			}//end if current month
			//else, not current month anymore and subtract months accordingly
			else{

				//get subtracted ith month and year
				var strMM = moment().subtract(i,'months').format('MM');
				var strYYYY = moment().subtract(i,'months').format('YYYY');

				var counterDays = 0;

				//if leap year and current month is feb, then set day counter to 29
				if( isLeapYear(strYYYY) == true){

					// if Apr, Jun, Sep, or Nov then counterDays is 30
					if (strMM == "04" || strMM == "06" || strMM == "09" || strMM == "11") {
						counterDays = 30;
					}
					else{
						counterDays = 31;
					}

					if(strMM == "02"){
						counterDays = 29;
					}
					
				}
				//else, not leap year
				else{

					// if Apr, Jun, Sep, or Nov then counterDays is 30
					if (strMM == "04" || strMM == "06" || strMM == "09" || strMM == "11") {
						counterDays = 30;
					}
					else{
						counterDays = 31;
					}

					//if feb, then counterDays is 28
					if (strMM == "02") {
						counterDays = 28;
					}
				}

				/* counterDays now should represent how days are in the current month */

				//generate the data for the current month and get an array that consist of all the dates that were
				//added by the function
				generateMonthData(counterDays, strMM, strYYYY);


			}



		}//end for loop

}

function setDebugOFF(){

	//set debug in db to off 
	localStorage.setItem("debugMode", "OFF");

}

function setDebugON(){

	//set debug in db to off 
	localStorage.setItem("debugMode", "ON");

}

//pass in intCounterDays (number of days in a month), a month, and a year
//generate data for the month
function generateMonthData(counterDays, strMM, strYYYY){

	//return array that consist of the dates that data was added by the script
	var arrayDatesDataInserted = [];

	for( var i = 1; i < counterDays + 1; i++) {

		var strDD = "";
		//if i < 10, then prepend "0"
		if (i < 10) {
			strDD = "0" + i.toString();
		}
		else{
			strDD = i.toString();
		}

		//combine DD, MM, YYYY to make sales date string
		var strSalesDate = "sales-" + strMM + "-" + strDD + "-" + strYYYY;
		//combine DD, MM, YYYY to make tips date string
		var strTipsDate = "tips-" + strMM + "-" + strDD + "-" + strYYYY;
		//console.log(strSalesDate);

		//if sales data exist for the date, then don't insert data
		if(localStorage.getItem(strSalesDate) && localStorage.getItem(strTipsDate)){
			//do nothing
		}
		//else, insert data for the date
		else{

			//push the date to arrayDatesDataInserted
			arrayDatesDataInserted.push(strSalesDate);

			//generate random sales data from range of 0 to 600
			var intSalesData = getRandomInt(0,600);
			var strSalesData = intSalesData.toString();
			//generate random tips data from range of 0 and 200
			var intTipsData = getRandomInt(0,200);
			var strTipsData = intTipsData.toString();

			//console.log("sales: " + strSalesData + "- tips: " + strTipsData);


			//insert sales data for date
			localStorage.setItem(strSalesDate, strSalesData);
			//insert tips data for date
			localStorage.setItem(strTipsDate, strTipsData);

		}


	}//end for loop

	


}//end generateMonthData function






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
/******************************************BEGIN EVENTS HANDLERS*****************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/

//turn debug mode ON button click handler
$('#btnDebugActionON').click(function(){
	//check db debug mode
	//if "OFF", then turn it ON
	if (localStorage.getItem("debugMode") == "OFF") {
		console.log("this shit is OFF");

		//update debug label
		$('#lblDebugMode').html("ON");

		//update DB debug key
		setDebugON();

		//hide btnDebugActionON
		$('#btnDebugActionON').hide();
		//show btnDebugActionOFF
		$('#btnDebugActionOFF').show();

		//set miPayDebug and generate fake data or not
		miPayDebug = true;
		checkMiPayDebug(miPayDebug);



	};
	
});

//turn debug mode OFF button click handler
$('#btnDebugActionOFF').click(function(){
	//check db debug mode
	//if "ON", then turn it OFF
	if (localStorage.getItem("debugMode") == "ON") {
		console.log("this shit is OFF");

		//update debug label
		$('#lblDebugMode').html("OFF");

		//update DB debug key
		setDebugON();

		//show btnDebugActionON
		$('#btnDebugActionON').show();
		//hide btnDebugActionOFF
		$('#btnDebugActionOFF').hide();

		//set miPayDebug and generate fake data or not
		miPayDebug = false;
		localStorage.clear();



	};
	

});









/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/******************************************END EVENTS HANDLERS*****************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/










