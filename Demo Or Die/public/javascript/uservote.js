$(document).ready(function(){	
primus = Primus.connect("", {
  reconnect: {
      max: Infinity // Number: The max delay before we try to reconnect.
    , min: 500 // Number: The minimum delay before we try reconnect.
    , retries: 10 // Number: How many times we should try to reconnect.
  }
});
primus.on("data", function(data) {
	console.log(data);
	ids = data.message;
	voteID = data.vote;
  if( data.message != undefined ) {
	 for(i=0; i<data.message.length; i++){
      $.ajax({
            type: "POST",
            url: "http://localhost:3000/"+data.message[i],
            data: {message: "redirect"}
		}).done(function(response){
            if(response=="success"){
				window.location.href = "http://localhost:3000/vote_now/"+data.vote;
			}
        });
	 }
  }
});	
})