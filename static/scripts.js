// Function to toggle the form's visibility
function toggleFormVisibility() {
  const form = document.getElementById('add-todo-form');
  const todoButton = document.getElementById('todo');

  // Toggle form display on button click
  todoButton.addEventListener('click', () => {
      form.style.display = form.style.display === 'none' || form.style.display === '' ? 'flex' : 'none';
  });

  // Hide the form when a task is added
  form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevents the form from submitting in the traditional way
      form.style.display = 'none';
      // handle the form data
  });
}

// Function to start the Pomodoro timer
function startPomodoroTimer() {
  const timerDisplay = document.getElementById('timer');
  const setDisplay = document.getElementById('set');
  const pomodoroButton = document.getElementById('start-pomodoro');
  const pomodoroTimer = document.getElementById('pomodoro-timer');
  
  let isTimerRunning = false;
  let isWorkSession = true;
  let timeRemaining = 50 * 60; // 50 minutes in seconds for work session
  let setCount = 1;
  let timerInterval;

  // Function to update the timer display
  const updateTimerDisplay = () => {
      let minutes = Math.floor(timeRemaining / 60);
      let seconds = timeRemaining % 60;
      timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      setDisplay.textContent = `Set ${setCount}/3`;
  };

  // Function to toggle timer visibility
  const toggleTimerVisibility = () => {
      pomodoroTimer.style.display = isTimerRunning ? 'block' : 'none';
  };

  // Function to start or stop the timer
  const togglePomodoro = () => {
      if (!isTimerRunning) {
          // Start the timer
          pomodoroButton.textContent = 'End Pomodoro';
          isTimerRunning = true;
          toggleTimerVisibility();
          timerInterval = setInterval(() => {
              if (timeRemaining > 0) {
                  // Update timer
                  timeRemaining--;
                  updateTimerDisplay();
              } else {
                  // Time for a break or work depending on the session
                  isWorkSession = !isWorkSession;
                  timeRemaining = isWorkSession ? 50 * 60 : 10 * 60; // 50 min work, 10 min break
                  if (!isWorkSession) {
                      // Increase set count after work session
                      setCount++;
                  }
                  updateTimerDisplay();
              }
          }, 1000);
      } else {
          // Stop the timer
          clearInterval(timerInterval);
          pomodoroButton.textContent = 'Start Pomodoro';
          isTimerRunning = false;
          toggleTimerVisibility();
      }
  };

  // Event listener for the Pomodoro button
  pomodoroButton.addEventListener('click', togglePomodoro);

  // Call this function to initially set the timer to 50:00
  updateTimerDisplay();
}

// Function to generate a bubble
function generateBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // Random size between 10px and 100px
    const size = Math.random() * 90 + 10 + 'px';
    bubble.style.width = size;
    bubble.style.height = size;

    // Random horizontal start position
    bubble.style.left = Math.random() * 100 + '%';

    // Random animation duration between 15s and 30s to vary the speed of bubbles
    bubble.style.animationDuration = Math.random() * 15 + 15 + 's';

    // Append bubble to the container
    document.querySelector('.container').appendChild(bubble);

    // Remove bubble after it fades out
    bubble.addEventListener('animationend', () => {
        bubble.remove();
    });
}

// Function to start generating bubbles
function startBubbleEffect() {
  // Generate a bubble every 2 seconds
  setInterval(generateBubble, 2000);
}


// Initialize the app and listeners
function initApp() {
  toggleFormVisibility();
  startPomodoroTimer();
  startBubbleEffect();
}

// When the DOM is fully loaded, initialize the app
document.addEventListener('DOMContentLoaded', initApp);
