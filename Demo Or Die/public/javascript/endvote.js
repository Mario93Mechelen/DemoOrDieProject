$(document).ready(function(){	
primus = Primus.connect("", {
  reconnect: {
      max: Infinity // Number: The max delay before we try to reconnect.
    , min: 500 // Number: The minimum delay before we try reconnect.
    , retries: 10 // Number: How many times we should try to reconnect.
  }
});

var ids=[];
primus.on("data", function(data) {
  console.log(data);
    $('.btn__endvote').on("click", function() {
	window.location.href = "http://localhost:3000/admin/users";
    $.ajax({
        method: "post",
        url: "http://localhost:3000/endvoting",
        data: {message:"hallo"}
    }).done(function(response) {
         primus.write( {message:response} );
    })
    });
});


    
})