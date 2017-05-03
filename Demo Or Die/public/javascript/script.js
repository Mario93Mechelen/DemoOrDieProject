$(document).ready(function(){
	// select a group
	$('.select__field').on('change',function(){
		var option = $('.select__field option:selected').val();
		$('.profileLink').remove();
		$('.users__user').remove();
		$.ajax({
            type: "POST",
            url: "http://localhost:3000/admin/users",
            data: {option: option}
		}).done(function(response){
            for(i=0; i<response.length; i++){
				$('.users').append('<a class="profileLink" href="profile/'+response[i]._id+'"><div class="users__user" style="background-image:url('+response[i].profilepic+');" id="'+response[i]._id+'"></div>');
			}
        });

	});
	
});