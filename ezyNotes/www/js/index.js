// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.


(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        document.addEventListener("backbutton", fnbackbutton.bind(this), false);

        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

    };

    function fnbackbutton() {

        try {
            $(".butcan").click();
        } catch (x) { }
        return false;
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();



$(document).ready(function () {
    $(".menu_login li").click(function () {
        $('li > ul').not($(this).children("ul")).hide();
        $(this).children("ul").toggle();
    });


});

function cancelform() {
    var res = confirm("Do you wish to exit 'ezy notes'?")
    if (res == true) {


        if (navigator.app) {
            navigator.app.exitApp();
        }
        else if (navigator.device) {
            navigator.device.exitApp();
        }
        else {
            window.close();
        }


    }
    return false;
}


function ShowPro() {
    $("#divload").attr("style", "");
    try {
        $(".btn").attr("disabled", true);
        $(".submit").attr("disabled", true);
        $(".submitclass").attr("disabled", true);
    } catch (e) { }
}

function ShowLoad() {
    $("#divload").attr("style", "");
    try{
        $(".btn").attr("disabled", true);
        $(".submit").attr("disabled", true);
        $(".submitclass").attr("disabled", true);
    } catch (e) { }

    var err = "0";
    var IP=IPStr();
    $.support.cors = true;
    $.ajax({
        url: IP + "Administrative.svc/CheckNet",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var res = result.d;
            err = res;
          
        },
        error:function(){
            window.location = "nonet.html";
            var str=window.location.pathname.split('/');
            localStorage.setItem("lastpage", str[str.length - 1]);
        },
        complete: function (request, status) { HideLoad();  }
    });
    
}

function HideLoad() {
    $("#divload").attr("style", "display:none");
    try {
        $(".btn").removeAttr("disabled");
        $(".submitclass").removeAttr("disabled");
        $(".submit").removeAttr("disabled");
    } catch (e) { }
}

function IPStr() {

 var IP = "http://98.142.102.154:8002/";
 //var IP = "http://localhost:8078/";
    return IP;

}

function fnSwitch()
{
    window.location = "switch.html";
}




var errorsym = "<i class='fa fa-exclamation-triangle'></i>&nbsp;"

function txtboxPress(txtbox, e, decimal) {



    var key;

    var isCtrl = false;
    var keychar;
    var reg;

    if (window.event) {
        key = e.keyCode;
        isCtrl = window.event.ctrlKey
    }
    else if (e.which) {
        key = e.which;
        isCtrl = e.ctrlKey;
    }
    if (isNaN(key)) return true;
    keychar = String.fromCharCode(key);
    // check for backspace or delete, or if Ctrl was pressed

    if (key == 8 || key == 9 || isCtrl || (key >= 48 && key <= 57)) {
        return true;
    }

    reg = /\d/;

    var allowDecimal = decimal;
    var allowNegative = false;
    var isFirstN = allowNegative ? keychar == '-' && txtbox.value.indexOf('-') == -1 : false;
    var isFirstD = allowDecimal ? keychar == '.' && txtbox.value.indexOf('.') == -1 : false;

    return isFirstN || isFirstD || reg.test(keychar);

}



function txtboxenter(txtbox, e) {
    if (e.keyCode == 13) {
        ValidatePageNo(txtbox);
    }
}

function ValidatePageNo(txtbox) {
    var tot = $("#lblTotal").text();
    var pageno = txtbox.value.trim();

    if (pageno.trim() == "")
        txtbox.value = "1";

    if (isNaN(txtbox.value)) {
        txtbox.value = "1";
    }



    if (parseInt(tot) < parseInt(pageno) || parseInt(pageno) == 0) {
        txtbox.value = "1";
    }

    $("#btnPage").click();
}




function ValidateEmail(email) {
    var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var valid = emailReg.test(email);
    return valid;
}

var appkey = "FE78B218-16F4-4F28-BADE-06FF131B4D2E";

function ShowErrorMsg(errctrl,msg) {
    $(errctrl).html(errorsym + msg);
    $("#myModal").modal();
    HideLoad();
    return false;
}