/***************************************************************************************************************/
/***************************************************BEGIN GLOBALS********************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/







/***************************************************************************************************************/
/***************************************************END GLOBALS********************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/





/***************************************************************************************************************/
/***************************************************BEGIN TOOLS********************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/

/***************************************************************************************************************/
/***************************************************END TOOLS********************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/



/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*******************************************************BEGIN*******************************************************/
/*****************************************************************************************************************/
/******************************************DEFAULT REPORT ON REPORT PAGE LOAD***************************************/
/********************************************************||*******************************************************/
/********************************************************||*******************************************************/
/********************************************************||*******************************************************/
/********************************************************\/*******************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/

/**** BEGIN set date range BEGIN  ***/


$( "body" ).on( "pagecontainershow", function( event, ui ) {
    if (ui.toPage.prop("id") == "report-page"){
        console.log("reports page loaded");

    	//set dateTo date with current date
        $('#dateToMM').html(moment().format('MM'));
        $('#dateToDD').html(moment().format('DD'));
        $('#dateToYYYY').html(moment().format('YYYY'));


        //set dateFrom 
        $('#dateFromMM').html(moment().subtract(14,'days').format('MM'));
        $('#dateFromDD').html(moment().subtract(14,'days').format('DD'));
        $('#dateFromYYYY').html(moment().subtract(14,'days').format('YYYY'));

        //populate total sales and total tips
        populateTotalSales();
        populateTotalTips();

        //populate adjusted pay label
        populateAdjustedPay(0.6);
        
        //populate cash pay label
        populateCashPay(0.5);

        //populate adjusted check pay label
        populateAdjustedCheckPay(0.2);
    }

  });


/**** END set default date range END  ***/

/*****************************************************************************************************************/
/*****************************************************************************************************************/
/********************************************************END*********************************************************/
/*****************************************************************************************************************/
/******************************************DEFAULT REPORT ON REPORT PAGE LOAD***************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/




/*****************************************************************************************************************/
/*****************************************************************************************************************/
/********************************************************BEGIN*********************************************************/
/*****************************************************************************************************************/
/******************************************POPUP DATE RANGE EVENTS********************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/


//begin FROM DATE popup
$( "#popupFromDate-container" ).on( "popupafteropen", function( event, ui ) {

    //grab MM-DD-YYYY from dateFrom-container
    $('#popupFromMM').html($('#dateFromMM').html());
    $('#popupFromDD').html($('#dateFromDD').html());
    $('#popupFromYYYY').html($('#dateFromYYYY').html());

} );

//begin TO DATE popup
$( "#popupToDate-container" ).on( "popupafteropen", function( event, ui ) {

    //grab MM-DD-YYYY from dateTo-container
    $('#popupToMM').html($('#dateToMM').html());
    $('#popupToDD').html($('#dateToDD').html());
    $('#popupToYYYY').html($('#dateToYYYY').html());

} );

//FROM popup MM Plus CLICK event
$('#fromPlusMM').click(function(){

    // grab MM from popup
    var strMMgrabbed = $('#popupFromMM').html();
    
    //get next month
    var strMMnext = plus1Month(strMMgrabbed);

    //set popup MM
    $('#popupFromMM').html(strMMnext);

    
});

//TO popup MM Plus CLICK event
$('#toPlusMM').click(function(){

    // grab MM from popup
    var strMMgrabbed = $('#popupToMM').html();
    
    //get next month
    var strMMnext = plus1Month(strMMgrabbed);

    //set popup MM
    $('#popupToMM').html(strMMnext);

    
});

//FROM popup MM Minus CLICK event
$('#fromMinusMM').click(function(){

    // grab MM from popup
    var strMMgrabbed = $('#popupFromMM').html();
    
    //get previous month
    var strMMpre = minus1Month(strMMgrabbed);

    //set popup MM
    $('#popupFromMM').html(strMMpre);

    
});

//TO popup MM Minus CLICK event
$('#toMinusMM').click(function(){

    // grab MM from popup
    var strMMgrabbed = $('#popupToMM').html();
    
    //get previous month
    var strMMpre = minus1Month(strMMgrabbed);

    //set popup MM
    $('#popupToMM').html(strMMpre);

    
});

//FROM popup DD Plus CLICK event
$('#fromPlusDD').click(function(){

    // grab DD from popup
    var strDDgrabbed = $('#popupFromDD').html();
    //get MM from popup
    var strMMgrabbed = $('#popupFromMM').html();
    //get YYYY from popup
    var strYYYYgrabbed = $('#popupFromYYYY').html();
    
    //get next YYYY
    var strDDnext = plus1Day(strDDgrabbed, strMMgrabbed, strYYYYgrabbed );

    //set popup YYYY
    $('#popupFromDD').html(strDDnext);
    
});

//To popup DD Plus CLICK event
$('#toPlusDD').click(function(){

    // grab DD from popup
    var strDDgrabbed = $('#popupToDD').html();
    //get MM from popup
    var strMMgrabbed = $('#popupToMM').html();
    //get YYYY from popup
    var strYYYYgrabbed = $('#popupToYYYY').html();
    
    //get next YYYY
    var strDDnext = plus1Day(strDDgrabbed, strMMgrabbed, strYYYYgrabbed );

    //set popup YYYY
    $('#popupToDD').html(strDDnext);
    
});

//FROM popup DD Minus CLICK event
$('#fromMinusDD').click(function(){

    // grab DD from popup
    var strDDgrabbed = $('#popupFromDD').html();
    //get MM from popup
    var strMMgrabbed = $('#popupFromMM').html();
    //get YYYY from popup
    var strYYYYgrabbed = $('#popupFromYYYY').html();
    
    //get previous DD
    var strDDpre = minus1Day(strDDgrabbed, strMMgrabbed, strYYYYgrabbed );

    //set popup YYYY
    $('#popupFromDD').html(strDDpre);
    
});

//TO popup DD Minus CLICK event
$('#toMinusDD').click(function(){

    // grab DD from popup
    var strDDgrabbed = $('#popupToDD').html();
    //get MM from popup
    var strMMgrabbed = $('#popupToMM').html();
    //get YYYY from popup
    var strYYYYgrabbed = $('#popupToYYYY').html();
    
    //get previous DD
    var strDDpre = minus1Day(strDDgrabbed, strMMgrabbed, strYYYYgrabbed );

    //set popup YYYY
    $('#popupToDD').html(strDDpre);
    
});


//FROM popup YYYY Plus CLICK event
$('#fromPlusYYYY').click(function(){

    // grab YYYY from popup
    var strYYYYgrabbed = $('#popupFromYYYY').html();
    
    //get next YYYY
    var strYYYYnext = plus1Year(strYYYYgrabbed);

    //set popup YYYY
    $('#popupFromYYYY').html(strYYYYnext);
    
});

//TO popup YYYY Plus CLICK event
$('#toPlusYYYY').click(function(){

    // grab YYYY from popup
    var strYYYYgrabbed = $('#popupToYYYY').html();
    
    //get next YYYY
    var strYYYYnext = plus1Year(strYYYYgrabbed);

    //set popup YYYY
    $('#popupToYYYY').html(strYYYYnext);
    
});

//FROM popup YYYY minus CLICK event
$('#fromMinusYYYY').click(function(){

    // grab YYYY from popup
    var strYYYYgrabbed = $('#popupFromYYYY').html();
    
    //get previous YYYY
    var strYYYYpre = minus1Year(strYYYYgrabbed);

    //set popup YYYY
    $('#popupFromYYYY').html(strYYYYpre);
    
});

//TO popup YYYY minus CLICK event
$('#toMinusYYYY').click(function(){

    // grab YYYY from popup
    var strYYYYgrabbed = $('#popupToYYYY').html();
    
    //get previous YYYY
    var strYYYYpre = minus1Year(strYYYYgrabbed);

    //set popup YYYY
    $('#popupToYYYY').html(strYYYYpre);
    
});






//From popup Cancel button Click event
$('#btnCancelPopupFrom').click(function(){

    //set popup date back to original by grabbing date from dateFromMM, dateFromDD, dateFromYYYY
    $('#popupFromMM').html($('#dateFromMM').html());
    $('#popupFromDD').html($('#dateFromDD').html());
    $('#popupFromYYYY').html($('#dateFromYYYY').html());

    //close popup
    $( "#popupFromDate-container" ).popup("close");

});

//To popup Cancel button Click event
$('#btnCancelPopupTo').click(function(){

    //set popup date back to original by grabbing date from dateFromMM, dateFromDD, dateFromYYYY
    $('#popupToMM').html($('#dateToMM').html());
    $('#popupToDD').html($('#dateToDD').html());
    $('#popupToYYYY').html($('#dateToYYYY').html());

    //close popup
    $( "#popupToDate-container" ).popup("close");

});

//FROM popup SET button Click event
$('#btnSetPopupFrom').click(function(){

    //grab date from FROM popup
    var strMM = $('#popupFromMM').html();
    var strDD = $('#popupFromDD').html();
    var strYYYY = $('#popupFromYYYY').html();

     //close popup
    $( "#popupFromDate-container" ).popup("close");


    //set dates of dateFrom
    $('#dateFromMM').html(strMM);
    $('#dateFromDD').html(strDD);
    $('#dateFromYYYY').html(strYYYY);

    populateTotalSales();    

  
});


//TO popup SET button Click event
$('#btnSetPopupTo').click(function(){

    //grab date from FROM popup
    var strMM = $('#popupToMM').html();
    var strDD = $('#popupToDD').html();
    var strYYYY = $('#popupToYYYY').html();

     //close popup
    $( "#popupToDate-container" ).popup("close");


    //set dates of dateFrom
    $('#dateToMM').html(strMM);
    $('#dateToDD').html(strDD);
    $('#dateToYYYY').html(strYYYY);

    populateTotalSales();
  
});




/*****************************************************************************************************************/
/*****************************************************************************************************************/
/********************************************************END*********************************************************/
/*****************************************************************************************************************/
/******************************************POPUP DATE RANGE EVENTS********************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/***************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/




























