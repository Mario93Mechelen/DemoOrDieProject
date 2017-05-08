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
		var vote = $(this).attr('value');
		var id = $(".id").attr('id');
		$.ajax({
			method:'post',
			url:"http://localhost:3000/admin/endvoting/profile/"+id,
			data:{vote:vote,id:id}
		}).done(function(response){
			if(response=="success"){
				window.location.href = "http://localhost:3000/vote_result/"+id+"/"+vote;
			}
		});
	});
});