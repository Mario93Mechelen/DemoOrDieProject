$(document).ready(function(){
    
    // lijst met users vullen vanuit database
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
	
    
    // bij selecteren van een course uit de dropdown
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
    
    // bij typen van naam in veld "find a user"
    $("#findUser").on('keyup', function() {
        
        var partName = $('#findUser').val();
        var option = $('#selectClass option:selected').val();
        
        console.log(partName);
        console.log(option);
        
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
    
    //password vragen indien leraar en anders password input verbergen
	$('input[type=radio][name=role]').on('change',function(){
        
		var role = $(this).attr('value');
        
		if(role=='Teacher'){
			$('.password').slideDown();
		} else {
			$('.password').slideUp();
		}
        
	});
	
    // weghalen van course
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

    // sorteerknoppen
	$('.btn__sort').on('click', function(e){
        
	    var option = $('#selectClass option:selected').val();
    	var partName = $('#findUser').val();
        
        $.ajax({
            type: "POST",
            url: "/admin/users",
            data: {option: option, partName: partName}
		}).done(function(response){
		//This will sort your array
            function SortByName(a, b){
                  var aName = a.name.toLowerCase();
                  var bName = b.name.toLowerCase(); 
                  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            }
            response.sort(SortByName);
            
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
                //This will sort your array
                function SortByScore(a, b){
                      var aScore = a.demo/(a.demo+a.die);
                      var bScore = b.demo/(b.demo+b.die);
                      return ((aScore > bScore) ? -1 : ((aScore < bScore) ? 1 : 0));
                }
                response.sort(SortByScore);
                
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

