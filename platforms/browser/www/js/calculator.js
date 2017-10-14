(function($) {
    "use strict";

alert("CALC");

    var addition = function() {
        var num1 = Number( $('#num1').val() );
		var num2 = Number( $('#num2').val() );
		var resu = num1 + num2 ;

        $('#res').text(resu);
    };
	
	    var substract = function() {
        var num1 = Number( $('#num1').val() );
		var num2 = Number( $('#num2').val() );
		var resu = num1 - num2 ;

        $('#res').text(resu);
    };


    

    $( document ).on( "ready", function(){
        $('#addition').on('click', addition);
		$('#substract').on('click', substract);

   
    });

    $( document ).on( "deviceready", function(){
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByName("gray");
    });

}
)(jQuery);