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
            window.location.href = "/admin/users";
                 primus.write( {message:"redirectUser"} );
            $.ajax({
                method:'post',
                url:'/endvoting',
                data:{user:"reset"}
            }).done(function(response){
                console.log(response);
            })
        });

        if(data.demo!=undefined){

            var demo = data.demo;
            var die = data.die;
            var message ="";

            $('.bg-statusdie').height(die+'%');
            $('.bg-statusdemo').height(demo+'%');

            if (demo == 0 && die == 0) {
                    demo = 50;
                    die = 50;
                    message = "You have not been on stage yet";
             } else {

                 if (demo >= die) {
                  message = demo + "% demo";
                 } else {
                  message = die + "% die";
                 }

             }

            console.log(message);
            $('.header-title').html(message);
        }
    });

})