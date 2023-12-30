window.addEventListener('load', () => {
    // Selecting necessary DOM elements
    const stopwatchIcon = document.querySelector('.pomodoro-timer');
    const cover = document.querySelector('.cover');
    const originalCoverHTML = cover.innerHTML;
    let isStopwatchVisible = false;

    // Creating the stopwatch container dynamically
    const stopwatchContainer = document.createElement('div');
    stopwatchContainer.classList.add('stopwatch_container');
    stopwatchContainer.innerHTML = `
    <div class="timer">
        <div class="button-group mode-buttons" id="js-mode-buttons">
            <button
                data-mode="work"
                class="button active mode-button"
                id="js-pomodoro"
            >
                Work
            </button>
            <button
                data-mode="break"
                class="button mode-button"
                id="js-short-break"
            >
                Break
            </button>
            <button
                data-mode="rest"
                class="button mode-button"
                id="js-long-break"
            >
                Rest
            </button>
        </div>
        <div class="clock" id="js-clock">
            <span id="js-minutes">25</span>
            <span class="separator">:</span>
            <span id="js-seconds">00</span>
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

    // Listening to StopWatch icon click
    stopwatchIcon.addEventListener('click', function () {
        // Toggle visibility of the stopwatch container
        isStopwatchVisible = !isStopwatchVisible;
        if (isStopwatchVisible) {
            // Remove the cover div and everything inside it
            cover.innerHTML = '';
            // Add the new stopwatch div to the cover div
            cover.appendChild(stopwatchContainer);
            // Initialize the stopwatch
            initializeStopWatch();
        } else {
            // If the stopwatch is not visible, restore the original content
            cover.innerHTML = '';
            cover.innerHTML = originalCoverHTML;
        }

    });

    function initializeStopWatch() {
        // Timer configuration object
        const timer = {
            mode: 'work',
            work: '25',
            break: '5',
            rest: '15',
            restInterval: 4,
            remainingTime: {
                total: 25 * 60,
                minutes: 25,
                seconds: 0,
            },
        };

        let interval;

        // Start button click event listener
        const mainButton = document.getElementById('js-btn');
        mainButton.addEventListener('click', () => {
            const { action } = mainButton.dataset;
            if (action === 'start') {
                startTimer();
            } else {
                stopTimer();
            }
        });

        // Mode buttons click event listener
        const modeButtons = document.querySelector('#js-mode-buttons');
        modeButtons.addEventListener('click', handleMode);

        // Function to handle mode button clicks
        function handleMode(e) {
            const { mode } = e.target.dataset;
            console.log('Mode:', mode)

            if (!mode) return;

            switchMode(mode);
            stopTimer();
        }

        // Function to switch between work, break, and rest modes
        function switchMode(mode) {
            timer.mode = mode;

            // Convert timer[mode] to a number explicitly
            const modeDuration = parseInt(timer[mode], 10);
            console.log(modeDuration)
            timer.remainingTime = {
                total: modeDuration * 60,
                minutes: modeDuration,
                seconds: 0,
            };

            document.querySelectorAll('button[data-mode]')
                .forEach(e => e.classList.remove('active'));

            const modeButton = document.querySelector(`[data-mode="${mode}"]`);
            if (modeButton) {
                modeButton.classList.add('active');
            }

            document.body.style.backgroundColor = `var(--${mode})`;

            updateClock();
        }

        function getRemainingTime(endTime) {
            const currentTime = Date.parse(new Date());
            const difference = endTime - currentTime;

            const total = Number.parseInt(difference / 1000, 10);
            const minutes = Number.parseInt((total / 60) % 60, 10);
            const seconds = Number.parseInt(total % 60, 10);

            return {
                total,
                minutes,
                seconds,
            };
        }

        function startTimer() {
            let { total } = timer.remainingTime;
            const endTime = Date.parse(new Date()) + total * 1000;

            mainButton.dataset.action = 'stop';
            mainButton.textContent = 'stop';
            mainButton.classList.add('active');

            interval = setInterval(function () {
                timer.remainingTime = getRemainingTime(endTime);
                updateClock();

                total = timer.remainingTime.total;
                if (total <= 0) {
                    clearInterval(interval);
                }
            }, 1000);
        }

        function stopTimer() {
            clearInterval(interval);

            mainButton.dataset.action = 'start';
            mainButton.textContent = 'start';
            mainButton.classList.remove('active');
            // updatePomodoroDisplay("25", "00");

        }

        function updateClock() {
            const { remainingTime } = timer;
            const minutes = String(remainingTime.minutes).padStart(2, '0');
            const seconds = String(remainingTime.seconds).padStart(2, '0');
            const min = document.getElementById('js-minutes');
            console.log('Min:', min);
            const sec = document.getElementById('js-seconds');
            console.log('Sec:', sec)
            min.textContent = minutes;
            sec.textContent = seconds;

            updatePomodoroDisplay(minutes, seconds);

        }

        document.addEventListener('DOMContentLoaded', () => {
            switchMode('pomodoro');
        });

        function updatePomodoroDisplay(minutes, seconds) {
            // Update the pomodoro-timer display
            const pomodoroDisplay = document.querySelector('.pomodoro-timer p');
            console.log('minutes::', minutes);
            pomodoroDisplay.textContent = `${minutes}:${seconds}`;
            console.log(pomodoroDisplay.textContent)
        }
    }


})