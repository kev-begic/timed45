
// 10 minutes from now
let timeMinutes = 45.15;
let currentTime = Date.parse(new Date());
let deadline = new Date(currentTime + timeMinutes*60*1000);

function timeRemaining(endtime)
{
	let total = Date.parse(endtime) - Date.parse(new Date());
	let seconds = Math.floor( (total/1000) % 60 );
	let minutes = Math.floor( (total/1000/60) % 60 );
    
	return {
        'total': total, 
        'minutes': minutes, 
        'seconds': seconds
    };
}

let timeInterval;

function run(id, endtime) 
{
    if (deadline == 0)
    {
        clearInterval(timeInterval); 
        endtime = 0;
    }

    let clock = document.getElementById(id);
    
	function update(){
        let timeLeft = timeRemaining(endtime);
        
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


let paused = false; // is the clock paused?
let timeLeft; // time left on the clock when paused
let playersLeft = 7;

if (deadline != 0) 
{
    if (playersLeft > 0)
    {
        run('clockdiv', deadline);
    }
}

document.getElementById("players-left").innerHTML = playersLeft;

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
            document.getElementById('clockdiv').style.backgroundColor = "#181F38";
            document.getElementById('clockdiv').style.opacity = "0.8";


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
            document.getElementById('clockdiv').style.backgroundColor = "#fff";

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
