



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

function getDateSales(clickedDate) {
    //format keys
    var strSalesKey = "sales-" + clickedDate;
    var strTipsKey = "tips-" + clickedDate;

    //get values of keys from localstorage
    var strSales = localStorage.getItem(strSalesKey);
    return strSales;
}

function getDateTips(clickedDate) {
    //format keys
    var strTipsKey = "tips-" + clickedDate;

    //get values of keys from localstorage
    var strTips = localStorage.getItem(strTipsKey);
    return strTips;
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





$(document).ready(function () {

    // assuming you've got the appropriate language files,
    // clndr will respect whatever moment's language is set to.
    // moment.locale('ru');

    // here's some magic to make sure the dates are happening this month.
    var thisMonth = moment().format('YYYY-MM');

    var thisDay = moment().format('MM-DD-YYYY');
    //console.log(thisDay);

    //get all 

    var eventArray = [
    { startDate: '2015-07-06', endDate: '2015-07-10'},
    { startDate: thisMonth + '-21', endDate: thisMonth + '-23'},
    { date: '2015-08-25'}
  ];

    var eventArray2 = [
    { startDate: '2015-09-06', endDate: '2015-09-10'},
    { startDate: thisMonth + '-19', endDate: thisMonth + '-23'},
    { date: '2015-09-25'}
  ];

    // the order of the click handlers is predictable.
    // direct click action callbacks come first: click, nextMonth, previousMonth, nextYear, previousYear, or today.
    // then onMonthChange (if the month changed).
    // finally onYearChange (if the year changed).


    calendars.clndr2 = $('.cal2').clndr({
        template: $('#template-calendar').html(),
        events: eventArray,
        multiDayEvents: {
            startDate: 'startDate',
            endDate: 'endDate',
            singleDay: 'date'
        },
        lengthOfTime: {
            months: null,
            days: null,
            interval: 1
        },
        classes: {
            today : "today",
            nextMonth : "cal-next-button"
        },
        clickEvents: {
            click: function (target) {
                console.log(target);
                //console.log(target["date"]._i);

                //get current date YY-MM-DD
                var strClickedDate = target["date"]._i;
                var strClickedDate = formatTargetDate(strClickedDate);
                //print date to tagClickedDate
                $('#tagClickedDate').html(strClickedDate);
                //set globalClickedDate 
                globalClickedDate = strClickedDate; 

                //go to details page
                $('#linkDetails').trigger("click");

            },
            onMonthChange: function(month) {
                //console.log(month);
                var myCal = calendars.clndr2;
                //console.log(myCal);
                //console.log(month);

                //get MMM from month object
                var strMonth = month._d.toString();
                //console.log(strMonth);

                var strMMletters = strMonth.substring(4,7);
                console.log(strMMletters);
                var strYYYY = strMonth.substring(11, 15);
                var strDD = strMonth.substring(8,10);
                //console.log(strDD);
                //get MMnumeric from MMletters
                var intMM = getMMnumbersFromLetters(strMMletters);

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
                
                



                





                myCal.setEvents(eventArrayNew);





            },
           
            today: function(month){
                //console.log("today clicked");
            }

        },
        forceSixRows: true
    });



    // bind both clndrs to the left and right arrow keys
    $(document).keydown(function (e) {
        if (e.keyCode == 37) {
            // left arrow
            calendars.clndr1.back();
            calendars.clndr2.back();
        }
        if (e.keyCode == 39) {
            // right arrow
            calendars.clndr1.forward();
            calendars.clndr2.forward();
        }
    });


    $('#linkDetails').click(function(){
        
        //global clicked date MM-DD-YYYY
        //console.log(globalClickedDate);


        //if data for clicked date exist, then show imprints with data
        if (getDateSales(globalClickedDate))
        {
            //console.log(getDateSales(globalClickedDate));

            //show imprinted labels
            $('#imprintedSales').show("fast", function(){
                $(this).html(getDateSales(globalClickedDate));
            });
            $('#imprintedTips').show("fast", function(){
                $(this).html(getDateTips(globalClickedDate));
            });

            //show edit button
            $('#btnEdit').show("fast");



        } else{
            //console.log("no data");
            $('#containerSales').show("fast");
            $('#containerTips').show("fast");
            $('#btnSubmit').show("fast");
        }

        //else show input fields for sales and tips, along with submit button
        
    });

    $('#anchorBack').click(function(){

        //clear input fields
        $('#txtSales').html("");
        $('#txtTips').html("");
        //hide all labels and fields and buttons
        $('#containerSales').hide();
        $('#imprintedSales').hide();
        $('#containerTips').hide();
        $('#imprintedTips').hide();
        $('#btnSubmit').hide()
        $('#btnEdit').hide();



    });

   


    $('#btnSubmit').click(function(){

        //get clicked date
        var clickedDate = globalClickedDate;
        //console.log(clickedDate);

        //get sales and tips inputs
        var numSales = $('#txtSales').val();
        var numTips = $('#txtTips').val();
        //console.log(numTips);

        //save sales and tips to localStorage
        saveDateEarnings(clickedDate, numSales, numTips);

        

        //get sales and tips and replace removed inputs with sales and tips values
        var strTargetSales = getDateSales(clickedDate);
        var strTargetTips = getDateTips(clickedDate);
        //remove input fields and submit button
        $('#containerSales').hide();
        $('#containerTips').hide();
        $('#btnSubmit').hide();

        $('#imprintedSales').html(strTargetSales);
        $('#imprintedTips').html(strTargetTips);
        
        //show imprinted labels
            $('#imprintedSales').show("fast");
            $('#imprintedTips').show("fast");

        //show edit button
        $('#btnEdit').show("fast");

    }); //end btnSubmit click event




    

   





});