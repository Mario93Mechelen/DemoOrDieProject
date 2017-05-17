$(document).ready(function(){	
    primus = Primus.connect("", {
          reconnect: {
              max: Infinity // Number: The max delay before we try to reconnect.
            , min: 500 // Number: The minimum delay before we try reconnect.
            , retries: 10 // Number: How many times we should try to reconnect.
          }
    });
    
    primus.on("data", function(data) {
			   console.log(data)
   	if(data.update!=undefined && data.update=="update" && data.numdemo!=undefined && data.numdie!=undefined){
	$('#demo').attr('value', data.numdemo);
	$('#die').attr('value', data.numdie);
	}
            if(data.message=="redirectUser"){
                var id = $('.myID').attr('id');
                window.location.href = "/profile/"+id;
            }
    });	
})