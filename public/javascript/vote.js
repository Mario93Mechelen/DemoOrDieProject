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
	if(data.demo!=undefined){
		var demo = data.demo;
		var die = data.die;
		$('#demo').attr('value',demo);
		$('#die').attr('value',die);
	}
	});
	$(".btn").on('click',function(){
		var vote = $(this).attr('id');
		var id = $(".id").attr('id');
		var voteDemo = $("#demo").attr('value');
		var voteDie = $("#die").attr('value');
		$.ajax({
			method:'post',
			url:"http://localhost:3000/admin/endvoting/profile/"+id,
			data:{vote:vote,id:id, voteDemo:voteDemo, voteDie: voteDie}
		}).done(function(response){
			if(response){
				var demo = parseInt(response);
				var die = 100 - demo;
				primus.write( {demo:demo,die:die} );
				window.location.href = "http://localhost:3000/vote_result/"+id+"/"+vote;
			}
		});
	});
});