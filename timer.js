document.addEventListener('DOMContentLoaded', function() {
    // ===== TIMER VARIABLES =====
    let timer;
    let timeLeft = 25 * 60; // 25 minutes in seconds
    let totalTime = 25 * 60;
    let isRunning = false;
    let isStudyMode = true;
    let todayStudyTime = 0;
    let weekStudyTime = 0;
    let sessionsCount = 0;
    
    // ===== THEME VARIABLES =====
    let currentTheme = 'pink';
    let currentMode = 'light';
    let profileColor = '#ff85a2';
    let avatarIcon = 'fa-user-graduate';
    
    // ===== PHOTO VARIABLES =====
    let uploadedPhoto = null;
    let photoCropStyle = 'circle';
    let photoFilter = 'none';
    
    // ===== CONFIRMATION VARIABLES =====
    let confirmCallback = null;

    // ===== SOUND UPLOAD & VOLUME CONTROL VARIABLES =====
let selectedSound = 'bell';
let customSoundURL = null;
let soundVolumes = {
    bell: 80,
    chime: 80,
    melody: 80,
    nature: 80,
    custom: 80
};
let masterVolumeLevel = 80;
    
    // ===== DOM ELEMENTS =====
    // Timer Elements
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const presetButtons = document.querySelectorAll('.preset-btn');
    const modeButtons = document.querySelectorAll('.mode-btn');
    const soundToggle = document.getElementById('soundToggle');
    const alarmBtn = document.getElementById('alarmBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Settings Elements
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.getElementById('closeSettings');
    const saveSettings = document.getElementById('saveSettings');
    const studyTimeSlider = document.getElementById('studyTime');
    const breakTimeSlider = document.getElementById('breakTime');
    const studyTimeValue = document.getElementById('studyTimeValue');
    const breakTimeValue = document.getElementById('breakTimeValue');
    const alarmSoundElement = document.getElementById('alarmSound');
    
    // Stats Elements
    const todayTimeElement = document.getElementById('todayTime');
    const weekTimeElement = document.getElementById('weekTime');
    const sessionsCountElement = document.getElementById('sessionsCount');
    const usernameDisplay = document.getElementById('usernameDisplay');
    
    // Profile Elements
    const profileModal = document.getElementById('profileModal');
    const profileBtn = document.getElementById('profileBtn');
    const profileUsername = document.getElementById('profileUsername');
    const userStatus = document.getElementById('userStatus');
    const avatarOptions = document.querySelectorAll('.avatar-option');
    const colorOptions = document.querySelectorAll('.color-option');
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarIconElement = document.getElementById('avatarIcon');
    const previewUsername = document.getElementById('previewUsername');
    const previewStatus = document.getElementById('previewStatus');
    const saveProfileBtn = document.getElementById('saveProfile');
    const closeProfileBtn = document.getElementById('closeProfile');
    
    // Theme Elements
    const themeModal = document.getElementById('themeModal');
    const themeBtn = document.getElementById('themeBtn');
    const themePreview = document.getElementById('themePreview');
    const themeName = document.getElementById('themeName');
    const themeDesc = document.getElementById('themeDesc');
    const modeToggleBtns = document.querySelectorAll('.mode-toggle-btn');
    const colorThemeOptions = document.querySelectorAll('.color-theme-option');
    const saveThemeBtn = document.getElementById('saveTheme');
    const closeThemeBtn = document.getElementById('closeTheme');
    
    // Photo Elements
    const photoModal = document.getElementById('photoModal');
    const photoBtn = document.getElementById('photoBtn');
    const photoPreviewElement = document.getElementById('photoPreview');
    const uploadedPhotoImg = document.getElementById('uploadedPhoto');
    const dropArea = document.getElementById('dropArea');
    const photoUpload = document.getElementById('photoUpload');
    const cropBtns = document.querySelectorAll('.crop-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const savePhotoBtn = document.getElementById('savePhoto');
    const removePhotoBtn = document.getElementById('removePhoto');
    const closePhotoBtn = document.getElementById('closePhoto');
    
    // Cute Confirmation Elements
    const cuteConfirmModal = document.getElementById('cuteConfirmModal');
    const confirmTitle = document.getElementById('confirmTitle');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmYesBtn = document.getElementById('confirmYes');
    const confirmNoBtn = document.getElementById('confirmNo');
    
    // Time's Up Elements
    const timeUpModal = document.getElementById('timeUpModal');
    const timeUpMessage = document.getElementById('timeUpMessage');
    const focusTime = document.getElementById('focusTime');
    const sessionStreak = document.getElementById('sessionStreak');
    const startBreakBtn = document.getElementById('startBreakBtn');
    const restartTimerBtn = document.getElementById('restartTimerBtn');
    const closeTimeUpBtn = document.getElementById('closeTimeUpBtn');
    
    // Sound Elements
    const bellSound = document.getElementById('bellSound');
    const chimeSound = document.getElementById('chimeSound');
    const melodySound = document.getElementById('melodySound');
    
    // Task Elements
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    let tasks = [
        { id: 1, text: 'Math homework', completed: false },
        { id: 2, text: 'English essay', completed: false },
        { id: 3, text: 'Science project', completed: false },
        { id: 4, text: 'History reading', completed: false }
    ];
    
    // ===== THEME COLOR MAPPINGS =====
    const themeColors = {
        pink: {
            primary: '#ff85a2',
            secondary: '#ffd1dc',
            background: '#ffe6f2',
            text: '#5a3d5c',
            light: {
                bgGradient: 'linear-gradient(135deg, #ffe6f2, #ffd6e7, #fff0f7)',
                cardBg: 'rgba(255, 255, 255, 0.92)',
                border: '#ffd1dc'
            },
            dark: {
                bgGradient: 'linear-gradient(135deg, #2a1a2a, #3a2a3a, #4a3a4a)',
                cardBg: 'rgba(50, 40, 50, 0.92)',
                border: '#ff85a2'
            }
        },
        blue: {
            primary: '#85d7ff',
            secondary: '#b3e0ff',
            background: '#e6f7ff',
            text: '#2d4d5c',
            light: {
                bgGradient: 'linear-gradient(135deg, #e6f7ff, #d6e7ff, #f0f7ff)',
                cardBg: 'rgba(255, 255, 255, 0.92)',
                border: '#b3e0ff'
            },
            dark: {
                bgGradient: 'linear-gradient(135deg, #1a2a3a, #2a3a4a, #3a4a5a)',
                cardBg: 'rgba(40, 50, 60, 0.92)',
                border: '#85d7ff'
            }
        },
        yellow: {
            primary: '#ffcc66',
            secondary: '#ffeb99',
            background: '#fff9e6',
            text: '#5c4d2d',
            light: {
                bgGradient: 'linear-gradient(135deg, #fff9e6, #ffeb99, #fff5cc)',
                cardBg: 'rgba(255, 255, 255, 0.92)',
                border: '#ffeb99'
            },
            dark: {
                bgGradient: 'linear-gradient(135deg, #3a2a1a, #4a3a2a, #5a4a3a)',
                cardBg: 'rgba(60, 50, 40, 0.92)',
                border: '#ffcc66'
            }
        },
        purple: {
            primary: '#9d7b9f',
            secondary: '#d8bfd8',
            background: '#f2e6f2',
            text: '#3d2d5c',
            light: {
                bgGradient: 'linear-gradient(135deg, #f2e6f2, #e7d6e7, #f7f0f7)',
                cardBg: 'rgba(255, 255, 255, 0.92)',
                border: '#d8bfd8'
            },
            dark: {
                bgGradient: 'linear-gradient(135deg, #2a1a3a, #3a2a4a, #4a3a5a)',
                cardBg: 'rgba(50, 40, 60, 0.92)',
                border: '#9d7b9f'
            }
        },
        green: {
            primary: '#99ff99',
            secondary: '#ccffcc',
            background: '#e6ffe6',
            text: '#2d5c2d',
            light: {
                bgGradient: 'linear-gradient(135deg, #e6ffe6, #d6ffd6, #f0fff0)',
                cardBg: 'rgba(255, 255, 255, 0.92)',
                border: '#ccffcc'
            },
            dark: {
                bgGradient: 'linear-gradient(135deg, #1a3a1a, #2a4a2a, #3a5a3a)',
                cardBg: 'rgba(40, 60, 40, 0.92)',
                border: '#99ff99'
            }
        },
        coral: {
            primary: '#ff9999',
            secondary: '#ffcccc',
            background: '#ffe6e6',
            text: '#5c2d2d',
            light: {
                bgGradient: 'linear-gradient(135deg, #ffe6e6, #ffd6d6, #fff0f0)',
                cardBg: 'rgba(255, 255, 255, 0.92)',
                border: '#ffcccc'
            },
            dark: {
                bgGradient: 'linear-gradient(135deg, #3a1a1a, #4a2a2a, #5a3a3a)',
                cardBg: 'rgba(60, 40, 40, 0.92)',
                border: '#ff9999'
            }
        },
        midnight: {
            primary: '#64dfdf',
            secondary: '#4a9d9d',
            background: '#0a192f',
            text: '#e6f1ff',
            light: {
                bgGradient: 'linear-gradient(135deg, #0a192f, #172a45)',
                cardBg: 'rgba(23, 42, 69, 0.92)',
                border: '#64dfdf'
            },
            dark: {
                bgGradient: 'linear-gradient(135deg, #0a192f, #172a45)',
                cardBg: 'rgba(23, 42, 69, 0.92)',
                border: '#64dfdf'
            }
        },
        charcoal: {
            primary: '#ff85a2',
            secondary: '#d8bfd8',
            background: '#1a1a2e',
            text: '#f1f1f1',
            light: {
                bgGradient: 'linear-gradient(135deg, #1a1a2e, #2d3047)',
                cardBg: 'rgba(45, 48, 71, 0.92)',
                border: '#ff85a2'
            },
            dark: {
                bgGradient: 'linear-gradient(135deg, #1a1a2e, #2d3047)',
                cardBg: 'rgba(45, 48, 71, 0.92)',
                border: '#ff85a2'
            }
        },
        forest: {
            primary: '#52b788',
            secondary: '#95d5b2',
            background: '#1b4332',
            text: '#d8f3dc',
            light: {
                bgGradient: 'linear-gradient(135deg, #1b4332, #2d6a4f)',
                cardBg: 'rgba(45, 106, 79, 0.92)',
                border: '#52b788'
            },
            dark: {
                bgGradient: 'linear-gradient(135deg, #1b4332, #2d6a4f)',
                cardBg: 'rgba(45, 106, 79, 0.92)',
                border: '#52b788'
            }
        },
        amethyst: {
            primary: '#9d4edd',
            secondary: '#c77dff',
            background: '#3d0066',
            text: '#f8f9fa',
            light: {
                bgGradient: 'linear-gradient(135deg, #3d0066, #6a0dad)',
                cardBg: 'rgba(106, 13, 173, 0.92)',
                border: '#9d4edd'
            },
            dark: {
                bgGradient: 'linear-gradient(135deg, #3d0066, #6a0dad)',
                cardBg: 'rgba(106, 13, 173, 0.92)',
                border: '#9d4edd'
            }
        },
        crimson: {
            primary: '#ff6b6b',
            secondary: '#ff9999',
            background: '#660000',
            text: '#ffd6d6',
            light: {
                bgGradient: 'linear-gradient(135deg, #660000, #990000)',
                cardBg: 'rgba(153, 0, 0, 0.92)',
                border: '#ff6b6b'
            },
            dark: {
                bgGradient: 'linear-gradient(135deg, #660000, #990000)',
                cardBg: 'rgba(153, 0, 0, 0.92)',
                border: '#ff6b6b'
            }
        },
        golden: {
            primary: '#ffd166',
            secondary: '#ffde8a',
            background: '#332100',
            text: '#fff9e6',
            light: {
                bgGradient: 'linear-gradient(135deg, #332100, #664400)',
                cardBg: 'rgba(102, 68, 0, 0.92)',
                border: '#ffd166'
            },
            dark: {
                bgGradient: 'linear-gradient(135deg, #332100, #664400)',
                cardBg: 'rgba(102, 68, 0, 0.92)',
                border: '#ffd166'
            }
        }
    };
    
    // ===== TIMER FUNCTIONS =====
    // Update the timer display
    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        
        // Update progress ring
        const progressRing = document.querySelector('.progress-ring-circle');
        if (progressRing) {
            const circumference = 2 * Math.PI * 138;
            const offset = circumference - (timeLeft / totalTime) * circumference;
            progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
            progressRing.style.strokeDashoffset = offset;
            
            // Change circle color based on mode
            const theme = themeColors[currentTheme] || themeColors.pink;
            progressRing.style.stroke = isStudyMode ? theme.primary : '#85d7ff';
        }
        
        // Update page title
        const modeText = isStudyMode ? 'Study' : 'Break';
        document.title = `${minutes}:${seconds.toString().padStart(2, '0')} - ${modeText} | Kawaii Timer`;
    }
    
    // Start the timer
    function startTimer() {
        if (isRunning) return;
        
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;
                startBtn.disabled = false;
                pauseBtn.disabled = true;
                
                // Show Time's Up popup
                showTimeUpPopup();
                
                // Update stats
                if (isStudyMode) {
                    sessionsCount++;
                    todayStudyTime += totalTime / 60;
                    weekStudyTime += totalTime / 60;
                    updateStats();
                    saveStats();
                    
                    // Update streak
                    const today = new Date().toDateString();
                    const lastSession = localStorage.getItem('kawaiiTimerLastSession');
                    if (lastSession === today) {
                        const currentStreak = parseInt(localStorage.getItem('kawaiiTimerStreak') || '1');
                        localStorage.setItem('kawaiiTimerStreak', (currentStreak + 1).toString());
                    } else {
                        localStorage.setItem('kawaiiTimerStreak', '1');
                    }
                    localStorage.setItem('kawaiiTimerLastSession', today);
                }
                
                // Switch mode
                isStudyMode = !isStudyMode;
                updateModeDisplay();
                
                // Set next timer
                if (isStudyMode) {
                    timeLeft = parseInt(studyTimeSlider.value) * 60;
                    totalTime = timeLeft;
                } else {
                    timeLeft = parseInt(breakTimeSlider.value) * 60;
                    totalTime = timeLeft;
                }
                
                updateDisplay();
            }
        }, 1000);
    }
    
    // Pause the timer
    function pauseTimer() {
        clearInterval(timer);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
    
    // Reset the timer
    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        
        if (isStudyMode) {
            timeLeft = parseInt(studyTimeSlider.value) * 60;
            totalTime = timeLeft;
        } else {
            timeLeft = parseInt(breakTimeSlider.value) * 60;
            totalTime = timeLeft;
        }
        
        updateDisplay();
    }
    
    // Play alarm sound based on selected sound
    function playAlarmSound() {
        if (!soundToggle.classList.contains('sound-on')) return;
        
        const soundSelect = document.getElementById('alarmSound');
        const soundType = soundSelect ? soundSelect.value : 'bell';
        
        let soundToPlay;
        switch(soundType) {
            case 'bell':
                soundToPlay = bellSound;
                break;
            case 'chime':
                soundToPlay = chimeSound;
                break;
            case 'melody':
                soundToPlay = melodySound;
                break;
            default:
                soundToPlay = bellSound;
        }
        
        if (soundToPlay) {
            soundToPlay.currentTime = 0;
            soundToPlay.play().catch(e => console.log("Audio play failed:", e));
        }
    }
    
    // ===== NOTIFICATION FUNCTIONS =====
    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-bell"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ffebf3;
            border: 3px solid #ff85a2;
            color: #ff66a3;
            padding: 20px;
            border-radius: 15px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 10px 25px rgba(255, 133, 162, 0.3);
            display: flex;
            align-items: center;
            gap: 15px;
            max-width: 300px;
            animation: slideIn 0.5s ease-out;
        `;
        
        // Add keyframes for animation
        if (!document.querySelector('#slideInAnimation')) {
            const style = document.createElement('style');
            style.id = 'slideInAnimation';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 500);
        }, 5000);
    }
    
    // ===== MODE FUNCTIONS =====
    // Update mode display
    function updateModeDisplay() {
        modeButtons.forEach(btn => {
            if (btn.dataset.mode === (isStudyMode ? 'study' : 'break')) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        const timeLabel = document.querySelector('.time-label');
        if (timeLabel) {
            timeLabel.textContent = isStudyMode ? 'STUDY TIME' : 'BREAK TIME';
        }
    }
    
    // ===== STATS FUNCTIONS =====
    // Update stats display
    function updateStats() {
        todayTimeElement.textContent = `${Math.floor(todayStudyTime)} min`;
        weekTimeElement.textContent = `${Math.floor(weekStudyTime)} min`;
        sessionsCountElement.textContent = sessionsCount;
    }
    
    // Load stats from localStorage
    function loadStats() {
        const savedStats = localStorage.getItem('kawaiiTimerStats');
        if (savedStats) {
            const stats = JSON.parse(savedStats);
            todayStudyTime = stats.todayStudyTime || 0;
            weekStudyTime = stats.weekStudyTime || 0;
            sessionsCount = stats.sessionsCount || 0;
        }
        updateStats();
    }
    
    // Save stats to localStorage
    function saveStats() {
        const stats = {
            todayStudyTime,
            weekStudyTime,
            sessionsCount,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('kawaiiTimerStats', JSON.stringify(stats));
    }
    
    // ===== PROFILE FUNCTIONS =====
    // Load saved profile
    function loadProfile() {
        const savedProfile = localStorage.getItem('kawaiiTimerProfile');
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            
            // Update profile
            if (profile.username) {
                usernameDisplay.textContent = profile.username;
                previewUsername.textContent = profile.username;
            }
            if (profile.status) {
                previewStatus.textContent = profile.status;
            }
            if (profile.avatarIcon) {
                avatarIcon = profile.avatarIcon;
                avatarIconElement.className = `fas ${avatarIcon}`;
                
                // Update avatar options
                avatarOptions.forEach(option => {
                    if (option.dataset.icon === avatarIcon) {
                        option.classList.add('active');
                    } else {
                        option.classList.remove('active');
                    }
                });
            }
            if (profile.color) {
                profileColor = profile.color;
                updateThemeColor(profileColor);
                
                // Update color options
                colorOptions.forEach(option => {
                    if (option.dataset.color === profileColor) {
                        option.classList.add('active');
                    } else {
                        option.classList.remove('active');
                    }
                });
            }
        }
    }
    
    // Update theme color
    function updateThemeColor(color) {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', color);
        
        // Update user avatar
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar) {
            userAvatar.style.background = `linear-gradient(to bottom right, ${color}, ${darkenColor(color, 20)})`;
        }
    }
    
    // Helper function to darken color
    function darkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
    
    // ===== TASK MANAGEMENT FUNCTIONS =====
    // Load tasks from localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem('kawaiiTimerTasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
        }
        renderTasks();
    }
    
    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('kawaiiTimerTasks', JSON.stringify(tasks));
    }
    
    // Render tasks to the DOM
    function renderTasks() {
        const tasksList = document.querySelector('.tasks-list');
        if (!tasksList) return;
        
        tasksList.innerHTML = '';
        
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <div class="task-content">
                    <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''}>
                    <label for="task-${task.id}">${task.text}</label>
                </div>
                <div class="task-actions">
                    <button class="task-btn edit-task" data-id="${task.id}" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-btn delete-task" data-id="${task.id}" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            tasksList.appendChild(taskItem);
        });
        
        // Add event listeners to new task elements
        addTaskEventListeners();
    }
    
    // Add event listeners to task elements
    function addTaskEventListeners() {
        // Task checkboxes
        document.querySelectorAll('.task-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const taskId = parseInt(this.id.split('-')[1]);
                const task = tasks.find(t => t.id === taskId);
                if (task) {
                    task.completed = this.checked;
                    saveTasks();
                    
                    const label = this.nextElementSibling;
                    if (this.checked) {
                        label.style.textDecoration = 'line-through';
                        label.style.color = '#9d7b9f';
                        
                        // Show celebration occasionally
                        if (Math.random() > 0.7) {
                            showNotification('Great job completing a task! 🎉');
                            createCelebration();
                        }
                    } else {
                        label.style.textDecoration = 'none';
                        label.style.color = '#5a3d5c';
                    }
                }
            });
        });
        
        // Edit task buttons
        document.querySelectorAll('.edit-task').forEach(btn => {
            btn.addEventListener('click', function() {
                const taskId = parseInt(this.dataset.id);
                editTask(taskId);
            });
        });
        
        // Delete task buttons
        document.querySelectorAll('.delete-task').forEach(btn => {
            btn.addEventListener('click', function() {
                const taskId = parseInt(this.dataset.id);
                deleteTask(taskId);
            });
        });
    }
    
    // Edit a task with cute modal
    function editTask(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;
        
        // Create cute modal for editing
        const editModal = document.createElement('div');
        editModal.className = 'modal';
        editModal.style.display = 'flex';
        editModal.innerHTML = `
            <div class="modal-content">
                <div class="edit-task-emoji">✏️✨</div>
                <h3>Edit Task</h3>
                <p>What would you like to change it to?</p>
                <input type="text" id="editTaskInput" value="${task.text}" class="cute-input">
                <div class="modal-buttons">
                    <button class="btn" id="saveEditTask">
                        <i class="fas fa-check"></i> Save Changes
                    </button>
                    <button class="btn btn-secondary" id="cancelEditTask">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(editModal);
        
        // Focus on input
        setTimeout(() => {
            const input = editModal.querySelector('#editTaskInput');
            input.focus();
            input.select();
        }, 100);
        
        // Save edit
        editModal.querySelector('#saveEditTask').addEventListener('click', function() {
            const newText = editModal.querySelector('#editTaskInput').value.trim();
            if (newText) {
                task.text = newText;
                saveTasks();
                renderTasks();
                showNotification('Task updated! ✨✏️');
                createFloatingEmojis(['✏️', '✨', '💖', '🌟'], 5);
            }
            editModal.remove();
        });
        
        // Cancel edit
        editModal.querySelector('#cancelEditTask').addEventListener('click', function() {
            editModal.remove();
        });
        
        // Close on click outside
        editModal.addEventListener('click', function(e) {
            if (e.target === editModal) {
                editModal.remove();
            }
        });
    }
    
    // Delete a task with cute confirmation
    function deleteTask(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;
        
        const cuteMessages = [
            "This task will disappear like magic! 🎩✨",
            "Say goodbye to this task! 👋💫",
            "Are you sure? This task will float away! 🎈",
            "Poof! This task will vanish! ✨",
            "Ready to make this task disappear? 🪄"
        ];
        const randomMessage = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];
        
        showCuteConfirm(
            'Delete Task? 🗑️',
            `${randomMessage}<br><br><strong>"${task.text}"</strong>`,
            () => {
                tasks = tasks.filter(t => t.id !== taskId);
                saveTasks();
                renderTasks();
                
                // Show cute success message
                const successMessages = [
                    "Task vanished into thin air! ✨",
                    "Task successfully deleted! 🎉",
                    "Task has been yeeted! 🚀",
                    "Task deleted with style! 💅",
                    "Task is now history! 📜"
                ];
                const randomSuccess = successMessages[Math.floor(Math.random() * successMessages.length)];
                showNotification(randomSuccess);
                
                // Add cute animation
                createFloatingEmojis(['🗑️', '✨', '🎉', '🌟'], 10);
            }
        );
    }
    
    // Add new task
    function addNewTask(taskText) {
        const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        tasks.push({
            id: newId,
            text: taskText,
            completed: false
        });
        saveTasks();
        renderTasks();
        showNotification('New task added! 📝');
    }
    
    // ===== THEME MANAGEMENT FUNCTIONS =====
    // Load saved theme
    function loadTheme() {
        const savedTheme = localStorage.getItem('kawaiiTimerTheme');
        if (savedTheme) {
            const theme = JSON.parse(savedTheme);
            currentTheme = theme.theme || 'pink';
            currentMode = theme.mode || 'light';
            
            applyTheme(currentTheme, currentMode);
            
            // Update UI
            colorThemeOptions.forEach(option => {
                if (option.dataset.theme === currentTheme) {
                    option.classList.add('active');
                    themeName.textContent = option.dataset.name;
                    themeDesc.textContent = option.dataset.desc;
                } else {
                    option.classList.remove('active');
                }
            });
            
            modeToggleBtns.forEach(btn => {
                if (btn.dataset.mode === currentMode) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    }
    
    // Apply theme to page
    function applyTheme(themeName, mode) {
        const theme = themeColors[themeName];
        if (!theme) return;
        
        const modeSettings = theme[mode] || theme.light;
        
        // Update CSS variables
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        document.documentElement.style.setProperty('--background-color', theme.background);
        document.documentElement.style.setProperty('--text-color', theme.text);
        document.documentElement.style.setProperty('--bg-gradient', modeSettings.bgGradient);
        document.documentElement.style.setProperty('--card-bg', modeSettings.cardBg);
        document.documentElement.style.setProperty('--border-color', modeSettings.border);
        
        // Apply to body
        document.body.style.background = modeSettings.bgGradient;
        document.body.style.color = theme.text;
        
        // Update progress ring
        const progressRing = document.querySelector('.progress-ring-circle');
        if (progressRing) {
            progressRing.style.stroke = theme.primary;
        }
        
        // Update user avatar
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar) {
            userAvatar.style.background = `linear-gradient(to bottom right, ${theme.primary}, ${darkenColor(theme.primary, 20)})`;
        }
    }
    
    // Update theme preview
    function updateThemePreview(themeName) {
        const theme = themeColors[themeName];
        if (!theme) return;
        
        themePreview.style.setProperty('--preview-primary', theme.primary);
        themePreview.style.setProperty('--preview-secondary', theme.secondary);
    }
    
    // ===== PHOTO UPLOAD FUNCTIONS =====
    // Load saved photo
    function loadPhoto() {
        const savedPhoto = localStorage.getItem('kawaiiTimerPhoto');
        if (savedPhoto) {
            uploadedPhoto = savedPhoto;
            uploadedPhotoImg.src = savedPhoto;
            uploadedPhotoImg.style.display = 'block';
            photoPreviewElement.querySelector('.default-avatar').style.display = 'none';
            
            // Apply saved crop style
            const savedCrop = localStorage.getItem('kawaiiTimerPhotoCrop') || 'circle';
            photoCropStyle = savedCrop;
            applyCropStyle(savedCrop);
            
            // Update user avatar
            updateUserAvatar();
        }
    }
    
    // Update user avatar with photo
    function updateUserAvatar() {
        const userAvatar = document.querySelector('.user-avatar');
        const userAvatarLarge = document.querySelector('.user-avatar-large');
        
        if (uploadedPhoto) {
            if (userAvatar) {
                userAvatar.innerHTML = `<img src="${uploadedPhoto}" alt="Profile photo" class="avatar-photo ${photoCropStyle}">`;
            }
            if (userAvatarLarge) {
                userAvatarLarge.innerHTML = `<img src="${uploadedPhoto}" alt="Profile photo" class="avatar-photo-large ${photoCropStyle}">`;
            }
        }
    }
    
    // Apply crop style to photo
    function applyCropStyle(style) {
        photoPreviewElement.className = 'photo-preview';
        photoPreviewElement.classList.add(style);
        
        // Update crop buttons
        cropBtns.forEach(btn => {
            if (btn.dataset.crop === style) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Apply filter to photo
    function applyFilter(filter) {
        const filters = {
            none: 'none',
            brighten: 'brightness(1.2) contrast(1.1) saturate(1.1)',
            vintage: 'sepia(0.5) contrast(1.1) brightness(0.9)',
            pastel: 'saturate(0.7) brightness(1.1) contrast(0.9)'
        };
        
        uploadedPhotoImg.style.filter = filters[filter] || 'none';
        
        // Update filter buttons
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Handle photo upload
    function handlePhotoUpload(file) {
        if (!file || !file.type.match('image.*')) {
            showNotification('Please select an image file! 📸', 'error');
            return;
        }
        
        if (file.size > 2 * 1024 * 1024) {
            showNotification('File is too large! Max 2MB please! 📏', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedPhoto = e.target.result;
            uploadedPhotoImg.src = uploadedPhoto;
            uploadedPhotoImg.style.display = 'block';
            photoPreviewElement.querySelector('.default-avatar').style.display = 'none';
            
            showNotification('Photo uploaded successfully! 📸✨', 'success');
            createFloatingEmojis(['📸', '✨', '🌟', '💖'], 8);
        };
        
        reader.readAsDataURL(file);
    }
    
    // ===== CUTE CONFIRMATION FUNCTIONS =====
    // Cute confirmation dialog
    function showCuteConfirm(title, message, yesCallback) {
        const emojis = ['🌸✨', '🎀💖', '🌟✨', '💫🌙', '🍥🎀', '💕✨'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        confirmTitle.textContent = title;
        confirmMessage.innerHTML = message;
        document.querySelector('.confirm-emoji').textContent = randomEmoji;
        confirmCallback = yesCallback;
        
        cuteConfirmModal.style.display = 'flex';
        
        // Add cute animation
        cuteConfirmModal.classList.add('cute-bounce');
        setTimeout(() => {
            cuteConfirmModal.classList.remove('cute-bounce');
        }, 500);
    }
    
    // ===== TIME'S UP FUNCTIONS =====
    // Show Time's Up popup
    function showTimeUpPopup() {
        const modeText = isStudyMode ? 'Study' : 'Break';
        const messages = {
            study: [
                "Great job studying! Time for a well-deserved break! ☕",
                "Amazing focus! Your brain deserves a rest now! 🧠✨",
                "Study session complete! Treat yourself to something nice! 🎁",
                "You nailed it! Time to recharge those brain cells! ⚡",
                "Fantastic work! Your future self will thank you! 🙏"
            ],
            break: [
                "Break time's over! Ready to get back to studying? 📚",
                "Hope you enjoyed your break! Time to refocus! 🔍",
                "Break complete! Let's get back to crushing those goals! 💪",
                "Refreshed and ready? Next study session starts now! 🚀",
                "Break's done! Back to being a study superstar! 🌟"
            ]
        };
        
        const messageArray = messages[isStudyMode ? 'study' : 'break'];
        const randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)];
        
        timeUpMessage.innerHTML = randomMessage;
        focusTime.textContent = `${totalTime / 60} minutes`;
        
        // Calculate streak
        const lastSession = localStorage.getItem('kawaiiTimerLastSession');
        const today = new Date().toDateString();
        if (lastSession === today) {
            const streak = parseInt(localStorage.getItem('kawaiiTimerStreak') || '1');
            sessionStreak.textContent = `${streak} day${streak > 1 ? 's' : ''}`;
        } else {
            sessionStreak.textContent = '1 day';
        }
        
        // Show modal
        timeUpModal.style.display = 'flex';
        
        // Add celebration effects
        createTimeUpCelebration();
        
        // Play alarm sound
        playAlarmSound();
    }
    
    // Create celebration effects for Time's Up
    function createTimeUpCelebration() {
        const container = document.querySelector('.celebration-effects');
        if (!container) return;
        
        container.innerHTML = '';
        
        const emojis = ['🎉', '✨', '🌟', '🥳', '🎊', '💫', '🌸', '💖', '⭐', '🌈'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                confetti.style.cssText = `
                    position: absolute;
                    font-size: ${Math.random() * 30 + 20}px;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: confettiPop ${Math.random() * 1.5 + 1}s ease-out forwards;
                    z-index: 1;
                `;
                
                container.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.remove();
                    }
                }, 2000);
            }, i * 50);
        }
    }
    
    // ===== VISUAL EFFECT FUNCTIONS =====
    // Create celebration effect
    function createCelebration() {
        const emojis = ['🎉', '✨', '🌟', '🥳', '🎊', '💫', '🌸', '💖'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                confetti.style.cssText = `
                    position: fixed;
                    font-size: ${Math.random() * 25 + 15}px;
                    z-index: 10000;
                    pointer-events: none;
                    left: ${Math.random() * 100}vw;
                    top: -50px;
                    animation: confettiFall ${Math.random() * 2 + 1}s ease-in forwards;
                `;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.remove();
                    }
                }, 2000);
            }, i * 100);
        }
    }
    
    // Create floating emojis
    function createFloatingEmojis(emojis, count = 5) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.cssText = `
                    position: fixed;
                    font-size: ${Math.random() * 25 + 20}px;
                    z-index: 10000;
                    pointer-events: none;
                    left: ${Math.random() * 100}vw;
                    top: 100vh;
                    animation: floatUp ${Math.random() * 2 + 1.5}s ease-in forwards;
                `;
                
                document.body.appendChild(emoji);
                
                setTimeout(() => {
                    if (emoji.parentNode) {
                        emoji.remove();
                    }
                }, 2000);
            }, i * 100);
        }
    }
    
    // Add cute floating effects to the page
    function addFloatingEffects() {
        setInterval(() => {
            const emojis = ['🌸', '✨', '🎀', '🍥', '📚', '✏️', '⏰', '📖'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            
            // Occasionally add a floating emoji
            if (Math.random() > 0.9) {
                const floatingEmoji = document.createElement('div');
                floatingEmoji.textContent = randomEmoji;
                floatingEmoji.style.cssText = `
                    position: fixed;
                    font-size: 2rem;
                    z-index: 100;
                    pointer-events: none;
                    animation: floatUp 3s ease-in forwards;
                    left: ${Math.random() * 90 + 5}vw;
                `;
                
                document.body.appendChild(floatingEmoji);
                
                // Remove after animation
                setTimeout(() => {
                    if (floatingEmoji.parentNode) {
                        floatingEmoji.remove();
                    }
                }, 3000);
            }
        }, 5000);
    }
    
    // ===== EVENT LISTENERS =====
    // Timer controls
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    // Preset buttons
    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const minutes = parseInt(this.dataset.minutes);
            timeLeft = minutes * 60;
            totalTime = timeLeft;
            
            // If switching to break time, change mode
            if (minutes <= 10 && minutes !== 25) {
                isStudyMode = false;
                updateModeDisplay();
            } else {
                isStudyMode = true;
                updateModeDisplay();
            }
            
            updateDisplay();
            
            // Show notification
            const modeText = isStudyMode ? 'Study' : 'Break';
            showNotification(`Timer set to ${minutes} min ${modeText.toLowerCase()}!`);
        });
    });
    
    // Mode buttons
    modeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mode = this.dataset.mode;
            isStudyMode = mode === 'study';
            
            // Update timer based on mode
            if (isStudyMode) {
                timeLeft = parseInt(studyTimeSlider.value) * 60;
                totalTime = timeLeft;
            } else {
                timeLeft = parseInt(breakTimeSlider.value) * 60;
                totalTime = timeLeft;
            }
            
            updateModeDisplay();
            updateDisplay();
            
            // Show notification
            const modeText = isStudyMode ? 'Study' : 'Break';
            showNotification(`Switched to ${modeText} mode!`);
        });
    });
    
    // Sound toggle
    soundToggle.addEventListener('click', function() {
        if (this.classList.contains('sound-on')) {
            this.classList.remove('sound-on');
            this.classList.add('sound-off');
            this.innerHTML = '<i class="fas fa-volume-mute"></i> Sound Off';
        } else {
            this.classList.remove('sound-off');
            this.classList.add('sound-on');
            this.innerHTML = '<i class="fas fa-volume-up"></i> Sound On';
        }
    });
    
    // Alarm button
    alarmBtn.addEventListener('click', function() {
        playAlarmSound();
        showNotification('Alarm sound played! 🔔');
    });
    
    // Logout button
    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('kawaiiTimerUsername');
        window.location.href = 'index.html';
    });
    
    // Settings button
    settingsBtn.addEventListener('click', function() {
        settingsModal.style.display = 'flex';
    });
    
    // Close settings
    closeSettings.addEventListener('click', function() {
        settingsModal.style.display = 'none';
    });
    
    // Save settings
    saveSettings.addEventListener('click', function() {
        // Update timer values
        if (isStudyMode) {
            timeLeft = parseInt(studyTimeSlider.value) * 60;
            totalTime = timeLeft;
        } else {
            timeLeft = parseInt(breakTimeSlider.value) * 60;
            totalTime = timeLeft;
        }
        
        updateDisplay();
        settingsModal.style.display = 'none';
        showNotification('Settings saved successfully! ⚙️');
    });
    
    // Update slider values display
    studyTimeSlider.addEventListener('input', function() {
        studyTimeValue.textContent = this.value;
    });
    
    breakTimeSlider.addEventListener('input', function() {
        breakTimeValue.textContent = this.value;
    });
    
    // Profile button
    if (profileBtn) {
        profileBtn.addEventListener('click', function() {
            // Populate profile modal with current data
            profileUsername.value = usernameDisplay.textContent;
            userStatus.value = previewStatus.textContent;
            profileModal.style.display = 'flex';
        });
    }
    
    // Avatar options
    avatarOptions.forEach(option => {
        option.addEventListener('click', function() {
            avatarOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const iconClass = this.dataset.icon;
            avatarIconElement.className = `fas ${iconClass}`;
        });
    });
    
    // Color options
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const color = this.dataset.color;
            avatarPreview.style.background = `linear-gradient(to bottom right, ${color}, ${darkenColor(color, 20)})`;
        });
    });
    
    // Save profile
    saveProfileBtn.addEventListener('click', function() {
        const newUsername = profileUsername.value.trim();
        const newStatus = userStatus.value.trim();
        
        if (newUsername) {
            usernameDisplay.textContent = newUsername;
            previewUsername.textContent = newUsername;
        }
        
        if (newStatus) {
            previewStatus.textContent = newStatus;
        }
        
        // Get selected avatar and color
        const selectedAvatar = document.querySelector('.avatar-option.active');
        const selectedColor = document.querySelector('.color-option.active');
        
        if (selectedAvatar) {
            avatarIcon = selectedAvatar.dataset.icon;
        }
        
        if (selectedColor) {
            profileColor = selectedColor.dataset.color;
            updateThemeColor(profileColor);
        }
        
        // Save to localStorage
        const profile = {
            username: newUsername || usernameDisplay.textContent,
            status: newStatus || previewStatus.textContent,
            avatarIcon: avatarIcon,
            color: profileColor,
            updatedAt: new Date().toISOString()
        };
        
        localStorage.setItem('kawaiiTimerProfile', JSON.stringify(profile));
        
        profileModal.style.display = 'none';
        showNotification('Profile saved successfully! 💾');
    });
    
    // Close profile modal
    closeProfileBtn.addEventListener('click', function() {
        profileModal.style.display = 'none';
    });
    
    // Add task button
    if (addTaskBtn && newTaskInput) {
        addTaskBtn.addEventListener('click', function() {
            const taskText = newTaskInput.value.trim();
            if (taskText) {
                addNewTask(taskText);
                newTaskInput.value = '';
            }
        });
        
        // Allow pressing Enter to add task
        newTaskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const taskText = newTaskInput.value.trim();
                if (taskText) {
                    addNewTask(taskText);
                    newTaskInput.value = '';
                }
            }
        });
    }
    
    // Theme button
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            themeModal.style.display = 'flex';
            updateThemePreview(currentTheme);
        });
    }
    
    // Mode toggle buttons
    modeToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modeToggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Color theme options
    colorThemeOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorThemeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const theme = this.dataset.theme;
            const name = this.dataset.name;
            const desc = this.dataset.desc;
            
            themeName.textContent = name;
            themeDesc.textContent = desc;
            updateThemePreview(theme);
        });
    });
    
    // Save theme
    saveThemeBtn.addEventListener('click', function() {
        const selectedTheme = document.querySelector('.color-theme-option.active');
        const selectedMode = document.querySelector('.mode-toggle-btn.active');
        
        if (selectedTheme && selectedMode) {
            currentTheme = selectedTheme.dataset.theme;
            currentMode = selectedMode.dataset.mode;
            
            // Save to localStorage
            const themeSettings = {
                theme: currentTheme,
                mode: currentMode,
                updatedAt: new Date().toISOString()
            };
            
            localStorage.setItem('kawaiiTimerTheme', JSON.stringify(themeSettings));
            
            // Apply theme
            applyTheme(currentTheme, currentMode);
            
            themeModal.style.display = 'none';
            
            // Show cute success message
            const themeEmojis = {
                pink: '🌸',
                blue: '🌊',
                yellow: '☀️',
                purple: '✨',
                green: '🍃',
                coral: '🍑',
                midnight: '🌙',
                charcoal: '🖤',
                forest: '🌲',
                amethyst: '💜',
                crimson: '❤️',
                golden: '🌅'
            };
            
            showNotification(`Theme applied! ${themeEmojis[currentTheme] || '✨'}`);
            createFloatingEmojis(['🎨', '✨', '💖', themeEmojis[currentTheme] || '🌟'], 8);
        }
    });
    
    // Close theme modal
    closeThemeBtn.addEventListener('click', function() {
        themeModal.style.display = 'none';
    });
    
    // Photo button
    if (photoBtn) {
        photoBtn.addEventListener('click', function() {
            photoModal.style.display = 'flex';
        });
    }
    
    // Drag and drop for photo upload
    if (dropArea) {
        dropArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            dropArea.classList.add('dragover');
        });
        
        dropArea.addEventListener('dragleave', function() {
            dropArea.classList.remove('dragover');
        });
        
        dropArea.addEventListener('drop', function(e) {
            e.preventDefault();
            dropArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handlePhotoUpload(files[0]);
            }
        });
    }
    
    // File input for photo upload
    if (photoUpload) {
        photoUpload.addEventListener('change', function(e) {
            if (this.files.length > 0) {
                handlePhotoUpload(this.files[0]);
            }
        });
    }
    
    // Crop buttons
    cropBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cropBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            photoCropStyle = this.dataset.crop;
            applyCropStyle(photoCropStyle);
        });
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            photoFilter = this.dataset.filter;
            applyFilter(photoFilter);
        });
    });
    
    // Save photo
    savePhotoBtn.addEventListener('click', function() {
        if (uploadedPhoto) {
            // Save to localStorage
            localStorage.setItem('kawaiiTimerPhoto', uploadedPhoto);
            localStorage.setItem('kawaiiTimerPhotoCrop', photoCropStyle);
            
            // Update avatar
            updateUserAvatar();
            
            photoModal.style.display = 'none';
            showNotification('Profile photo saved! 📸💖', 'success');
            createFloatingEmojis(['📸', '💾', '✨', '💖'], 10);
        } else {
            showNotification('Please upload a photo first! 📸', 'error');
        }
    });
    
    // Remove photo
    removePhotoBtn.addEventListener('click', function() {
        if (uploadedPhoto) {
            showCuteConfirm(
                'Remove Photo? 🗑️📸',
                'Are you sure you want to remove your cute profile photo?',
                () => {
                    uploadedPhoto = null;
                    uploadedPhotoImg.style.display = 'none';
                    photoPreviewElement.querySelector('.default-avatar').style.display = 'block';
                    
                    localStorage.removeItem('kawaiiTimerPhoto');
                    localStorage.removeItem('kawaiiTimerPhotoCrop');
                    
                    // Reset avatar to default
                    const userAvatar = document.querySelector('.user-avatar');
                    const userAvatarLarge = document.querySelector('.user-avatar-large');
                    if (userAvatar) {
                        userAvatar.innerHTML = '<i class="fas fa-user-graduate"></i>';
                    }
                    if (userAvatarLarge) {
                        userAvatarLarge.innerHTML = '<i class="fas fa-user-graduate"></i>';
                    }
                    
                    showNotification('Photo removed! Using default avatar now! 👤', 'info');
                    createFloatingEmojis(['👤', '✨', '💫', '🌟'], 8);
                }
            );
        }
    });
    
    // Close photo modal
    closePhotoBtn.addEventListener('click', function() {
        photoModal.style.display = 'none';
    });
    
    // Cute confirmation modal
    confirmYesBtn.addEventListener('click', function() {
        if (confirmCallback) {
            confirmCallback();
        }
        cuteConfirmModal.style.display = 'none';
        confirmCallback = null;
    });
    
    confirmNoBtn.addEventListener('click', function() {
        cuteConfirmModal.style.display = 'none';
        confirmCallback = null;
        
        // Show cute cancellation message
        const cancelMessages = [
            "Task saved from deletion! 🛡️",
            "Phew! Task is safe! 😅",
            "Task cancellation successful! ✅",
            "Decision respected! 👍",
            "Task lives to see another day! 🌈"
        ];
        const randomCancel = cancelMessages[Math.floor(Math.random() * cancelMessages.length)];
        showNotification(randomCancel);
    });
    
    // Time's Up modal buttons
    startBreakBtn.addEventListener('click', function() {
        timeUpModal.style.display = 'none';
        isStudyMode = false;
        timeLeft = parseInt(breakTimeSlider.value) * 60;
        totalTime = timeLeft;
        updateModeDisplay();
        updateDisplay();
        startTimer();
    });
    
    restartTimerBtn.addEventListener('click', function() {
        timeUpModal.style.display = 'none';
        isStudyMode = true;
        timeLeft = parseInt(studyTimeSlider.value) * 60;
        totalTime = timeLeft;
        updateModeDisplay();
        updateDisplay();
        startTimer();
    });
    
    closeTimeUpBtn.addEventListener('click', function() {
        timeUpModal.style.display = 'none';
    });
    
    // Close modals on outside click
    window.addEventListener('click', function(e) {
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
        if (e.target === profileModal) {
            profileModal.style.display = 'none';
        }
        if (e.target === themeModal) {
            themeModal.style.display = 'none';
        }
        if (e.target === photoModal) {
            photoModal.style.display = 'none';
        }
        if (e.target === cuteConfirmModal) {
            cuteConfirmModal.style.display = 'none';
            confirmCallback = null;
        }
        if (e.target === timeUpModal) {
            timeUpModal.style.display = 'none';
        }
    });
    
    // ===== INITIALIZATION =====
    // Get username from session storage
    const username = sessionStorage.getItem('kawaiiTimerUsername') || 'Student';
    usernameDisplay.textContent = username;
    
    // Initialize everything
    loadStats();
    loadProfile();
    loadTasks();
    loadTheme();
    loadPhoto();
    
    // Apply initial theme
    applyTheme(currentTheme, currentMode);
    
    // Add CSS variable for theme color
    document.documentElement.style.setProperty('--primary-color', profileColor);
    
    // Initialize display
    updateDisplay();
    updateModeDisplay();
    
    // Set sound toggle to on by default
    soundToggle.classList.add('sound-on');
    
    // Add floating effects
    addFloatingEffects();
    
    // Add cute hover effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-3px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes floatUp {
            0% { bottom: -50px; opacity: 1; }
            100% { bottom: 100vh; opacity: 0; }
        }
        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes confettiPop {
            0% { transform: scale(0) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
            100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        @keyframes cuteBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(animationStyles);
});