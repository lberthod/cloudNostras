(function ($) {
    "use strict";
	
	alert("OKK");	


    var addition = function () {
        var num1 = Number($('#num1').val());
        var num2 = Number($('#num2').val());
        var resu = num1 + num2;

        $('#res').text(resu);
    };

    var substract = function () {
        var num1 = Number($('#num1').val());
        var num2 = Number($('#num2').val());
        var resu = num1 - num2;

        $('#res').text(resu);
    };

    var checkVilla = function () {
        if ($('#checkbox-villa').is(':checked')) {
            $('#infoVilla').show();
        }
        else {
            $('#infoVilla').hide();
        }
    };

    var checkAppartement = function () {
        if ($('#checkbox-appartement').is(':checked')) {
            $('#infoAppartement').show();
        }
        else {
            $('#infoAppartement').hide();
        }
    };

    var checkTerrain = function () {
        if ($('#checkbox-terrain').is(':checked')) {
            $('#infoTerrain').show();
        }
        else {
            $('#infoTerrain').hide();
        }
    };

    var checkConstruire = function () {
        if ($('#checkbox-villa').is(':checked')) {
            $('#infoConstruire').show();
        }
        else {
            $('#infoConstruire').hide();
        }
    };


    var facebook = function () {
        var shareurl = $(this).data('shareurl');
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + escape(shareurl) + '&t=' + document.title, '',
        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
        return false;
    };


    var handleSocialShare = function handleSocialShare() {
        $('#select-choice-share option:selected').each(function () {
            var text = "Immotri - trouve l'immobilier que tu veux ";
            var url = "https://www.facebook.com/lberthod";

            var shareService = $(this).val();
        

            switch (shareService) {
                case "facebook":
                    shareFacebookLike(url);
                    break;
                case "twitter":
                    shareTwitter(url, text);
                    break;
                case "email":
                    shareEmail(text, url);
                    break;
                default:

            }
        });

        function shareFacebookLike(url) {
            window.location = "http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
        }

        function shareEmail(subject, body) {
            window.location = "mailto: " + "?subject=" + subject + "&body=" + 'Visite ce lien, ca vaut la peine! %0D%0A ' + body;
        }
    }


    $(document).on("ready", function () {
        $('#addition').on('click', addition);
        $('#substract').on('click', substract);
        $('#checkbox-villa').on('click', checkVilla);
        $('#checkbox-appartement').on('click', checkAppartement);
        $('#checkbox-terrain').on('click', checkTerrain);
        $('#checkbox-construire').on('click', checkConstruire);
        $('#fbsharelink').on('click', facebook);
        $('#select-choice-share').on('change', handleSocialShare);

    });

}
)(jQuery);