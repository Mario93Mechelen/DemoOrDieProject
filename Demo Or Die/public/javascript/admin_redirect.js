$(document).ready(function(){	
primus = Primus.connect("", {
  reconnect: {
      max: Infinity // Number: The max delay before we try to reconnect.
    , min: 500 // Number: The minimum delay before we try reconnect.
    , retries: 10 // Number: How many times we should try to reconnect.
  }
});


primus.on("data", function(data) {
  if( data.message != undefined ) {
			window.location.href = "/admin/endvoting/"+data.vote;
	 }
});
})