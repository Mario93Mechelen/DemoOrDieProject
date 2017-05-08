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
});

document.querySelector(".btn__startvote").addEventListener("click", function(e) {
	var ids = [];
	$('.users a.profileLink').each(function () {
  		var href = $(this).attr('href');
		var onStage = $(this).attr('value');
		if(onStage=='false'){
		ids.push(href);
		}
	});
	if (ids.length>1){
	var voteID = ids[Math.floor(Math.random()*ids.length)];
	}else{
		voteID = ids[0];
	}
    primus.write( {message:ids,vote:voteID} );
    e.preventDefault();
});
})