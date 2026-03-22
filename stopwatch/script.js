let startTime = 0;
let elapsedTime = 0;
let intervalId = null;
let isRunning = false;
let lapTimes = [];

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const ms = milliseconds % 1000;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateDisplay, 10);
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

function pause() {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

function reset() {
    clearInterval(intervalId);
    elapsedTime = 0;
    isRunning = false;
    startTime = 0;
    timeDisplay.textContent = '00:00:00.000';
    lapTimes = [];
    lapList.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
}

function lap() {
    if (isRunning) {
        const lapTime = elapsedTime;
        lapTimes.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
        lapList.appendChild(lapItem);
    }
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Initial state
pauseBtn.disabled = true;
resetBtn.disabled = true;
lapBtn.disabled = true;