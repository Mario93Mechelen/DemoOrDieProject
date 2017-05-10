$(document).ready(function(){
    
    var option = $('#selectClass option:selected').val();
    var partName = $('#findUser').val();
    $.ajax({
            type: "POST",
            url: "http://localhost:3000/admin/users",
            data: {option: option, partName: partName}
		}).done(function(response){
            for(i=0; i<response.length; i++){
				$('.users').append('<a class="profileLink" href="profile/'+response[i]._id+'" value="'+response[i].onStage+'"><div class="users__user" style="background-image:url('+response[i].profilepic+');" id="'+response[i]._id+'"></div>');
			}
        });
	
    
    // select a group
	$('#selectClass').on('change',function(){
        var partName = $('#findUser').val();
		var option = $('#selectClass option:selected').val();
		$('.profileLink').remove();
		$('.users__user').remove();
		$.ajax({
            type: "POST",
            url: "http://localhost:3000/admin/users",
            data: {option: option, partName: partName}
		}).done(function(response){
            for(i=0; i<response.length; i++){
				$('.users').append('<a class="profileLink" href="profile/'+response[i]._id+'" value="'+response[i].onStage+'"><div class="users__user" style="background-image:url('+response[i].profilepic+');" id="'+response[i]._id+'"></div>');
			}
        });

	});
    
    $("#findUser").on('keyup', function() {
        var partName = $('#findUser').val();
        var option = $('#selectClass option:selected').val();
        console.log(partName);
        console.log(option);
        $('.profileLink').remove();
		$('.users__user').remove();
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/admin/users",
            data: {option: option, partName: partName}
		}).done(function(response){
            for(i=0; i<response.length; i++){
				$('.users').append('<a class="profileLink" href="profile/'+response[i]._id+'" value="'+response[i].onStage+'"><div class="users__user" style="background-image:url('+response[i].profilepic+');" id="'+response[i]._id+'"></div>');
			}
        });
        
    });
    
    
});

