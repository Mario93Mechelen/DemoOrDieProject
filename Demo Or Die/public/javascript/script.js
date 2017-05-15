$(document).ready(function(){
    
    var option = $('#selectClass option:selected').val();
    var partName = $('#findUser').val();
    $.ajax({
            type: "POST",
            url: "/admin/users",
            data: {option: option, partName: partName}
		}).done(function(response){
            for(i=0; i<response.length; i++){
				$('.users').append('<a class="profileLink" href="profile/'+response[i]._id+'" value="'+response[i].onStage+'"><div class="users__user" style="background-image:url('+response[i].profilepic+');" id="'+response[i]._id+'"><p>'+response[i].name+'</p></div></a>');
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
            url: "/admin/users",
            data: {option: option, partName: partName}
		}).done(function(response){
            for(i=0; i<response.length; i++){
				$('.users').append('<a class="profileLink" href="profile/'+response[i]._id+'" value="'+response[i].onStage+'"><div class="users__user" style="background-image:url('+response[i].profilepic+');" id="'+response[i]._id+'"><p>'+response[i].name+'</p></div></a>');
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
				$('.users').append('<a class="profileLink" href="profile/'+response[i]._id+'" value="'+response[i].onStage+'"><div class="users__user" style="background-image:url('+response[i].profilepic+');" id="'+response[i]._id+'"><p>'+response[i].name+'</p></div></a>');
			}
        });
        
    });
    
	$('input[type=radio][name=role]').on('change',function(){
		var role = $(this).attr('value');
		if(role=='Teacher'){
			$('.password').slideDown();
		}else{
			$('.password').slideUp();
		}
	});
	
	$('.btn_delete').on('click', function(){
		var course = $(this).attr('id');
		$.ajax({
			method:'post',
			url:'/addcourse',
			data:{deletecourse:course}
		}).done(function(response){
			if(response=='success'){
			window.location.href = "/addcourse";
			}
		});
	});

	$('.btn__sort').on('click', function(e){
	    var option = $('#selectClass option:selected').val();
    	var partName = $('#findUser').val();
    $.ajax({
            type: "POST",
            url: "/admin/users",
            data: {option: option, partName: partName}
		}).done(function(response){
		var second = 1;
		for(i=0; i<response.length; i++){
		var firstInArr = response[i];
		var secondInArr = response[i+1];
			if(firstInArr.name>secondInArr.name){
				response[i] = secondInArr;
				response[i+1] = firstInArr
			}else{
				response[i]=firstInArr;
				response[i+1]=secondInArr;
			}
			second++;
			if(second==response.length){
				break;
			}
		}
		$('.profileLink').remove();
		$('.users__user').remove();
		console.log(response);
            for(i=0; i<response.length; i++){
				$('.users').append('<a class="profileLink" href="profile/'+response[i]._id+'" value="'+response[i].onStage+'"><div class="users__user" style="background-image:url('+response[i].profilepic+');" id="'+response[i]._id+'"><p>'+response[i].name+'</p></div></a>');
			}
        });
		e.preventDefault();
	});
	
		$('.btn__sortscore').on('click', function(e){
	    var option = $('#selectClass option:selected').val();
    	var partName = $('#findUser').val();
    $.ajax({
            type: "POST",
            url: "/admin/users",
            data: {option: option, partName: partName}
		}).done(function(response){
		var second = 1;
		for(i=0; i<response.length; i++){
		var firstInArr = response[i];
		var secondInArr = response[i+1];
		var firstQuota = firstInArr.demo/(firstInArr.demo+firstInArr.die);
		var secondQuota = secondInArr.demo/(secondInArr.demo+secondInArr.die);
			console.log(firstQuota, secondQuota);
			if(firstQuota>secondQuota){
				response[i] = secondInArr;
				response[i+1] = firstInArr
			}else{
				response[i]=firstInArr;
				response[i+1]=secondInArr;
			}
			second++;
			if(second==response.length){
				break;
			}
		}
		$('.profileLink').remove();
		$('.users__user').remove();
		console.log(response);
           for(i=0; i<response.length; i++){
				$('.users').append('<a class="profileLink" href="profile/'+response[i]._id+'" value="'+response[i].onStage+'"><div class="users__user" style="background-image:url('+response[i].profilepic+');" id="'+response[i]._id+'"><p>'+response[i].name+'</p></div></a>');
			}
        });
		e.preventDefault();
	});
    
});

