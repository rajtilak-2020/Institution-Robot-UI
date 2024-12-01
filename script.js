// Database initialization with complete structure
const defaultDatabase = {
  // Change admin credentials here as needed
  admin: { id: 'admin', password: 'admin1' },
  faculty: {},
  students: {},
  notices: [],
  accounts: {
    faculty: {},
    students: {}
  }
};

function initializeDatabase() {
  if (!localStorage.getItem('database')) {
    localStorage.setItem('database', JSON.stringify(defaultDatabase));
  } else {
    // Ensure all required properties exist in existing database
    const currentDb = JSON.parse(localStorage.getItem('database'));
    // Update admin credentials if they've changed in defaultDatabase
    currentDb.admin = defaultDatabase.admin;
    const updatedDb = {
      ...defaultDatabase,
      ...currentDb,
      admin: defaultDatabase.admin, // Ensure admin credentials are always updated
      faculty: currentDb.faculty || {},
      students: currentDb.students || {},
      notices: currentDb.notices || [],
      accounts: {
        faculty: currentDb.accounts?.faculty || {},
        students: currentDb.accounts?.students || {}
      }
    };
    localStorage.setItem('database', JSON.stringify(updatedDb));
  }
}

// Initialize database on script load
initializeDatabase();

// Eye animation
document.addEventListener('DOMContentLoaded', () => {
  const eyes = document.querySelectorAll('.eye');
  const pupils = document.querySelectorAll('.pupil');

  // Eye following cursor
  document.addEventListener('mousemove', (e) => {
    eyes.forEach(eye => {
      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      
      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const distance = Math.min(eye.offsetWidth / 4, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 15);
      
      const pupil = eye.querySelector('.pupil');
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  });

  // Blinking animation
  function blink() {
    eyes.forEach(eye => {
      eye.style.height = '2px';
      eye.style.transition = 'height 0.15s ease';
      
      setTimeout(() => {
        eye.style.height = '';
        eye.style.transition = 'height 0.15s ease';
      }, 150);
    });
  }

  function scheduleBlink() {
    const randomTime = Math.random() * (7000 - 3000) + 3000;
    setTimeout(() => {
      blink();
      scheduleBlink();
    }, randomTime);
  }
  scheduleBlink();
});