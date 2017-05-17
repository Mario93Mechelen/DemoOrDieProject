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
		});
	$(".btn").on('click',function(){
        
		var vote = $(this).attr('id');
		var id = $(".id").attr('id');
		var voteDemo = $("#demo").attr('value');
		var voteDie = $("#die").attr('value');
		console.log(voteDemo+"/"+voteDie);
		$.ajax({
			method:'post',
			url:"/admin/endvoting/profile/"+id,
			data:{vote:vote,id:id, voteDemo:voteDemo, voteDie: voteDie}
		}).done(function(response){
			if(response){
				console.log(response);
				var demo = parseInt(response.substring(0,response.indexOf('/')));
				var die = parseInt(response.substring(response.indexOf('/')+1,response.length));
				var total = demo + die;
    			var demoPercentage = demo / total * 100;
    			demoPercentage = Math.round(demoPercentage);
				var diePercentage = 100 - demoPercentage;
				primus.write( {demo:demoPercentage,die:diePercentage, numdemo: demo, numdie: die, update:"update"} );
				console.log(demo);
				console.log(die);
				window.location.href = "/vote_result/"+id+"/"+vote;
			}
		});
        
	});
    
});