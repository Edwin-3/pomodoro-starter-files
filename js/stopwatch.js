window.addEventListener('load', () => {
    const stopwatchIcon = document.querySelector('.pomodoro-timer');
    const cover = document.querySelector('.cover');
    const originalCoverHTML = cover.innerHTML;
    let isStopwatchVisible = false;


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
                data-mode="shortBreak"
                class="button mode-button"
                id="js-short-break"
            >
                Short break
            </button>
            <button
                data-mode="longBreak"
                class="button mode-button"
                id="js-long-break"
            >
                Long break
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
        const timer = {
            pomodoro: 25,
            shortBreak: 5,
            longBreak: 15,
            longBreakInterval: 4,
        };

        timer.remainingTime = {
            total: timer.pomodoro * 60,
            minutes: timer.pomodoro,
            seconds: 0,
        };

        let interval;

        const mainButton = document.getElementById('js-btn');
        mainButton.addEventListener('click', () => {
            const { action } = mainButton.dataset;
            if (action === 'start') {
                if (!timer.mode) {
                    switchMode('pomodoro');
                }
                startTimer();
            } else {
                stopTimer();
            }
        });


        const modeButtons = document.querySelector('#js-mode-buttons');
        modeButtons.addEventListener('click', handleMode);

        function handleMode(e) {
            const { mode } = e.target.dataset;

            if (!mode) return;

            switchMode(mode);
            stopTimer();
        }

        function switchMode(mode) {
            timer.mode = mode;
            timer.remainingTime = {
                total: timer[mode] * 60,
                minutes: timer[mode],
                seconds: 0,
            };

            document.querySelectorAll('button[data-mode]')
                .forEach(e => e.classList.remove('active'));
            document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
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
            updatePomodoroDisplay("25", "00");

        }

        function updateClock() {
            const { remainingTime } = timer;
            const minutes = `${remainingTime.minutes}`.padStart(2, '0');
            const seconds = `${remainingTime.seconds}`.padStart(2, '0');

            const min = document.getElementById('js-minutes');
            const sec = document.getElementById('js-seconds');
            min.textContent = minutes;
            sec.textContent = seconds;

            updatePomodoroDisplay(minutes, seconds);
        }


        document.addEventListener('DOMContentLoaded', () => {
            switchMode('pomodoro');
        });

    }

    function updatePomodoroDisplay(minutes, seconds) {
        // Update the pomodoro-timer display
        const pomodoroDisplay = document.querySelector('.pomodoro-timer p');
        pomodoroDisplay.textContent = `${minutes}:${seconds}`;
    }
})