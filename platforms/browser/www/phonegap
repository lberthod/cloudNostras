$('#Addcar').on('click', function() {
    if($(this).html()=='Add') {
        $(this).html('Remove');
        var tot = parseFloat($('#TotalAmount').val()) + parseFloat($('#QuoteAmount').val());
        var totcan = parseFloat($('#Cancelation').val()) + 2;
        $('#TotalPrice').val(tot);
        $('#Cancelation').val(totcan);
        $('#Cancel').html(totcan);        
    } else {
        $(this).html('Add');
        var tot = parseFloat($('#TotalPrice').val()) - parseFloat($('#QuoteAmount').val());
        var totcan = parseFloat($('#Cancelation').val()) - 2;
        $('#TotalPrice').val(tot);
        $('#Cancelation').val(totcan);
        $('#Cancel').html(totcan);
    }
});

$('#Cancelation').change(function(){
    if($(this).is(':checked')){
        total = parseFloat($('#TotalPrice').val()) + Number($(this).val());
    } else {
        total = parseFloat($('#TotalPrice').val()) - Number($(this).val());
    }
    $('#TotalPrice').val(total);
});


	
		$(document).ready(function() {
			$("#but1").click(function(){
			
				$('p.res').text("total");

			}
});