







$(document).ready(function () {

    // assuming you've got the appropriate language files,
    // clndr will respect whatever moment's language is set to.
    // moment.locale('ru');

    // here's some magic to make sure the dates are happening this month.
    var strThisMM = moment().format('MMM');
    var intThisMM = getMMnumbersFromLetters(strThisMM);
    //console.log(strThisMM);

    var strThisDay = moment().format('MM-DD-YYYY');
    //console.log(strThisDay);

    var strThisYYYY = moment().format('YYYY');


    //get all 

    var eventArray = generateEventArray(intThisMM, strThisDay, strThisYYYY);

   

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
                //console.log(target);
                //console.log(target["date"]._d);
                globalClickedTargetTimeStamp = target["date"]._d;

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

                //console.log(strTimeStamp);
                var strMMletters = strMonth.substring(4,7);
                //console.log(strMMletters);
                var strYYYY = strMonth.substring(11, 15);
                var strDD = strMonth.substring(8,10);
                //console.log(strDD);
                //get MMnumeric from MMletters
                var intMM = getMMnumbersFromLetters(strMMletters);

                //call generate event array function
                var eventArrayNew = generateEventArray(intMM, strDD, strYYYY);

                
                myCal.setEvents(eventArrayNew);

                //store month in db to reference in cal-page on load
                var momentMonthChanged = month._d;
                var strMonthChanged = momentMonthChanged.toString();
                localStorage.setItem("onMonthChange", strMonthChanged);





            },
           
            today: function(month){
                //console.log("today clicked");
            }

        },
        showAdjacentMonths: true,
        adjacentDaysChangeMonth: false,
        forceSixRows: true
    });



   


    $('#linkDetails').click(function(){
        
        //global clicked date MM-DD-YYYY
        //console.log(globalClickedDate);

        //clear input fields
        $('#txtSales').html("");
        $('#txtTips').html("");

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
            $('#txtSales').val("");
            $('#containerTips').show("fast");
            $('#txtTips').val("");
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

        //console.log(globalClickedTargetTimeStamp);
        var myCal = calendars.clndr2;

        /*
        //generate new eventArray to basically refresh the calendar
        //get MMM from month object
                var strTargetTimestamp = globalClickedTargetTimeStamp.toString();
                console.log(strTargetTimestamp);

                //console.log(strTimeStamp);
                var strMMletters = strTargetTimestamp.substring(4,7);
                //console.log(strMMletters);
                var strYYYY = strTargetTimestamp.substring(11, 15);
                var strDD = strTargetTimestamp.substring(8,10);
                //console.log(strDD);
                //get MMnumeric from MMletters
                var intMM = getMMnumbersFromLetters(strMMletters);

                console.log(intMM + "-" + strDD + "-" +  strYYYY)

                //call generate event array function
                var eventArrayNew = generateEventArray(intMM, strDD, strYYYY);

                

                myCal.setEvents(eventArrayNew);

    */



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


    $('#btnEdit').click(function(){
        //console.log("hello");

        //hide edit button
        $('#btnEdit').hide();


        //grab data from imprintedSales and imprintedTips
        var strDateSales = $('#imprintedSales').html();
        var strDateTips = $('#imprintedTips').html();

        //hide imprintedSales and imprintedTips
        $('#imprintedSales').hide();
        $('#imprintedTips').hide();

        //show containers for sales and tips input fields
        $('#containerSales').show();
        $('#containerTips').show();

        //show submit button
        $('#btnSubmit').show();

        //fill input fields
        $('#txtSales').val(strDateSales);
        $('#txtTips').val(strDateTips);
    });

    
    $( "body" ).on( "pagecontainershow", function( event, ui ) {
        if (ui.toPage.prop("id") == "cal-page"){

                console.log("cal-page load event");

                var myCal = calendars.clndr2;
                //console.log(myCal);
                //console.log(month);

                //check if page is loading due to going to cal-page or from linking back from details page
                if (localStorage.getItem("onMonthChange") == null || localStorage.getItem("onMonthChange") == "") {
                    //if empty, then cal-page loaded by user
                    var month = moment();

                    //get MMM from month object
                    var strMonth = month._d.toString();
                }
                //else, cal-page is loaded from linking back from details page
                else{
                    strMonth = localStorage.getItem("onMonthChange");
                };
                
                //console.log(strMonth);

                //console.log(strTimeStamp);
                var strMMletters = strMonth.substring(4,7);
                //console.log(strMMletters);
                var strYYYY = strMonth.substring(11, 15);
                var strDD = strMonth.substring(8,10);
                //console.log(strDD);
                //get MMnumeric from MMletters
                var intMM = getMMnumbersFromLetters(strMMletters);

                console.log(intMM + "-" + strDD + "-" + strYYYY);

                //call generate event array function
                var eventArrayNew = generateEventArray(intMM, strDD, strYYYY);

                

                myCal.setEvents(eventArrayNew);

            

            //check db debug mode
            //if ON, then 
            if (localStorage.getItem("debugMode") == "ON") {

               


                console.log("on cal-page load: debug mode is ON");
                
                
            }
            else{
                

                console.log("on cal-page load: debug mode is OFF");
                checkMiPayDebug(miPayDebug);
            };
            

        
        }

      });
   

  



});