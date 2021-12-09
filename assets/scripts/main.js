$( document ).ready(async function() {
    await $("html, body").animate({ scrollTop: 0 }, "slow");
	await $.ajax({
		success: function(response) {
			$('#loader').addClass("animate__animated animate__fadeOut animate__delay-09s");
			setTimeout(() => {
					$('#loader').addClass("hidden");
			}, 1000)
		},
		error: function(xhr, status) {
			$('#loader').addClass("animate__animated animate__fadeOut animate__delay-05s");
			setTimeout(() => {
					$('#loader').addClass("hidden");
			}, 1000)
			$('#logo').addClass("animate__animated animate__jackInTheBox");
			$(`<h1 class="font-bold text-center m-10 text-1xl">Bir sorun var gibi gözüküyor..<br/>Lütfen <a class="text-gray-900" href="https://discord.com/users/280696584889696257" target="_blank">efe#1234</a> ile iletişime geçin</h1>`);
		}
	})
});


function renderTime() {
  var currentTime = new Date();
  var diem = "AM";
  var h = currentTime.getHours();
  var m = currentTime.getMinutes();
  var s = currentTime.getSeconds();
  setTimeout('renderTime()',1000);
  if (h == 0) {
      h = 12;
  } else if (h > 12) { 
      h = h - 12;
      diem="PM";
  }
  if (h < 10) {
      h = "0" + h;
  }
  if (m < 10) {
      m = "0" + m;
  }
  if (s < 10) {
      s = "0" + s;
  }
  var myClock = document.getElementById('clockDisplay');
  myClock.textContent = + h + ":" + m + ":" + s + " " + diem;
  myClock.innerText =   + h + ":" + m + ":" + s + " " + diem;
  }
  renderTime();
  
function myFunction() {
	// Get the snackbar DIV
	var x = document.getElementById("snackbar");
  
	// Add the "show" class to DIV
	x.className = "show";
  
	// After 3 seconds, remove the show class from DIV
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  let wsu = new WebSocket('wss://api.lanyard.rest/socket');
  let Intervalu;
     wsu.onopen = () => {
       wsu.send(
         JSON.stringify({
           op: 2,
           d: {
             subscribe_to_id: "280696584889696257",
          },
         })
       );
       Intervalu = setInterval(() => {
         wsu.send(
           JSON.stringify({
             op: 3,
           })
         );
       }, 3000);
     };
    wsu.onmessage = (msgu) => {
       msgu = JSON.parse(msgu.data);
       if (!['INIT_STATE', 'PRESENCE_UPDATE'].includes(msgu.t)) return;
         let useru = msgu.d;
         $("#avatar7").html(`<img src="https://cdn.discordapp.com/avatars/301049890925182979/${useru.discord_user.avatar}.gif" style="height: 200px; width: 200px;">                                                 
          <div class="team-hover text-center">
              <i class="fa fa-male"></i>
              <p>`+useru.discord_user.username+"#"+useru.discord_user.discriminator+`</p>
          </div>`
          );
  };
