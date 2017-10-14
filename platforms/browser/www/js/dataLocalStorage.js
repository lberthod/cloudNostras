(function($) {
    "use strict";
	
	
    $( document ).on( "ready", function(){
        $('#save').on('click', save);
		$('#verfiLocalStorage').on('click', verfiLocalStorage);


   
    });

    $( document ).on( "deviceready", function(){
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByName("gray");
    });

    // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        window.localStorage.setItem("key", "value");
        var keyname = window.localStorage.key(i);
        // keynacme is now equal to "key"
        var value = window.localStorage.getItem("key");
        // value is now equal to "value"
        window.localStorage.removeItem("key");
        window.localStorage.setItem("key2", "value2");
        window.localStorage.clear();
        // localStorage is now empty
    }
	
	    var save = function() {
		var nameVar = $('#name').val();
        localStorage.name =   nameVar;     
		var descriptionVar = $('#description').val();
        localStorage.description =   descriptionVar;     

		var resName = localStorage.name + ' ' + localStorage.description;

        $('#localStore').text(resName);
    };
	
		var verfiLocalStorage = function() {

		var verifName = localStorage.name + ' ' + localStorage.description;

        $('#localStoreVerif').text(verifName);
    };

}
)(jQuery);