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

document.querySelector(".btn__endvote").addEventListener("click", function(e) {
	console.log ("endvote toets geklikt en primus verstuurd");
    e.preventDefault();
});
})