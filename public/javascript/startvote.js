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
	var stageIds = [];
	var ids = [];
	$('.users a.profileLink').each(function () {
  		var href = $(this).attr('href');
		var onStage = $(this).attr('value');
		if(onStage=='false'){
		stageIds.push(href);
		console.log(href);
		}
		ids.push(href);
	});
	console.log(stageIds);
	if(stageIds.length>0){
	if (stageIds.length>1){
	var voteID = stageIds[Math.floor(Math.random()*stageIds.length)];
		console.log(voteID);
		primus.write( {message:ids,vote:voteID} );
	}else{
		voteID = stageIds[0];
		primus.write( {message:ids,vote:voteID} );
	}
	}else{
		$('.warning').append(`<p>This user has already done a demo or die session</p>`).slideDown();
		voteID = 'Done';
	}
    e.preventDefault();
});
})