(function ($) {
	"use strict";



	var flip1 = function () {
		var myswitch = $(this);
		var show = myswitch[0].selectedIndex == 1 ? true : false;

		if (show) {
			$("#historyRemarques").insertAfter("#ttest");   
			$('#historyRemarques').show();

		} else {
			$("#historyRemarques").insertAfter("#historyPicture");   

			$('#historyRemarques').hide();
		}
	};

	var flip2 = function () {
		var myswitch = $(this);
		var show = myswitch[0].selectedIndex == 1 ? true : false;

		if (show) {
			$("#historyPicture").insertAfter("#ttest");   
			$('#historyPicture').show();

		} else {
			$("#historyPicture").insertAfter("#historyRemarques");   

			$('#historyPicture').hide();
		}
	};

	var flip3 = function () {
		var myswitch = $(this);
		var show = myswitch[0].selectedIndex == 1 ? true : false;

		if (show) {
			$("#historySize").insertAfter("#ttest");   

			$('#historySize').show();

		} else {
			$("#historySize").insertAfter("#historyRemarques");   

			$('#historySize').hide();
		}
	};

	$(document).on("ready", function () {
		$('#flip-1').on('change', flip1);
		$('#flip-2').on('change', flip2);
		$('#flip-3').on('change', flip3);

	});

}
)(jQuery);

