window.showDate = function(str, callback) {
    cordova.exec(callback, function(err) {
                 callback('Nothing to echo.');
                 }, "PhoneGapPlugin", "cordovaGetCurrentDate", [str]);}

window.getParamSecure = function(str,callback){
    cordova.exec(callback,function(err){
                 callback('');
                 },"PhoneGapPlugin","cordovaGetSecureCode",[str]);
}

window.getTon = function(str,callback){
    cordova.exec(callback,function(err){
                 callback('');
                 },"PhoneGapPlugin","cordovaTon",[str]);
}

window.getTokenDevice = function(str,callback){
    cordova.exec(callback,function(err){
                 callback('');
                 },"PhoneGapPlugin","GetTokenDevice",[str]);
}


/*
var PhoneGapPlugin = {
    
callNativeFunction: function (success, fail, resultType) {
    return Cordova.exec(success, fail, "PhoneGapPlugin", "cordovaTon", [resultType]);
}
};
 */

