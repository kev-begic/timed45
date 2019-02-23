
// 10 minutes from now
var timeMinutes = 45;
var currentTime = Date.parse(new Date());
var deadline = new Date(currentTime + timeMinutes*60*1000);

function timeRemaining(endtime)
{
	var total = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (total/1000) % 60 );
	var minutes = Math.floor( (total/1000/60) % 60 );
    
	return {
        'total': total, 
        'minutes': minutes, 
        'seconds': seconds
    };
}

var timeInterval;

function run(id, endtime) 
{
    if (deadline == 0)
    {
        clearInterval(timeInterval); 
        endtime = 0;
    }

    var clock = document.getElementById(id);
    
	function update(){
        var timeLeft = timeRemaining(endtime);
        
        if (timeLeft.seconds < 10)
        {
            clock.innerHTML = timeLeft.minutes + ':0' + timeLeft.seconds;
        }
        else
        {
            clock.innerHTML = timeLeft.minutes + ':' + timeLeft.seconds;
        }
        
        if (playersLeft <= 0)
        {
            clock.innerHTML = "Winner!";
        }

        if (timeLeft.total <= 0)
        { 
            clearInterval(timeInterval); 
        }
    }
    
	update(); // run function once at first to avoid delay
	timeInterval = setInterval(update, 1000);
}


var paused = false; // is the clock paused?
var timeLeft; // time left on the clock when paused
var playersLeft = 7; // 

if (deadline != 0 && playersLeft > 0) 
{
    run('clockdiv', deadline);
}

function pauseClock()
{
    if (!paused) 
    {
		paused = true;
		clearInterval(timeInterval); // stop the clock
        timeLeft = timeRemaining(deadline).total; // preserve remaining time
        console.log(timeRemaining(deadline).minutes + ':' + timeRemaining(deadline).seconds);
	}
}

function resumeClock()
{
    if (paused)
    {
		paused = false;

		// update the deadline to preserve the amount of time remaining
		deadline = new Date(Date.parse(new Date()) + timeLeft);

		// start the clock
		run('clockdiv',deadline);
	}
}

document.getElementById('pause').onclick = pauseClock;
document.getElementById('resume').onclick = resumeClock;


document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        if (paused)
        {
            resumeClock();
            --playersLeft;
            if (playersLeft <= 0)
            {
                deadline = 0;
                document.getElementById('paused').innerHTML = "Final Survivor! <br> You Have Won Timed 45!"
                document.getElementById('paused').style.color = '#fff';
                document.getElementById('paused').style.fontSize = "100px";

                document.getElementById('clockdiv').innerHTML = "Winner!";
                document.getElementById('clockdiv').style.color = '#f4d975e3';
                document.getElementById('clockdiv').style.borderColor = '#f4d975e3';
                
                document.getElementById('text-secondary').style.color = '#f4d975e3';

                document.getElementById('rules').style.display = "none";
                document.getElementById('how').style.display = "none";

            }
            else
            {
                document.getElementById('paused').innerHTML = "Next Round Begins! Players Left: " + playersLeft;
                document.getElementById('paused').style.color = '#f4d975e3';

                document.getElementById('clockdiv').style.color = '#f4d975e3';
                document.getElementById('clockdiv').style.borderColor = '#f4d975e3';

                document.getElementById('text-secondary').style.color = '#f4d975e3';
            }
        }
        else
        {
            pauseClock();

            if (playersLeft <= 0)
            {
                document.getElementById('paused').innerHTML = "Final Survivor! <br> You Have Won Timed 45!"
                deadline = 0;
                document.getElementById('clockdiv').innerHTML = "Winner!";
            }

            else
            {
                document.getElementById('paused').innerHTML = "Timer Has Been Paused! <br>";
                document.getElementById('paused').style.color = '#e23d3de3';
                document.getElementById('clockdiv').innerHTML = "PAUSED!";
                document.getElementById('clockdiv').style.color = '#e23d3de3';
                document.getElementById('clockdiv').style.borderColor = '#e23d3de3';
                document.getElementById('text-secondary').style.color = '#e23d3de3';
            }

        }
    }
}
