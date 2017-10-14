(function ($) {
	"use strict";



	var createText = function () {
		$("#email1").val("lberthod@gmail.com");
		
		var nomClient = $("#nom").val();
		var prenomClient = $("#prenom").val();
		var telClient = $("#tel").val();
		var mailClient = $("#mail").val();
	
		var body = 'The client : ' + prenomClient + ' ' + nomClient + '<br> Contact: <br>Telephone : ' + telClient + '<br>E-mail : ' + mailClient ;
		$("#bodyMail").val(body);

	};



	$(document).on("ready", function () {
		$('#confirm').on('click', createText);





	});

	$(document).on("deviceready", function () {
		StatusBar.overlaysWebView(false);
		StatusBar.backgroundColorByName("gray");
	});

}
)(jQuery);