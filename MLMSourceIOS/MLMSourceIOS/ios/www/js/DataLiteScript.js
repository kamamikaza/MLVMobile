
var resInsertAccount = "";
function insertAccount(mcode, fullname) {
    try {
        //alert(mcode + ' ' + mobileToken);
        var db = window.sqlitePlugin.openDatabase({ name: $DatabaseName });
       
        db.transaction(function (tx) {
            // tx.executeSql("DROP TABLE IF EXISTS tblUserAccess;");
            tx.executeSql("PRAGMA table_info (tblUserAccess);", [],
                             function (tx, results) {
                                 //alert("PRAGMA res: " + JSON.stringify(results));
                          
                                 if (results.rows.length == 0) {
                                     // no table
                                     tx.executeSql("DROP TABLE IF EXISTS tblUserAccess;");
                                     tx.executeSql("CREATE TABLE IF NOT EXISTS tblUserAccess (id integer primary key, mcode text, password text, fullname text, token text);");
                                 }
                          
                           ///// Check mcode ////
                                if(mcode != ""){
                                     //
                                     db.transaction(function (tx) {
                                         tx.executeSql("DELETE FROM tblUserAccess;"); // Clear table
                                         tx.executeSql("INSERT INTO tblUserAccess (mcode, password, fullname, token) VALUES ('" + mcode + "','','" + fullname + "','" + mobileToken + "')", [],
                                             function (tx, results) {
                                                 //alert("Count Rows : " + results.rows.item(0).cnt);
                                                 //alert(" Row lenght = " + results.rows.length);
                                                 //var _fullName = "";
                                                 if (results.rows.length == 0) {
                                                     tx.executeSql("SELECT mcode, fullname, token FROM tblUserAccess WHERE mcode = '" + mcode + "'", [], function (tx, res) {

                                                         for (var i = 0; i < res.rows.length; i++) {
                                                             row = res.rows.item(i);
                                                             ///alertMsgDevice("your Token :  " + row.token, " ");
                                                             mobileMcode = row.mcode;
                                                             mobileFullname = row.fullname;
                                                             mobileToken = row.token;
                                                           
                                                         }

                                                         //alert(res.rows.item(0).mcode);
                                                         if (res.rows.item(0).mcode == mcode) {
                                                             
                                                             resInsertAccount =  "true";
                                                         }
                                                         else {
                                                             resInsertAccount =  "false";
                                                         }

                                                         switch (resInsertAccount.toString().toLowerCase()) {
                                                             case "true":
                                                                   MLMApp.params.swipePanel = 'left'; //to enable menu
                                                                   navigator.notification.alert("" + mobileFullname,  // message
                                                                           gotoMainPage,         // callback
                                                                           "ยินดีต้อนรับ",            // title
                                                                           'ตกลง'                  // buttonName
                                                                           );
                                                                 //var mainPage = "media-lists.html";
                                                                 //mainView.loadPage(mainPage);
                                                                 break;
                                                             case "false":
                                                                 alertMsgDevice("ไม่พบข้อมูลสมาชิก กรุณาลองอีกครั้ง...");
                                                                 return false;
                                                                 break;
                                                             case "":
                                                                 alertMsgDevice("Your Connection Error.");
                                                                 return false;
                                                                 break;
                                                         }
                                                         
                                                     });
                                                       }


                                             });
                                     }, errorInsertAccount, successInsertAccount);
                          }
                          
                             });
        }, errorInsertAccount, null);

       
    }
    catch (err) {
        resInsertAccount = "false";
        alert("Error insert account : " + err.message.toString());
    }


}


// Transaction error callback
function errorInsertAccount(err) {
    return "false";
}
// Success error callback
function successInsertAccount() {

    //return resInsertAccount;
}

function loadDatabase() {
    //head.load("MainScript.js", function () {
    //alertMsgDevice("LoadDatabase");
    //});


}

function insertTable() {

}


function selectTable() {

}

// Transaction error callback
function errorCB(err) {
    alertMsg("Erroressing SQL: " + err.code);
}
// Success error callback
function successCB() {
    alertMsg('Success DB');
}