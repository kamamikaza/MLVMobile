
/// Login ///
$$('.loginApp').on('click', function () {

    //alert(mobileApp);
    if (mobileApp == false) { // PC browser
        //alert('PC');
        gotoMainPage();
    } else {
        // Only mobile
        loginPage();
    }



});


function gotoMainPage() {
    
    var mainPage = "main-page.html";/// "media-lists.html";
    mainView.loadPage(mainPage);
}

MLMApp.onPageInit('login-screen', function () {
    $$('.loginApp').on('click', function () {

        // Only mobile
        loginPage();

    });


});

function loginPage() {


    try {
        checkConnection();
        if ($checkNet == true) {
            /// Check Access
            var pathWS = $wsPrefix + "/GetAccessAccount";
            var mcode = $("input#txtUserName").val();
            var pwd = $("input#txtPassword").val();
            if (mcode.toString().length <= 0 || pwd.toString().length <= 0) {
                alertMsgDevice("กรุณาระบุข้อมูลของท่าน ให้ถูกต้อง...");
                return false;
            }
            else {

                hideKeyboard();

                MLMApp.showPreloader($loadTextDefault);
                $.ajax({
                    type: "POST",
                    url: pathWS,
                    data: "{'paramSecure':'" + mobilePasskey + "','mcode':'" + mcode + "','password':'" + pwd + "','token':'" + mobileToken + "','device':'" + mobileDeviceType + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccessLogin,
                    failure: function (response) {
                        callbackFail("");
                        //alert("Failure : " + response.d);
                    },
                    error: function (response) {
                        callbackFail("");
                        //alert("Error : " + response.d);
                    }
                });
            }

        }
        else {
            MLMApp.popup(popupConnectionError);
            return false;
        }
    } catch (e) {
        alertApp.alert("เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่...");
    }

}



var resDB = "";

function OnSuccessLogin(response) {

    var $resItemsLogin;
    try {
        var res = response.d.toString();
        //alert(res);
        if (parseInt(res.length) > 10) {
            var xmlDoc = $.parseXML(response.d.toString());
            try {
                var xml = $(xmlDoc);
                $resItemsLogin = xml.find("userAccess");
                //alert($resItemsLogin)
                var fullname = ""
                var mcode = "";
                $.each($resItemsLogin, function () {
                    fullname = $(this).find("fullname").text();
                    mcode = $(this).find("mcode").text();

                });
                if (mcode == "" || fullname == "") {
                    resDB = "false";
                }
                else {
                    //alert('Insert Account');
                    insertAccount(mcode, fullname);
                    $("p.fullname").html(fullname)
                    // alert("1 >> " + resDB);
                }


            }
            catch (err) {
                alertMsgDevice("Load Data Error : " + err.message.toString());

            }
        }
        else {
            alertMsgDevice("ไม่พบข้อมูลสมาชิก กรุณาลองอีกครั้ง...");

        }

    }
    catch (err) {
        alertMsgDevice("Error Login : " + err.message.toString());
    }


    MLMApp.hidePreloader();
}

/// Feedsback init ///
MLMApp.onPageInit('feedsback-page', function () {

    var $FeedbackArr = [];
    var mcodeDoc = "001";
    var nameDoc = "เอกเดชา ตันสุวรรณกิจ";
    var _hScreen = $(window).height();
    //alert(_hScreen.toString());
    $('#txtFeedsBack').height(_hScreen - 200);
    $$('.send-feedback').on('click', function () {


        try {
            //alertMsgDevice("feedback");
            var msgFeedsBack = $$("#txtFeedsBack").val().toString();//.escapeSingleQuotes();
            if (msgFeedsBack == "") {
                alertMsgDevice("กรุณาพิมพ์ข้อความของท่าน !!");
            } else {


                checkConnection();
                if ($checkNet == true) {

                    MLMApp.showPreloader($loadTextDefault);
                    var pathWS = $wsPrefix + "/InsertFeedback";
                    $FeedbackArr = [];
                    $FeedbackArr.push({
                        messageFeedback: msgFeedsBack
                    });

                    $.ajax({
                        type: "POST",
                        url: pathWS,
                        data: JSON.stringify({
                            paramSecure: mobilePasskey,
                            mcode: mcodeDoc,
                            message: msgFeedsBack,
                            name: nameDoc
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: OnSuccessInsertFeedBack,
                        failure: function (response) {
                            callbackFail("");
                            //alertMsgDevice("Failure : " + response.d);
                        },
                        error: function (response) {
                            callbackFail("");
                            //alertMsgDevice("Error : " + response.d);
                        }
                    });

                    interval = setInterval(function () {
                        clearInterval(interval);
                        MLMApp.hidePreloader();
                    }, 6000);


                } else {
                    MLMApp.popup(popupConnectionError);
                    return false;
                }

            }
        }
        catch (err) {
            alert('Error : ' + err.message.toString());
        }


    });

    function OnSuccessInsertFeedBack(response) {
        $statusCallWSDL = response.d.toString();
        if ($statusCallWSDL == "true") {
            alertMsgDevice("ส่งข้อความเรียบร้อย", "Send Successfully");
            $$("#txtFeedsBack").val("");
        }
        else {
            callbackFail($statusCallWSDL);
        }

    }

});

/// Document Upload init ///
MLMApp.onPageInit('document-upload', function () {

    /// Load data and images
    var mcodeDoc = "001";
    var qtyDoc = 80;
    /// Pixel for letter ///
    var twDoc = 612;
    var thDoc = 792;
    var typeDoc = "";

    /// Popup Document
    var popupDocument = '';


    $(function () {

        loadImageList();
        /*($$('div.containerUpload'), function (instance) {
            console.log('all images are loaded');
        });*/

    });

    /// Set loaded ///
    $(document).delegate('div.camera_shot_01', 'load', function () {
        alert('SSN Loaded');
    });

   $("#SSN").load(function () { alert('SSN DONE'); });

    function loadImageList() {
       /// MLMApp.showPreloader($loadTextDefault);

        var pathWS = $wsPrefix + "/GetDocument";
        $.ajax({
            type: "POST",
            url: pathWS,
            data: "{'paramSecure':'" + mobilePasskey + "','mcode':'" + mcodeDoc + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessDocument,
            failure: function (response) {
                callbackFail("");
                alert("Failure : " + response.d);
            },
            error: function (response) {
                callbackFail("");
                alert("Error : " + response.d);
            }
        });

        interval = setInterval(function () {
            clearInterval(interval);
            MLMApp.hidePreloader();
        }, 3000);
    }

    function OnSuccessDocument(response) {

        $statusCallWSDL = response.d.toString();
        callbackFail($statusCallWSDL);

        var $resItemsDocument;
        var xmlDocList = $.parseXML(response.d);
        try {
            var xml = $(xmlDocList);
            $resItemsDocument = xml.find("SelectData_Document");

            /////alert(response.d.toString());
            $.each($resItemsDocument, function () {
                var cam;
                var imageFile = $(this).find("fileName").text();
                var typeDocx = $(this).find("typeDocument").text();
                var displayDoc = "<p>+</p>";
                switch (typeDocx.toString().toUpperCase()) {
                    case "SSN":
                        $("div.containerUploading[typeDoc='SSN']").show();
                        cam = $$("div.camera_shot_01");
                        displayDoc = '<img id="' + typeDocx.toString().toUpperCase() + '" class="document-popup" typeDoc="' + typeDocx.toString().toUpperCase() + '" title="บัตรประชาชน" src="' + $URI + 'uploads/' + imageFile + '" style="width:100%;" />';
                        cam.html("");
                        cam.html(displayDoc);

                        var imgLoad = imagesLoaded("#SSN");
                        imgLoad.on('done', function (instance) {
                            $("div.containerUploading[typeDoc='SSN']").fadeOut(500);
                        });
                    
                        break;
                    case "ADDRESS":
                        $("div.containerUploading[typeDoc='ADDRESS']").show();
                        cam = $$("div.camera_shot_02");
                        displayDoc = '<img id="' + typeDocx.toString().toUpperCase() + '" class="document-popup" typeDoc="' + typeDocx.toString().toUpperCase() + '" title="ทะเบียนบ้าน" src="' + $URI + 'uploads/' + imageFile + '" style="width:100%;" />';
                        cam.html("");
                        cam.html(displayDoc);

                        var imgLoad = imagesLoaded("#ADDRESS");
                        imgLoad.on('done', function (instance) {
                            $("div.containerUploading[typeDoc='ADDRESS']").fadeOut(500);
                        });

                        break;
                    case "ACCOUNT":
                        $("div.containerUploading[typeDoc='ACCOUNT']").show();
                        cam = $$("div.camera_shot_03");
                        displayDoc = '<img id="' + typeDocx.toString().toUpperCase() + '" class="document-popup" typeDoc="' + typeDocx.toString().toUpperCase() + '" title="เลขบัญชี" src="' + $URI + 'uploads/' + imageFile + '" style="width:100%;" />';
                        cam.html("");
                        cam.html(displayDoc);
                   
                        var imgLoad = imagesLoaded("#ACCOUNT");
                        imgLoad.on('done', function (instance) {
                            $("div.containerUploading[typeDoc='ACCOUNT']").fadeOut(500);
                        });
 
                        break;
                    case "PHOTO":
                        $("div.containerUploading[typeDoc='PHOTO']").show();
                        cam = $$("div.camera_shot_04");
                        displayDoc = '<img id="' + typeDocx.toString().toUpperCase() + '" class="document-popup" typeDoc="' + typeDocx.toString().toUpperCase() + '" title="รูปสมาชิก" src="' + $URI + 'uploads/' + imageFile + '" style="width:100%;" />';
                        cam.html("");
                        cam.html(displayDoc);

                        var imgLoad = imagesLoaded("#PHOTO");
                        imgLoad.on('done', function (instance) {
                            $("div.containerUploading[typeDoc='PHOTO']").fadeOut(500);
                        });

                        break;

                }

            });

        }
        catch (err) {

            alertMsgDevice("Load Media List Error : " + err.message.toString());
            
        }
                  
         MLMApp.hidePreloader();

    }
    function popupDocumentViewer() {
        MLMApp.popup($(".pop-documents"));
    }

    //$$("document-popup").on("click", function () {
    $(document).delegate('img.document-popup', 'click', function () {
        popupDocumentViewer();

        var popDoc = $(".pop-documents");
        var linkImage = $(this).attr("src");
        var titleImage = $(this).attr("title");
        var typeDocEdit = $(this).attr("typeDoc");
        popDoc.find("div.left").html('<a href="#" class="link close-popup edit-document" typeDoc="' + typeDocEdit + '" >แก้ไข</a>');
        popDoc.find("div.center").html(titleImage);
        popDoc.find("div#viewsTest img").attr("src", linkImage);
        /*var popupDocument = '<div class="popup pop-document"> ' +
        '<div class="view navbar-fixed">' +
        '<div class="page"> ' +
        '<div class="navbar"> ' +
        '<div class="navbar-inner"> ' +
        '<div class="left"><a href="#" class="link close-popup edit-document" typeDoc="' + typeDocEdit + '" >แก้ไข</a></div>' +
        '<div class="center">' + titleImage + '</div> ' +
        '<div class="right"><a href="#" class="link close-popup">ย้อนกลับ</a></div>' +
        '</div> ' +
        '</div> ' +
        '<div class="page-content"> ' +
        '<div id="imageDoc" style="width:100%;">' +
        '<img class="document-render" src="' + linkImage + '" style="width:100%;-webkit-transform:translate3d(0,0,0);" />' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '</div> '
        '</div>'
        MLMApp.popup(popupDocument);
         */


    });

    $(document).delegate('a.edit-document', 'click', function () {
        checkConnection();
        if ($checkNet == true) {
            typeDoc = $(this).attr("typeDoc");
            MLMApp.showPreloader($loadTextDefault);
            /// Opener Camera //
            navigator.camera.getPicture(uploadPhoto, function (message) {
                //alert('get picture failed');
                MLMApp.hidePreloader();
            },
           {
               quality: qtyDoc,
               destinationType: navigator.camera.DestinationType.FILE_URI,
               //destinationType : navigator.camera.DestinationType.DATA_URL,
               //sourceType : navigator.camera.PictureSourceType.CAMERA,
               //sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
               //allowEdit : true,
               encodingType: navigator.camera.EncodingType.JPEG,
               targetWidth: twDoc,
               targetHeight: thDoc
               //destinationType: navigator.camera.DestinationType.FILE_URI
               //, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
           });

        } else {
            MLMApp.popup(popupConnectionError);
            return false;
        }

    });
    //

    $$('div[class*=camera_shot_]').on('click', function () {
        checkConnection();
        if ($checkNet == true) {

            var lenImage = ($(this).html()).toString().length;
            typeDoc = $(this).attr("typeDoc");
            if (lenImage <= 50) {
                /// Opener Camera //
                MLMApp.showPreloader($loadTextDefault);
                navigator.camera.getPicture(uploadPhoto, function (message) {
                    //alert('get picture failed');
                    MLMApp.hidePreloader();
                },
               {
                   quality: qtyDoc,
                   destinationType: navigator.camera.DestinationType.FILE_URI,
                   //destinationType : navigator.camera.DestinationType.DATA_URL,
                   sourceType : navigator.camera.PictureSourceType.CAMERA,
                   //sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                   //allowEdit : true,
                   encodingType: navigator.camera.EncodingType.JPEG,
                   targetWidth: twDoc,
                   targetHeight: thDoc

                   
               });
            }
        } else {
            MLMApp.popup(popupConnectionError);
            return false;
        }



    });

    function uploadPhoto(imageURI) {
        MLMApp.showPreloader($loadTextDefault);

        var mcode = mcodeDoc;
        var options = new FileUploadOptions();
        options.chunkedMode = false;
        options.fileKey = "Filedata";// "Filedata"; //"recFile";
        options.fileName = mcode + "_" + typeDoc + "_" + imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";

        var params = new Object();
        params.mcode = mcode;
        params.paramSecure = mobilePasskey;
        params.typeDoc = typeDoc;
        options.params = params;

        var ft = new FileTransfer();
        ft.upload(imageURI, $URI + "UploadVB.ashx", win, fail, options);
                  
                  var loadingImage = $("div.containerUploading[typedoc='" + typeDoc + "']");
                  //loadingImage.addClass("spinner");
                  //loadingImage.html('<div id="overlay" class="spinner"></div>');
                  /*
                  // Get image handle
                  //
                  var imgProfile = document.getElementById('imgProfile');
                  
                  // Show the captured photo
                  // The inline CSS rules are used to resize the image
                  //
                  imgProfile.src = imageURI;
                
                  if(sessionStorage.isprofileimage == 1){
                    getLocation();
                  }
                  
                  movePic(imageURI);
                   */
    }
                  
                  
                 /*
                  function movePic(file){
                  window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError);
                  }
                  
                  //Callback function when the file system uri has been resolved
                  function resolveOnSuccess(entry){
                  var d = new Date();
                  var n = d.getTime();
                  //new file name
                  var newFileName = n + ".jpg";
                  var myFolderApp = "MyAppFolder";
                  
                  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
                                           //The folder is created if doesn't exist
                                           fileSys.root.getDirectory( myFolderApp,
                                                                     {create:true, exclusive: false},
                                                                     function(directory) {
                                                                     entry.moveTo(directory, newFileName,  successMove, resOnError);
                                                                     },
                                                                     resOnError);
                                           },
                                           resOnError);
                  }
                  
                  //Callback function when the file has been moved successfully - inserting the complete path
                  function successMove(entry) {
                  //Store imagepath in session for future use
                  // like to store it in database
                  sessionStorage.setItem('imagepath', entry.fullPath);
                  }
                  
                  function resOnError(error) {
                  alert(error.code);
                  }
*/
                  

    function win(r) {
        //alert("Sent = " + r.bytesSent + " / " + r.response);
        alertMsgDevice("ส่งเรียบร้อยแล้ว", "Upload Successfully");
        loadImageList();

    }

    function fail(error) {
        MLMApp.hidePreloader();

        switch (error.code) {
            case FileTransferError.FILE_NOT_FOUND_ERR:
                alert("Photo file not found");
                break;
            case FileTransferError.INVALID_URL_ERR:
                alert("Bad Photo URL");
                break;
            case FileTransferError.CONNECTION_ERR:
                alert("Connection error");
                break;
        }

        alert("An error has occurred: Code = " + error.code);
    }

});
/// Location ///
MLMApp.onPageInit('location-page', function (page) {



    $(function () {
        try {
            //var map = new GoogleMap();
            //map.initialize();

            MLMApp.showPreloader($loadTextDefault);

            interval = setInterval(function () {
                clearInterval(interval);
                MLMApp.hidePreloader();
            }, 3000);

        }
        catch (err) {
            //alert('Err = ' + err.message.toString());
        }

        // alert('location');
    });



});

///// News Main page ////
MLMApp.onPageInit('main-page', function (page) {



    // Pull to refresh content
    var ptrContent = $$(page.container).find('.pull-to-refresh-content');
    // Add 'refresh' listener on it
    ptrContent.on('refresh', function (e) {
        // Emulate 2s loading
        setTimeout(function () {
           
            getDataTopicList();
            MLMApp.pullToRefreshDone();
        }, 3000);
    });

    $(function () {
        MLMApp.showPreloader($loadTextDefault);
        getDataTopicList();
    });


    function getDataTopicList() {
        try {
           
            var pathWS = $wsPrefix + "/getTopicList";
            $("div.topicList-pushMessage").empty();
            $.ajax({
                type: "POST",
                url: pathWS,
                data: "{'paramSecure':'" + mobilePasskey + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    ////alert(response.d.toString());
                    var $resItems;
                    var content;
                    var xmlList = $.parseXML(response.d);
                    var xml = $(xmlList);

                    /// Items ///
                    var topicID;
                    var topicHead;
                    var topicImage;
                    var topicDate;
                    var topicList = "";
                    $resItems = xml.find("SelectData_topicList");

                    $.each($resItems, function () {
                        topicID = $(this).find("topicId").text();
                        topicHead = $(this).find("topic").text();
                        topicImage = $(this).find("topicImage").text();
                        topicDate = $(this).find("topicDatetime").text();
                    

                        topicList += '<div id="main-frame" topic="' + topicID + '">' +
                                    '<div style="width:100%;text-align:center;padding-bottom: 5px;padding-top:10px;">' +
                                    '<center>' +
                                    '<div id="content-date"> ' +
                                    topicDate +
                                    '</div>' +
                                    '</center> ' +
                                    '</div>' +
                                    '<div id="box">' +
                                    '<div id="content-top">' +
                                    '<img src="' + $URI + 'topicImages/' + topicImage + '" style="width:100%;" />' +
                                    '<div id="topic-header"> ' +
                                    topicHead +
                                    '</div>' +
                                    '</div>' +
                                    '<div id="help-box-outer"> ' +
                                    '<div id="help-box-inner"> ' +
                                    '</div>' +
                                    '<div class="content-code">อ่านต่อ</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>';
                    
                    });
                    $("div.topicList-pushMessage").html(topicList);
                    //alertMsgDevice(topicContent);
                },
                failure: function (response) {
                    callbackFail("");
                    //alert("Failure : " + response.d);
                },
                error: function (response) {
                    callbackFail("");
                    //alert("Error : " + response.d);
                }
            });

            interval = setInterval(function () {
                clearInterval(interval);
                MLMApp.hidePreloader();
            }, 3000);

        }
        catch (err) {
            //alert('Err = ' + err.message.toString());
        }

    }

        $(document).delegate('#main-frame', 'click', function () {
            try {

                MLMApp.showPreloader($loadTextDefault);
                var topicID = $(this).attr("topic").toString();
                var topicHead;// = $(this).find("div#topic-header").html();
                var pathWS = $wsPrefix + "/getTopic";
                $.ajax({
                    type: "POST",
                    url: pathWS,
                    data: "{'paramSecure':'" + mobilePasskey + "','topicId':'" + topicID + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {

                        //alert(response.d.toString());
                        var $resItems;
                        var content;
                        var xmlList = $.parseXML(response.d);
                        var xml = $(xmlList);
                        $resItems = xml.find("SelectData_topic");

                        $.each($resItems, function () {
                            topicHead = $(this).find("topic").text();
                            content = $(this).find("topicContent").text();
                        });

                        var popupNewsTipoc = '<div class="popup pop-News">' +
                        '<div class="view navbar-fixed"> ' +
                        '<div class="page">' +
                        '<div class="navbar">' +
                        '<div class="navbar-inner">' +
                        '<div>' + topicHead + '</div>' +
                        '<div class="left"><a href="#" class="close-popup"><img src="img/gtk_close.png" style="width:30px;height:30px;"/></a></div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="page-content">' +
                        '<div class="content-block"> ' +
                        content.toString() +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                        MLMApp.popup(popupNewsTipoc);
                        //alertMsgDevice(topicContent);
                    },
                    failure: function (response) {
                        callbackFail("");
                        //alert("Failure : " + response.d);
                    },
                    error: function (response) {
                        callbackFail("");
                        //alert("Error : " + response.d);
                    }
                });

                interval = setInterval(function () {
                    clearInterval(interval);
                    MLMApp.hidePreloader();
                }, 3000);
           
            }
            catch (err) {
                alertMsgDevice("Error load content. " + err.message.toString());
            }

        });
    });

    //// Youtube Channel ///
    MLMApp.onPageInit('channel-list', function (page) {

        var listClipvdo = $("ul#list-clipvdo");
        var templateListVDO = "";
        var rowNumberVdo;
        $(function () {

            checkConnection();
            if ($checkNet == true) {

                //$(window).bind("load", function () { alert('DONE'); });
                //alert(mobilePasskey);
                MLMApp.showPreloader($loadTextDefault);
                try {
                    //alert(xmlMedia.toString()); 

                    if (listClipvdo.length < 10) {
                        var pathWS = $wsPrefix + "/GetClipVDO";
                        $.ajax({
                            type: "POST",
                            url: pathWS,
                            data: "{'paramSecure':'" + mobilePasskey + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: OnSuccessResponse,
                            failure: function (response) {
                                callbackFail("");
                                alert("Failure : " + response.d);
                            },
                            error: function (response) {
                                callbackFail("");
                                alert("Error : " + response.d);
                            }
                        });

                        interval = setInterval(function () {


                            if (document.readyState === "complete") {
                                /*
                                initialized – Has not started loading yet
                                loading – Is loading
                                interactive – Has loaded enough and the user can interact with it
                                complete – Fully loaded
                                */
                                //alert('DONE')
                                clearInterval(interval);
                                //MLMApp.hidePreloader();
                            }
                        }, 5000);

                        var intervalImg;
                        var rowTmploop = 0;
                        intervalImg = setInterval(function () {
                            setTimeout(function () {
                                $('img[data-src]').each(function () {
                                    $(this).attr('src', $(this).data('src'));
                                    rowTmploop += 1;
                                });
                            }, 500);

                            if (rowTmploop >= rowNumberVdo) {
                                MLMApp.hidePreloader();
                                clearInterval(intervalImg);
                                //alert($('img[data-src]').length);
                            }
                        }, 1000);

                    }
                }
                catch (err) {
                    alert(err.message.toString());
                }
            } else {
                MLMApp.popup(popupConnectionError);
                return false;
            }
        });

        $(window).bind("load", function () {
            //alert("ddd");
        });



        function OnSuccessResponse(response) {

            var _vdoRowNumber = $("div.vdoRowNumber");

            $statusCallWSDL = response.d.toString();
            callbackFail($statusCallWSDL);

            xmlMedia = $.parseXML(response.d);
            try {
                var xml = $(xmlMedia);
                rowNumberVdo = 0;
                $resItemsListMedia = xml.find("SelectData_ClipVDO");
                //alert($resItemsListMedia)
                $.each($resItemsListMedia, function () {
                    var code = $(this).find("idcode").text();
                    var topic = $(this).find("topic").text();
                    var content = $(this).find("content").text();
                    var pathImage = $(this).find("PathImage").text();
                    var groupTopic = $(this).find("groupTopic").text();
                    rowNumberVdo += 1;

                    templateListVDO = "<a href='#' class='item-link item-content youtube-popup' idcode='" + code + "'>" +
                    "<div class='item-media'>" +
                    "<img src='img/blank.png' data-src='http://i4.ytimg.com/vi/" + code + "/default.jpg' style='background: #EEEEEE; width:100px;background-image:url(img/blank.png); background-position:center;background-repeat:no-repeat;' />" +
                    //"<iframe style=' background: #EEEEEE;' src='https://www.youtube.com/embed/" + code + "?loop=1&amp;autohide=1' allowfullscreen='' frameborder='0' height='80' width='80'></iframe>" +
                    "</div>" +
                    "<div class='item-inner'>" +
                    "<div class='item-title-row'>" +
                    "<div class='item-title'>" + topic + "</div>" +
                    //"<div class='item-after'>Watch</div>" +
                    "</div>" +
                    "<div class='item-subtitle'>" + groupTopic + "</div>" +
                    "<div class='item-text'>" + content + "</div>" +
                    "</div></a>"
                    var list_li = $("<li>", {
                        html: templateListVDO
                    });

                    setTimeout(function () {

                        //$(list_li).hide().prependTo(listClipvdo).slideDown("slow");
                        listClipvdo.append(list_li);
                    }, 200);

                    //listClipvdo.append(list_li).slideDown();
                    //$('ul#list-clipvdo li:last').slideDown();

                    //list_li.slideDown();

                });


                _vdoRowNumber.html(rowNumberVdo.toString() + " vdo");



                ////MLMApp.hidePreloader();
            }
            catch (err) {
                _vdoRowNumber.html("Error load vdo");
                //alert("Load Media List Error : " + err.message.toString());
            }

        }

        //$$('.youtube-popup').on('click', function () {
        $(document).delegate('.youtube-popup', 'click', function () {
            MLMApp.showPreloader("กำลังโหลด VDO");

            var code = $(this).attr("idcode").toString();
            var topic = "";
            var postDate = "";
            var content = "";
            $.each($resItemsListMedia, function () {
                if ($(this).find("idcode").text() == code) {
                    topic = $(this).find("topic").text();
                    content = $(this).find("content").text();
                    postdate = $(this).find("postdate").text();
                }

            });
            var popupHTML = "<div class='popup'>" +
                             
                             "<div class='navbar'>" +
                             "<div class='navbar-inner'>" +
                             "<div class='center sliding'>"  + topic + "</div>" +
                             "<div class='right'><a href='#' class='close-popup'><img src='img/gtk_close.png' style='width:30px;height:30px;'/></a></div>" +
                             "</div>" +
                             "</div>" +

                             "<div style='height:5px;'></div>" +
                                                    "<div class='content-block' style='margin-top:3px;'>" +
                                                    "<div class='item-title' style='font-size:20px;'>" +
                                                    //"<span style='padding-left:10px;font-size:10px;'>(" + postdate + ")</span>" +
                                                    "</div>" +
                                                    "<div style=' background: #EEEEEE;'>" +
                                                    "<iframe width='100%' height='50%' src='http://www.youtube.com/embed/" + code + "?autoplay=1&loop=1&autohide=1' frameborder='0' allowfullscreen></iframe>" +
                                                    "</div>" +
                                                    "<p>" + content + "</p>" +
                                                    //"<a href='http://www.youtube.com/v/" + code + "?version=3&enablejsapi=1' target='_blank'>OPEN</a>" +
                                                    "<br><br><div style='height=50px;width:100%;'></div>" +
                                                    "<center><a href='#' class='close-popup button'>ย้อนกลับ</a></center>" +
                                                    "</div>" +
                                                    "</div>";
            MLMApp.popup(popupHTML);

            interval = setInterval(function () {
                clearInterval(interval);
                MLMApp.hidePreloader();
            }, 5000);

        });


    });

    ////////
