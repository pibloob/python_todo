// Function to toggle the visibility of the form for adding tasks
function toggleFormVisibility() {
  const form = document.getElementById('add-todo-form');
  form.style.display = form.style.display === 'none' || form.style.display === '' ? 'flex' : 'none';
}

// Function to start and manage the Pomodoro timer
function startPomodoroTimer() {
  const pomodoroButton = document.getElementById('start-pomodoro');
  const pomodoroTimer = document.getElementById('pomodoro-timer'); // Ensure you have this element in your HTML
  let isTimerRunning = false;
  let timerInterval;

  function updateTimerDisplay(minutes, seconds, sets) {
    document.getElementById('timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('set').textContent = `Set ${sets}/3`;
  }

  function toggleTimer() {
    pomodoroTimer.style.display = 'block'; // Make sure the timer is visible when starting
    
    if (!isTimerRunning) {
      let timeRemaining = 50 * 60; // 50 minutes in seconds for work session
      let setCount = 1;
      pomodoroButton.textContent = 'End Pomodoro';
      isTimerRunning = true;

      timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
          timeRemaining--;
          const minutes = Math.floor(timeRemaining / 60);
          const seconds = timeRemaining % 60;
          updateTimerDisplay(minutes, seconds, setCount);
        } else {
          timeRemaining = 10 * 60; // 10 minutes break
          setCount++;
          updateTimerDisplay('00', '00', setCount); // Reset display for break time
        }

        if (setCount > 3) {
          clearInterval(timerInterval);
          pomodoroButton.textContent = 'Start Pomodoro';
          isTimerRunning = false;
          pomodoroTimer.style.display = 'none'; // Hide the timer when Pomodoro ends
        }
      }, 1000);
    } else {
      clearInterval(timerInterval);
      pomodoroButton.textContent = 'Start Pomodoro';
      isTimerRunning = false;
      pomodoroTimer.style.display = 'none'; // Hide the timer when manually stopped
    }
  }

  pomodoroButton.addEventListener('click', toggleTimer);
}

// Function to generate and animate bubbles
function generateBubble() {
  if (!document.body.classList.contains('bubbles-disabled')) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 90 + 10; // Bubble size from 10px to 100px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 15 + 15}s`; // Animation duration between 15s and 30s

    document.querySelector('.container').appendChild(bubble);

    bubble.addEventListener('animationend', () => {
      bubble.remove(); // Remove bubble after animation ends
    });
  }
}

// Function to toggle the settings panel
function toggleSettingsPanel() {
  const settingsPanel = document.getElementById('settings-panel');
  settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
}


// Initialize event listeners and functionalities
function initApp() {
  document.getElementById('todo').addEventListener('click', toggleFormVisibility);
  startPomodoroTimer();
  setInterval(generateBubble, 2000); // Generate a new bubble every 2 seconds

  const settingsBtn = document.getElementById('settings');
  settingsBtn.addEventListener('click', toggleSettingsPanel);
}

document.addEventListener('DOMContentLoaded', initApp);
