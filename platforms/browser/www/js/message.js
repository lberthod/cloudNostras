(function ($) {
	"use strict";



	var createText = function () {

		$("#email1").val("lberthod@gmail.com");

			

	};


	$(document).on("ready", function () {
		$('#submit').on('click', createText);





	});

	$(document).on("deviceready", function () {
		StatusBar.overlaysWebView(false);
		StatusBar.backgroundColorByName("gray");
	});

}
)(jQuery);