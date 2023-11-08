// Include your JavaScript files
const libraryScript = document.createElement('script');
libraryScript.src = './js/music_library.js';
document.head.appendChild(libraryScript);

const playerScript = document.createElement('script');
playerScript.src = './js/player.js';
document.head.appendChild(playerScript);

const tasksScript = document.createElement('script');
tasksScript.src = './js/tasks.js';
document.head.appendChild(tasksScript);

const stopwatchScript = document.createElement('script');
stopwatchScript.src = './js/stopwatch.js';
document.head.appendChild(stopwatchScript);

// Main code for your extension
// You can use this file to integrate and control the functionality of your timer, task section, and music player.

