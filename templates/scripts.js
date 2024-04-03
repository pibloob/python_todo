document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('todo').addEventListener('click', () => {
      var form = document.getElementById('add-todo-form');
      if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'flex';
      } else {
        form.style.display = 'none';
      }
    });
  
    document.getElementById('start-pomodoro').addEventListener('click', startPomodoro);
  
    let pomodoroInterval;
    let isWorkPhase = true;
    let setTime = 50 * 60; // 50 minutes converted to seconds
    let setsCompleted = 0;
  
    let isPomodoroRunning = false;
    let isWorkSession = true;
    let workDuration = 50 * 60; // 50 minutes in seconds
    let breakDuration = 10 * 60; // 10-minute break
    let currentDuration = workDuration;
    let setCount = 0;
    let interval;
  
    document.getElementById('start-pomodoro').addEventListener('click', function() {
      const timerDisplay = document.getElementById('timer'); // Changed from 'pomodoro-time' to 'timer'
      const setDisplay = document.getElementById('set'); // Changed from 'pomodoro-set' to 'set'
      const pomodoroTimer = document.getElementById('pomodoro-timer');
  
      if (!isPomodoroRunning) {
        isPomodoroRunning = true;
        pomodoroTimer.style.display = 'block'; // Changed from 'classList.remove('hidden')'
  
        interval = setInterval(function() {
          let minutes = Math.floor(currentDuration / 60);
          let seconds = currentDuration % 60;
          timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
          if (currentDuration === 0) {
            isWorkSession = !isWorkSession;
            currentDuration = isWorkSession ? workDuration : breakDuration;
            if (!isWorkSession) {
              setCount++;
              setDisplay.textContent = `Set ${setCount}/3`;
            }
          } else {
            currentDuration--;
          }
  
          if (setCount === 3) {
            clearInterval(interval);
            isPomodoroRunning = false;
            alert('Pomodoro sessions completed!');
          }
        }, 1000);
      } else {
        clearInterval(interval);
        isPomodoroRunning = false;
        pomodoroTimer.style.display = 'none'; // Changed from 'classList.add('hidden')'
      }
    });
  
    function startPomodoro() {
      // Placeholder function for starting Pomodoro, details need to be implemented
    }
  });
  