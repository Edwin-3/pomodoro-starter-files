window.addEventListener('load', () => {
    const stopwatchIcon = document.querySelector('.pomodoro-timer');
    const pomodoroDisplay = document.querySelector('.pomodoro-timer p');
    const cover = document.querySelector('.cover');
    const originalCoverHTML = cover.innerHTML;
    let isStopwatchVisible = false;
    let isClockRunning = false;

    const stopwatchContainer = document.createElement('div');
    stopwatchContainer.classList.add('stopwatch_container');
    stopwatchContainer.innerHTML = `
    <div class="timer">
        <div class="button-group mode-buttons" id="js-mode-buttons">
            <button
                data-mode="work"
                class="button active mode-button"
                id="js-work"
            >
                Work
            </button>
            <button
                data-mode="break"
                class="button mode-button"
                id="js-break"
            >
                break
            </button>
            <button
                data-mode="rest"
                class="button mode-button"
                id="js-rest"
            >
                Rest
            </button>
        </div>
        <div class="clock" id="js-clock">
        <div id="pomodoro-timer"></div>
        </div>
        <button class="main-button" data-action="start" id="js-btn">
        Start
        </button>
    </div>
    <div class="hidden">
      <audio src="backtowork.mp3" data-sound="pomodoro"></audio>
      <audio src="break.mp3" data-sound="shortBreak"></audio>
      <audio src="break.mp3" data-sound="longBreak"></audio>
    </div>
  `;

    stopwatchIcon.addEventListener('click', function () {
        isStopwatchVisible = !isStopwatchVisible;
        if (isStopwatchVisible) {
            // Remove the cover div and everything inside it
            cover.innerHTML = '';
            // Add the new stopwatch div to the cover div
            cover.appendChild(stopwatchContainer);
            initializeStopWatch();
        } else {
            cover.innerHTML = '';
            cover.innerHTML = originalCoverHTML;
        }
    });

    function initializeStopWatch() {
        // in seconds = 25 mins
        let workSessionDuration = 150;
        let currentTimeLeftInSession = 150;

        // in seconds = 5 mins;
        let breakSessionDuration = 300;
        let interval;

        const mainButton = document.getElementById('js-btn');
        mainButton.addEventListener('click', () => {
            const { action } = mainButton.dataset;
            if (action === 'start') {
                toggleClock();
            } else {
                stopClock();
            }
        });

        const toggleClock = (reset) => {
            if (reset) {
                // STOP THE TIMER
                stopClock();
            } else {
                if (isClockRunning === true) {
                    // PAUSE THE TIMER
                    clearInterval(clockTimer);
                    isClockRunning = false;
                } else {
                    // START THE TIMER
                    console.log("nice")
                    isClockRunning = true;
                    clockTimer = setInterval(() => {
                        displayCurrentTimeLeftInSession();
                    }, 1000)
                }
            }
        }
        const stopClock = () => {
            // 1) reset the timer we set
            clearInterval(clockTimer)
            // 2) update our variable to know that the timer is stopped
            isClockRunning = false
            // reset the time left in the session to its original state
            currentTimeLeftInSession = workSessionDuration
            // update the timer displayed
            displayCurrentTimeLeftInSession()

        }

        const displayCurrentTimeLeftInSession = () => {
            console.log("displaytime")
            const pomodoroTimer = document.querySelector('#pomodoro-timer');
            const secondsLeft = currentTimeLeftInSession;
            let result = '';
            const seconds = secondsLeft % 60;
            const minutes = parseInt(secondsLeft / 60) % 60;
            let hours = parseInt(secondsLeft / 3600);
            // add leading zeroes if it's less than 10
            function addLeadingZeroes(time) {
                return time < 10 ? `0${time}` : time
            }
            if (hours > 0) result += `${hours}:`
            result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
            pomodoroTimer.innerText = result.toString();
            pomodoroDisplay.innerText = result.toString();

        }

        const modeButtons = document.querySelector('#js-mode-buttons');
        modeButtons.addEventListener('click', handleMode);

        function handleMode(e) {
            const { mode } = e.target.dataset;

            if (!mode) return;
        }

    }

})