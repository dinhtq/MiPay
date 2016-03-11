



//convert months from letters to numbers
function getMMnumbersFromLetters(strMMletters){

    var strMM = "";
       
        switch(strMMletters){
            case 'Jan':
                strMM = "01";
                break;
            case 'Feb':
                strMM = "02";
                break;
            case 'Mar':
                strMM = "03";
                break;
            case 'Apr':
                strMM = "04";
                break;
            case 'May':
                strMM = "05";
                break;
            case 'Jun':
                strMM = "06";
                break;
            case 'Jul':
                strMM = "07";
                break;
            case 'Aug':
                strMM = "08";
                break;
            case 'Sep':
                strMM = "09";
                break;
            case 'Oct':
                strMM = "10";
                break;
            case 'Nov':
                strMM = "11";
                break;
            case 'Dec':
                strMM = "12";
                break;

        }

        return strMM;
}





function checkDaySale(dteDate){
        //console.log(dteDate);
        var dteDate = dteDate._d.toString();
        //console.log(dteDate);

        //Tue Aug 11 2015 00:00:00 GMT-0400
        //parse date string
        var strYYYY = dteDate.substring(11, 15);
        var strDD = dteDate.substring(8,10);
        var strMM = getMMnumbersFromLetters(dteDate.substring(4,7));
        //console.log(strMM);

        $('#money-mark').hide();


        return true;

    };

// call this from the developer console and you can control both instances
var calendars = {};


// initialize some global variables and hide initial elements on Details page
var globalClickedDate = "";
var globalClickedTargetTimeStamp = "";
$('#containerSales').hide();
$('#imprintedSales').hide();
$('#containerTips').hide();
$('#imprintedTips').hide();
$('#btnSubmit').hide()
$('#btnEdit').hide();

function formatTargetDate(strTargetDate) {

    var YY = strTargetDate.slice(0,4);
    var MM = strTargetDate.slice(5,7);
    var DD = strTargetDate.slice(8,11);
    //console.log(DD);

    return MM + "-" + DD + "-" + YY;
}

function saveDateEarnings(clickedDate, numSales, numTips) {
    //console.log(clickedDate + "," + numSales + "," + numTips);

    //format localStorage key
    var strSalesKey = "sales-" + clickedDate;
    //console.log(strSalesKey);
    var strTipsKey = "tips-" + clickedDate;

    //save to localStorage
    localStorage.setItem(strSalesKey, numSales);
    localStorage.setItem(strTipsKey, numTips);

}





function getRefArray( arrayDays, intMM, strYYYY) {
    var arrayDays = arrayDays;
    var intMM = intMM;
    var strYYYY = strYYYY;

    //get previous month and next month
    var intPreMM = parseInt(intMM) - 1;
    var intNextMM = parseInt(intMM) + 1;
    //console.log(intNextMM);

    //convert to string
    var strMM = intMM.toString();
    var strPreMM = intPreMM.toString();
    var strNextMM = intNextMM.toString();



    if (strPreMM.length < 2) {
        strPreMM = "0" + strPreMM;
    }


    if (strNextMM.length < 2) {
        strNextMM = "0" + strNextMM;
    }

    //console.log(strPreMM);


    var arrayRef = [];
    var strSales = "sales";
    var strTips = "tips";


    //iterate through arrayDays 
    //per index, generate the sales and tips elements for arrayRef
    for (var i = 0; i < arrayDays.length; i++){

        //get day
        var strDD = arrayDays[i].toString();


        if (strDD.length < 2) {

        strDD = "0" + strDD;
        }
        //console.log(strDD);

        //concatenate for previous month
        if ( i < 7) {
            //concatenate sales and tips strings and push to ref array
            var strSalesDate = strSales + "-" + strPreMM + "-" + strDD + "-" + strYYYY;
            arrayRef.push(strSalesDate);
            var strTipsDate = strTips + "-" + strPreMM + "-" + strDD + "-" + strYYYY;
            arrayRef.push(strTipsDate);
        }

        //concatenate for current month
        if ( i >= 7 && i <= 37) {
            //concatenate sales and tips strings and push to ref array
            var strSalesDate = strSales + "-" + strMM + "-" + strDD + "-" + strYYYY;
            arrayRef.push(strSalesDate);
            var strTipsDate = strTips + "-" + strMM + "-" + strDD + "-" + strYYYY;
            arrayRef.push(strTipsDate);
        }

        //concatenate for current month
        if ( i > 37) {
            //concatenate sales and tips strings and push to ref array
            var strSalesDate = strSales + "-" + strNextMM + "-" + strDD + "-" + strYYYY;
            arrayRef.push(strSalesDate);
            var strTipsDate = strTips + "-" + strNextMM + "-" + strDD + "-" + strYYYY;
            arrayRef.push(strTipsDate);
        }


        


    }

    return arrayRef;



}


//make sure to cast timeStamp to string when passing into generateEventArray
function generateEventArray( intMM, strDD, strYYYY) {
                //console.log(intMM);

                //generate new event array
                var eventArrayNew = [];

                //  ex:     DD -> 01
                //create an array of days surrounding current day... 10 days before and 40 days after
                //... we just want to pull a chunk of data into the event array surrounding current 
                //month and day

                var arrayDays = [];

                var preDay = 25;

                for( var i =0; i < 7; i++) {
                    arrayDays[i] = preDay;
                    //console.log(arrayDays[i]);
                    preDay++;
                }

                var currentMonthDay = 1;
                for( var q = 7; q < 38; q++) {
                    arrayDays[q] = currentMonthDay;
                    //console.log(arrayDays[q]);
                    currentMonthDay++;
                }

                var postDay = 1;
                for( var t = 38; t < 49; t++) {
                    arrayDays[t] = postDay;
                    //console.log(arrayDays[t]);
                    postDay++;
                }
                

                //generate referenced array to compare against database
                var arrayRef = getRefArray( arrayDays, intMM, strYYYY);
                //console.log(arrayRef);

                

                //check arrayRef against database
                for (var v =0; v < arrayRef.length; v++){

                    //if there is match in database, then reformat data and add to new event array
                  if( localStorage.getItem(arrayRef[v])){
                        
                        var strDateTemp = arrayRef[v].substring(6);
                        //console.log(strDateTemp);

                        // 'date' : YYYY-MM-DD
                        var strYYYY = strDateTemp.substring(6);
                        var strDD = strDateTemp.substring(3,5);
                        var strMM = strDateTemp.substring(0,2);

                        strDateData = strYYYY + "-" + strMM + "-" + strDD;

                        eventArrayNew.push({'date': strDateData});


                        v++;

                    }
                }
                //console.log(eventArrayNew);

                return eventArrayNew;

}

//end site.js







//begin chartCode.js


//convert months from letters to numbers
function getMMnumbersFromLetters(strMMletters){

    var strMM = "";
       
        switch(strMMletters){
            case 'Jan':
                strMM = "01";
                break;
            case 'Feb':
                strMM = "02";
                break;
            case 'Mar':
                strMM = "03";
                break;
            case 'Apr':
                strMM = "04";
                break;
            case 'May':
                strMM = "05";
                break;
            case 'Jun':
                strMM = "06";
                break;
            case 'Jul':
                strMM = "07";
                break;
            case 'Aug':
                strMM = "08";
                break;
            case 'Sep':
                strMM = "09";
                break;
            case 'Oct':
                strMM = "10";
                break;
            case 'Nov':
                strMM = "11";
                break;
            case 'Dec':
                strMM = "12";
                break;

        }

        return strMM;
}




// subtract days function takes in the number of days to subtract from current day and 
// returns MM (i.e. 09 for Sep) as strings
function subtractDaysFromCurrentDay(intDays) {

    var strDDminus1 = moment().subtract(intDays,'days');
    //console.log(strDDminus1);
    strDDminus1 = strDDminus1._d.toString();
    strDDminus1 = strDDminus1.substring(8,10);
    
    return strDDminus1;

}

//pass in number of months to subtract from current month and 
// get month in format MM i.e. 08 for Aug
function subtractMonthsFromCurrentMonth(intMinusNumberOfMonths){
    var strMMminus = moment().subtract(intMinusNumberOfMonths, 'months');
    
    strMMMminus = strMMminus._d.toString();
    //console.log("called subtractMonthsFromCurrentMonth: " + strMMminus);
    strMMMminus = strMMMminus.substring(4,7);
    strMMMminus = getMMnumbersFromLetters(strMMMminus);

    return strMMMminus;
    
}

//pass in number of years to subtract from current year and 
// get year in format YYYY 
function subtractYearsFromCurrentYear(intMinusNumberOfYears){
    var strYYYYminus = moment().subtract(intMinusNumberOfYears, 'years');
    
    strYYYYminus = strYYYYminus._d.toString();
    
    strYYYYminus = strYYYYminus.substring(11,15);
    //console.log("called subtractYearsFromCurrentYear: " + strYYYYminus);

    return strYYYYminus;
    
}

//get the total sales for the month as number, passing in any date of format MM-DD-YYYY
function getMonthTotalSales(strDate){
    //strDate     i.e.     09-11-2015

    /* create arraySales that consist of sales data for all the dates in the current month*/
    //get month of strDate
    var strMM = strDate.substring(0,2);
    //get year of strDate
    var strYYYY = strDate.substring(6);
    //set 1st DD
    var intDayOne = 1;
    //declare sum variable of sales
    var sumSales = 0;

    var arraySales = [];

    //determine counter
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

    for(var day = 1; day < counterDays + 1; day++){

        //if i = 0, then its day 1
        if(day == 1) {
            //stringify intDayOne 
            var strDayOne = intDayOne.toString();
            //if single digit, then add leading zero
            if(strDayOne.length == 1) {
                strDayOne = "0" + strDayOne;
            }
            
            //create date MM-DD-YYYY
            strTempDate = strMM + "-" + strDayOne + "-" + strYYYY;
            //console.log(strTempDate);

            //grab sales data for strTempdate and push to arraySales
            strTempSales = getDateSales(strTempDate);

            //if no sales data for date, then set strTempSales value to "0"
            if (strTempSales == null){
                strTempSales = "0";
            }

            //cast sales data to int
            var numTempSales = Number(strTempSales);
            //console.log("day: " + day + "numTempSales: " + numTempSales);

            arraySales.unshift(numTempSales);

            //add intTempSales to sumSales
            sumSales = sumSales + numTempSales;
            

        }
        //else, not day 1
        else{

            //stringify day 
            var strDay = day.toString();
            //if single digit, then add leading zero
            if(strDay.length == 1) {
                strDay = "0" + strDay;
            }
            
            //create date MM-DD-YYYY
            strTempDate = strMM + "-" + strDay + "-" + strYYYY;
            //console.log(strTempDate);

            //grab sales data for strTempdate and push to arraySales
            strTempSales = getDateSales(strTempDate);
            //console.log("day: " + day + " - strTempSales: " + strTempSales);

            //if no sales data for date, then set strTempSales value to "0"
            if (strTempSales == null){
                strTempSales = "0";

            }

            //cast sales data to int
            var numTempSales = Number(strTempSales);
            //console.log("day: " + day + " - numTempSales: " + numTempSales);
            arraySales.unshift(numTempSales);

            //add intTempSales to sumSales
            sumSales = sumSales + numTempSales;
        


        }

    }//end for loop


    //console.log(sumSales);
    return sumSales;

}


//get the total sales for the year as number, passing in any date of format "YYYY"
//...this function is dependent on getMonthTotalSales(strDate)
function getYearTotalSales(strYYYY){

    //declare sales sum var for year
    var sumYearSales = 0;

    //start loop for 12 months
    for(var i = 1; i < 13; i++){

        var intMM = i;
        var strMM = "";

        if(i < 10){
            strMM = "0" + i.toString();
        }else{
            strMM = i.toString();
        }

        var strDate = strMM + "-01-" + strYYYY;

        //get total month sales for strDate and add to sumYearSales
        sumYearSales = sumYearSales + getMonthTotalSales(strDate);

    }

    return sumYearSales;

}



//get the total sales for the current year as number, passing in any date of format "YYYY"
//...this function is dependent on getMonthTotalSales(strDate)
function getcurrentYearTotalSales(strYYYY){

    //get current month it is
    var strCurrentMM = moment().format('MM');
    var intCurrentMM = parseInt(strCurrentMM);

    //declare sales sum var for year
    var sumYearSales = 0;

    //start loop for 12 months
    for(var i = 1; i < intCurrentMM + 1; i++){

        var intMM = i;
        var strMM = "";

        if(i < 10){
            strMM = "0" + i.toString();
        }else{
            strMM = i.toString();
        }

        var strDate = strMM + "-01-" + strYYYY;

        //get total month sales for strDate and add to sumYearSales
        sumYearSales = sumYearSales + getMonthTotalSales(strDate);

    }

    return sumYearSales;

}



//end chartCode.js


//begin debugTest

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//end debugTest




//begin reports

//returns true or false whether year in format YYYY is leap year or not
function isLeapYear(strYYYY){
    //cast year to integer
    var strYYYY = parseInt(strYYYY);

    if(strYYYY % 4 == 0){
        
        if(strYYYY % 100 == 0 && strYYYY % 400 != 0){
            return false;
        }
        else{
            return true;
        }


    }
    else{
        return false;
    }

}

// increment the From popup MM by 1
function plus1Month(strMM){

    //parse to int
    var intMM = parseInt(strMM);

    //if MM is 12, then return the 1st month
    if (intMM ==  12) {
        return "01";
    }
    //else, increment MM by 1
    else{
        intMM++;

        if (intMM < 10){
            return "0" + intMM.toString();
        }
        else{
            return intMM.toString();
        }
    }
}


// minus the From popup MM by 1
function minus1Month(strMM){

    //parse to int
    var intMM = parseInt(strMM);

    //if MM is 1, then return the last month
    if (intMM ==  1) {
        return "12";
    }
    //else, minus MM by 1
    else{
        intMM--;

        if (intMM < 10){
            return "0" + intMM.toString();
        }
        else{
            return intMM.toString();
        }
    }
}



//increment the From popup DD by 1
function plus1Day(strDD, strMM, strYYYY){

    //set max day
    var intDDmax = 0;

    //convert strDD to int
    var intDD = parseInt(strDD);
    

    if(isLeapYear(strYYYY) && strMM == "02"){
        intDDmax = 29;
        
        //if DD is 29, then DD is 1
        if( intDD == intDDmax ) {
            
            return "01";
        }
        else{
            intDD++;

            if (intDD < 10) {
                return "0" + intDD.toString();
            }else{
                return intDD.toString();
            }
            
        }
    }
    else if (strMM == "04" || strMM == "06" || strMM == "09" || strMM == "11") {
        intDDmax = 30;

        if (intDD == intDDmax) {
            return "01";
        }else{
            intDD++;
            if (intDD < 10) {
                return "0" + intDD.toString();
            }else{
                return intDD.toString();
            }
        }
    }
    else if( strMM == "02"){
        intDDmax = 28;


        if (intDD == intDDmax) {
            return "01";
        }else{
            intDD++;
            if (intDD < 10) {
                return "0" + intDD.toString();
            }else{
                return intDD.toString();
            }
        }
    }
    else{
        intDDmax = 31;


        if (intDD == intDDmax) {
            return "01";
        }else{
            intDD++;
            if (intDD < 10) {
                return "0" + intDD.toString();
            }else{
                return intDD.toString();
            }
        }
    }


}


//minus the From popup DD by 1
function minus1Day(strDD, strMM, strYYYY){

    //set max day
    var intDDmax = 0;

    //convert strDD to int
    var intDD = parseInt(strDD);
    

    if(isLeapYear(strYYYY) && strMM == "02"){
        intDDmax = 29;
        
        //if DD is 29, then DD is 1
        if( intDD == 1 ) {
            
            return "29";
        }
        else{
            intDD--;

            if (intDD < 10) {
                return "0" + intDD.toString();
            }else{
                return intDD.toString();
            }
            
        }
    }
    else if (strMM == "04" || strMM == "06" || strMM == "09" || strMM == "11") {
        intDDmax = 30;

        if (intDD == 1) {
            return "30";
        }else{
            intDD--;
            if (intDD < 10) {
                return "0" + intDD.toString();
            }else{
                return intDD.toString();
            }
        }
    }
    else if( strMM == "02"){
        intDDmax = 28;


        if (intDD == 1) {
            return "28";
        }else{
            intDD--;
            if (intDD < 10) {
                return "0" + intDD.toString();
            }else{
                return intDD.toString();
            }
        }
    }
    else{
        intDDmax = 31;


        if (intDD == 1) {
            return "31";
        }else{
            intDD--;
            if (intDD < 10) {
                return "0" + intDD.toString();
            }else{
                return intDD.toString();
            }
        }
    }


}






// increment the From popup YYYY by 1
function plus1Year(strYYYY){

    //parse to int
    var intYYYY = parseInt(strYYYY);

   //increment by 1
   intYYYY++;

   //return
   return intYYYY.toString();
}

// minus the From popup YYYY by 1
function minus1Year(strYYYY){

    //parse to int
    var intYYYY = parseInt(strYYYY);

   //minus by 1
   intYYYY--;

   //return
   return intYYYY.toString();
}

//returns sales data (int) for date in format MM-DD-YYYY
function getDateSales(clickedDate) {

    
    //format keys
    var strSalesKey = "sales-" + clickedDate;
    

    //get values of keys from localstorage
    var strSales = localStorage.getItem(strSalesKey);

    //if data is empty, then return zero
    if (strSales == "" ||  strSales == null) {
        strSales = "0";
    };
    
    return parseInt(strSales);
}

//returns tips data (int) for date in format MM-DD-YYYY
function getDateTips(clickedDate) {
    
    //format keys
    var strTipsKey = "tips-" + clickedDate;
    

    //get values of keys from localstorage
    var strTips = localStorage.getItem(strTipsKey);

    //if data is empty, then return zero
    if (strTips == "" ||  strTips == null) {
        strTips = "0";
    };
    
    return parseInt(strTips);
}



//Convert milliseconds to object with days, hours, minutes, and seconds
function convertMS(ms) {
  var d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  return { d: d, h: h, m: m, s: s };
};

//pass in the FROM and TO date ranges and function will return the total sales (int)
function getRangeTotalSales(strDateFrom, strDateTo) {
    console.log("getRangeTotalSales() called");
    console.log("strDateFrom: " + strDateFrom);

    //create javascript objects for strDateFrom and strDateTo
    var objDateFrom = new Date(strDateFrom);
    objDateFrom.setHours(0,0,0,0);
    var objDateTo = new Date(strDateTo);
    objDateTo.setHours(0,0,0,0);

    console.log("objDateFrom: " + objDateFrom);
    console.log("objDateTo: " + objDateTo);

    //get number of days elapsed
    var diffMilli = objDateTo - objDateFrom;
    //convert to number of days
    var objDayDiff = convertMS(diffMilli);
    var intDayDiff = objDayDiff.d;

    console.log("intDayDiff: " + intDayDiff);

    //console.log("days elapsed: " + intDayDiff);

    var intSumSales = 0;
    //loop from date FROM to date TO using intDayDiff as counter
    for( var i= 0; i < intDayDiff + 1; i++ ){

        console.log("******************");

        //if initial day, then get sales data for FROM date and add to intSumSales
        if( i == 0){
            
            intSumSales = intSumSales + getDateSales(strDateFrom);
            console.log("initial day: " + strDateFrom);
            console.log("intSumSales: " + intSumSales);
        }
        //else, add dates according to counter and add to intSumSales
        else{

            var ithDate = new Date(strDateFrom);

            ithDate.setTime( ithDate.getTime() + i * 86400000 );
            //format date to MM-DD-YYYY
            var ithMM = ithDate.getMonth() + 1;
            if (ithMM < 10) {
                var strMM = "0" + ithMM.toString();
            }else{
                var strMM = ithMM.toString();
            }
            

            var ithDD = ithDate.getDate();
            if (ithDD < 10) {
                var strDD = "0" + ithDD.toString();
            }else{
                var strDD = ithDD.toString();
            }
            

            var ithYYYY = ithDate.getFullYear();
            var strYYYY = ithYYYY.toString();

            var strDate =strMM + "-" + strDD + "-" + strYYYY;
            
            console.log("strDate: " + strDate);
            intSumSales = intSumSales + getDateSales(strDate);
            
            console.log("intSumSales" + intSumSales);
        }

        console.log("Day: " + i + " intSumSales: " + intSumSales);
        console.log("******************");

    }

    console.log("final intSumSales: " + intSumSales);

    return intSumSales;

}

//pass in the FROM and TO date ranges and function will return the total tips (int)
function getRangeTotalTips(strDateFrom, strDateTo) {

    //create javascript objects for strDateFrom and strDateTo
    var objDateFrom = new Date(strDateFrom);
    objDateFrom.setHours(0,0,0,0);
    var objDateTo = new Date(strDateTo);
    objDateTo.setHours(0,0,0,0);

    //get number of days elapsed
    var diffMilli = objDateTo - objDateFrom;
    //convert to number of days
    var objDayDiff = convertMS(diffMilli);
    var intDayDiff = objDayDiff.d;

    //console.log("days elapsed: " + intDayDiff);

    var intSumTipss = 0;
    //loop from date FROM to date TO using intDayDiff as counter
    for( var i= 0; i < intDayDiff + 1; i++ ){

        //if initial day, then get sales data for FROM date and add to intSumSales
        if( i == 0){
            
            intSumTipss = intSumTipss + getDateTips(strDateFrom);
            //console.log("initial day: " + strDateFrom);
        }
        //else, add dates according to counter and add to intSumTipss
        else{

            var ithDate = new Date(strDateFrom);
            ithDate.setTime( ithDate.getTime() + i * 86400000 );
            //console.log(ithDate);


            //format date to MM-DD-YYYY
            var ithMM = ithDate.getMonth() + 1;
            if (ithMM < 10) {
                var strMM = "0" + ithMM.toString();
            }else{
                var strMM = ithMM.toString();
            }
            

            var ithDD = ithDate.getDate();
            if (ithDD < 10) {
                var strDD = "0" + ithDD.toString();
            }else{
                var strDD = ithDD.toString();
            }
            

            var ithYYYY = ithDate.getFullYear();
            var strYYYY = ithYYYY.toString();

            var strDate =strMM + "-" + strDD + "-" + strYYYY;
            //console.log(strDate);

            intSumTipss = intSumTipss + getDateTips(strDate);
        }

    }

    return intSumTipss;

}



//will recalculate and repopulate total sales
function populateTotalSales(){
    console.log("populateTotalSales() called");
    /* recalculate and repopulate total sales*/
    var strDateFrom = $('#dateFromMM').html() + "-" + $('#dateFromDD').html() + "-" + $('#dateFromYYYY').html();
    var strDateTo =  $('#dateToMM').html() + "-" + $('#dateToDD').html() + "-" + $('#dateToYYYY').html();

    //get range total sales
    var intTotalSales = getRangeTotalSales(strDateFrom, strDateTo);

    //set lblTotalSales
    $('#lblTotalSales').html(intTotalSales.toString());
}


//will recalculate and repopulate total tips
function populateTotalTips(){
    /* recalculate and repopulate total tips*/
    var strDateFrom = $('#dateFromMM').html() + "-" + $('#dateFromDD').html() + "-" + $('#dateFromYYYY').html();
    var strDateTo =  $('#dateToMM').html() + "-" + $('#dateToDD').html() + "-" + $('#dateToYYYY').html();

    //get range total tips
    var intTotalTips = getRangeTotalTips(strDateFrom, strDateTo);

    //set lblTotalSales
    $('#lblTotalTips').html(intTotalTips.toString());
}


//calculates adjusted pay from total sales 
function populateAdjustedPay(intPercentDeduct){

      var strAdjustedPay = $('#lblTotalSales').html();
      var intAdjustedPay = parseInt(strAdjustedPay);

      //console.log(strAdjustedPay);

      $('#lblAdjustedPay').html(intAdjustedPay * intPercentDeduct);
}

//calculates cash pay from adjusted pay 
function populateCashPay(intPercentCash){

    //get adjusted pay
      var strAdjustedPay = $('#lblAdjustedPay').html();
      var intAdjustedPay = parseInt(strAdjustedPay);

      

      $('#lblCashPay').html(intAdjustedPay * intPercentCash);
}


//calculates adjusted check pay from adjusted pay 
function populateAdjustedCheckPay(tax){

    //get check pay before tax and tips from adjusted pay
    var strAdjustedPay = $('#lblAdjustedPay').html();
    var intAdjustedPay = parseInt(strAdjustedPay);
    var checkBeforeTaxTips = 0.5 * intAdjustedPay;

    //get total tips
    var strTotalTips = $('#lblTotalTips').html();
    var intTotalTips = parseInt(strTotalTips);

   //calculate adjusted check 
   var adjustedCheck = (checkBeforeTaxTips + intTotalTips) - ((checkBeforeTaxTips + intTotalTips) * tax);
   

    $('#lblAdjustedCheckPay').html(adjustedCheck);
}



