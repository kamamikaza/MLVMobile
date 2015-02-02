
/// Declare Variable
var $loadTextDefault = "กรุณารอสักครู่";
var $statusCallWSDL = "";
var $DatabaseName = "pageupcloud_MLM_DB_2014.db";

//'// Golbal Var'
var $URI;
//$URI = "http://192.168.2.19/MLV-WS/"; // PC Local
$URI = "http://pageupcloud.com/MLVWS/"; // production
//$URI = "http://192.168.1.42/MLV-WS/"; //VMWare Dev

var $wsPrefix = $URI + "MLMWService2014.asmx";
var interval;
var xmlMedia;
var $resItemsListMedia;


/// Golbal popup ///
var popupConnectionError = '<div class="popup pop-noConnection">' +
    '<div class="view navbar-fixed"> ' +
    '<div class="page">' +
    '<div class="navbar">' +
    '<div class="navbar-inner">' +
    '<div class="center">Connect Server</div>' +
    '<div class="right"><a href="#" class="link close-popup">ตกลง</a></div>' +
    '</div>' +
    '</div>' +
    '<div class="page-content">' +
    '<div class="content-block" style="font-size:20px;text-align:center;"> ' +
    'You Are Not Connected to the Internet.' +
    '<div style="padding-top:30px;padding-buttom:20px;" ><img src="img/Connectivity-Error.png" style="max-width:60.2201%;height:auto;" /></div>' +
    'ไม่สามารถติดต่อระบบอินเตอร์เน็ต' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

var popupOccurError = '<div class="popup pop-Death">' +
    '<div class="view navbar-fixed"> ' +
    '<div class="page">' +
    '<div class="navbar">' +
    '<div class="navbar-inner">' +
    '<div class="center">Occur error App !!</div>' +
    '<div class="right"><a href="#" class="link close-popup">ตกลง</a></div>' +
    '</div>' +
    '</div>' +
    '<div class="page-content">' +
    '<div class="content-block"> ' +
    'Error... Issue was stuck in the script line, please contact App-Developer... (_ _") ' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

///////////

/// Framework core
var MLMApp = new Framework7({
    modalTitle: 'Alert Message!!',
    animateNavBackIcon: true,
    pushState: true,
    swipePanel: 'left',
    swipeBackPage: false,
    swipePanelActiveArea: 50,
    swipeBackPanelActiveArea : 500
});

// Export selectors engine
var $$ = Framework7.$;

// Add main view
var mainView = MLMApp.addView('.view-main', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true
});
mainView.loadPage('../index.html');
/// Ready
//$(function () { MLMApp.showPreloader($loadTextDefault); });

//// Functional 
function alertMsg(context)
{
    MLMApp.hidePreloader();
    alertApp.alert('' + context.toString());
    return false;
}


function alertMsgDevice(context, title) {
    MLMApp.hidePreloader();
    try{
        if (title.toString().lenght == 0 || title == null || title == undefined) {
            title = 'แจ้งเตือนสมาชิก!!';
        }
    }
    catch (err) {
        title = 'แจ้งเตือนสมาชิก!!';
    }
    navigator.notification.alert(    context.toString(),  // message
                                     alertDismissed,         // callback
                                     title,            // title
                                     'ตกลง'                  // buttonName
                                     );

}

function hideKeyboard() {
    document.activeElement.blur();
    return true;
}




//// Global function ///

function popDeathShow() {
    try {
        MLMApp.popup(popupOccurError);
        MLMApp.hidePreloader();
        hideKeyboard();
        return false;
    } catch (err) {
        alert(err.message.toString());
    }

}


function callbackFail(callParam) {
    try {
        checkConnection();
        if ($checkNet == true) {

            switch (callParam.toUpperCase().toString()) {
                case "FAIL":
                    popDeathShow();
                    break;
                case "":
                    popDeathShow();
                    break;
            }
        } else {
            return false;
        }
    } catch (err) {
        alert(err.message.toString());
    }

}


////////
