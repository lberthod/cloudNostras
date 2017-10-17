(function ($) {
	"use strict";



	var flip1 = function () {
		var myswitch = $(this);
		var show = myswitch[0].selectedIndex == 1 ? true : false;

		if (show) {
			$("#historyRemarques").insertAfter("#ttest");   
			$('#historyRemarques').css('visibility', 'visible');

		} else {
			$("#historyRemarques").insertAfter("#historyStep");   

			$('#historyRemarques').css('visibility', 'hidden');
		}
	};

	var flip2 = function () {
		var myswitch = $(this);
		var show = myswitch[0].selectedIndex == 1 ? true : false;

		if (show) {
			$("#historyStep").insertAfter("#ttest");   
			$('#historyStep').css('visibility', 'visible');

		} else {
			$("#historyStep").insertAfter("#historyRemarques");   

			$('#historyStep').css('visibility', 'hidden');
		}
	};

	var flip3 = function () {
		var myswitch = $(this);
		var show = myswitch[0].selectedIndex == 1 ? true : false;

		if (show) {
			$("#historySize").insertAfter("#ttest");   

			$('#historySize').css('visibility', 'visible');

		} else {
			$("#historySize").insertAfter("#historyRemarques");   

			$('#historySize').css('visibility', 'hidden');
		}
	};



	$(document).on("ready", function () {
		$('#flip-1').on('change', flip1);
		$('#flip-2').on('change', flip2);
		$('#flip-3').on('change', flip3);



	});

}
)(jQuery);

