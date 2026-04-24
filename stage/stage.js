// Home Stage System - JavaScript

// Data Storage (using localStorage for persistence)
let users = JSON.parse(localStorage.getItem('stageUsers')) || [];
let bookings = JSON.parse(localStorage.getItem('stageBookings')) || [];
let tools = JSON.parse(localStorage.getItem('stageTools')) || [
    { id: 1, name: 'Power Drill', category: 'Power Tools', status: 'Available' },
    { id: 2, name: 'Hammer', category: 'Hand Tools', status: 'Available' },
    { id: 3, name: 'Screwdriver Set', category: 'Hand Tools', status: 'Available' },
    { id: 4, name: 'Circular Saw', category: 'Power Tools', status: 'Available' },
    { id: 5, name: 'Wrench Set', category: 'Hand Tools', status: 'Available' },
    { id: 6, name: 'Measuring Tape', category: 'Measuring', status: 'Available' }
];
let tutorials = JSON.parse(localStorage.getItem('stageTutorials')) || [
    { id: 1, title: 'Basic Tool Safety', category: 'basic', content: 'Learn the essential safety rules for using hand and power tools at home.' },
    { id: 2, title: 'How to Use a Drill', category: 'basic', content: 'Step-by-step guide to using a power drill safely and effectively.' },
    { id: 3, title: 'Wall Mounting Basics', category: 'intermediate', content: 'Learn how to mount shelves, TV brackets, and other items securely.' },
    { id: 4, title: 'Basic Plumbing Repairs', category: 'intermediate', content: 'Fix common plumbing issues like leaky faucets and running toilets.' },
    { id: 5, title: 'Electrical Safety', category: 'advanced', content: 'Understanding electrical safety and when to call a professional.' },
    { id: 6, title: 'Woodworking Fundamentals', category: 'advanced', content: 'Introduction to basic woodworking projects for beginners.' }
];
let projects = JSON.parse(localStorage.getItem('stageProjects')) || [];
let currentUser = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupEventListeners();
});

// Load data from localStorage
function loadData() {
    users = JSON.parse(localStorage.getItem('stageUsers')) || [];
    bookings = JSON.parse(localStorage.getItem('stageBookings')) || [];
    tools = JSON.parse(localStorage.getItem('stageTools')) || getDefaultTools();
    tutorials = JSON.parse(localStorage.getItem('stageTutorials')) || getDefaultTutorials();
    projects = JSON.parse(localStorage.getItem('stageProjects')) || [];
}

function getDefaultTools() {
    return [
        { id: 1, name: 'Power Drill', category: 'Power Tools', status: 'Available' },
        { id: 2, name: 'Hammer', category: 'Hand Tools', status: 'Available' },
        { id: 3, name: 'Screwdriver Set', category: 'Hand Tools', status: 'Available' },
        { id: 4, name: 'Circular Saw', category: 'Power Tools', status: 'Available' },
        { id: 5, name: 'Wrench Set', category: 'Hand Tools', status: 'Available' },
        { id: 6, name: 'Measuring Tape', category: 'Measuring', status: 'Available' }
    ];
}

function getDefaultTutorials() {
    return [
        { id: 1, title: 'Basic Tool Safety', category: 'basic', content: 'Learn the essential safety rules for using hand and power tools at home.' },
        { id: 2, title: 'How to Use a Drill', category: 'basic', content: 'Step-by-step guide to using a power drill safely and effectively.' },
        { id: 3, title: 'Wall Mounting Basics', category: 'intermediate', content: 'Learn how to mount shelves, TV brackets, and other items securely.' },
        { id: 4, title: 'Basic Plumbing Repairs', category: 'intermediate', content: 'Fix common plumbing issues like leaky faucets and running toilets.' },
        { id: 5, title: 'Electrical Safety', category: 'advanced', content: 'Understanding electrical safety and when to call a professional.' },
        { id: 6, title: 'Woodworking Fundamentals', category: 'advanced', content: 'Introduction to basic woodworking projects for beginners.' }
    ];
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('stageUsers', JSON.stringify(users));
    localStorage.setItem('stageBookings', JSON.stringify(bookings));
    localStorage.setItem('stageTools', JSON.stringify(tools));
    localStorage.setItem('stageTutorials', JSON.stringify(tutorials));
    localStorage.setItem('stageProjects', JSON.stringify(projects));
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Register form
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    
    // User forms
    document.getElementById('booking-form').addEventListener('submit', handleBooking);
    document.getElementById('project-form').addEventListener('submit', handleProject);
    
    // Student forms
    document.getElementById('student-booking-form').addEventListener('submit', handleStudentBooking);
    document.getElementById('student-project-form').addEventListener('submit', handleStudentProject);
    
    // Stager forms
    document.getElementById('stager-project-form').addEventListener('submit', handleStagerProject);
    
    // Manager forms
    document.getElementById('tool-form').addEventListener('submit', handleTool);
    document.getElementById('tutorial-form').addEventListener('submit', handleTutorial);
}

// Show/hide sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    // Refresh data when showing sections
    if (sectionId === 'user-dashboard') updateUserDashboard();
    if (sectionId === 'manager-dashboard') updateManagerDashboard();
    if (sectionId === 'student-dashboard') updateStudentDashboard();
    if (sectionId === 'stager-dashboard') updateStagerDashboard();
    if (sectionId === 'user-tools') renderTools();
    if (sectionId === 'user-tutorials') renderTutorials();
    if (sectionId === 'user-projects') renderProjects();
    if (sectionId === 'student-tools') renderStudentTools();
    if (sectionId === 'student-tutorials') renderStudentTutorials();
    if (sectionId === 'student-projects') renderStudentProjects();
    if (sectionId === 'stager-tools') renderStagerTools();
    if (sectionId === 'stager-tutorials') renderStagerTutorials();
    if (sectionId === 'stager-projects') renderStagerProjects();
    if (sectionId === 'stager-booking') renderStagerBookings();
    if (sectionId === 'manager-users') renderUsers();
    if (sectionId === 'manager-bookings') renderBookings();
    if (sectionId === 'manager-tools') renderManagerTools();
    if (sectionId === 'manager-tutorials') renderManagerTutorials();
}

function showRegister() {
    showSection('register-section');
}

function showLogin() {
    showSection('login-section');
}

function showHome() {
    showSection('home-section');
}

// Login handler
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // Check for specific manager account
    if (username === 'IRENE' && password === 'Mukashema123' && role === 'manager') {
        currentUser = { username: 'IRENE', role: 'manager', email: 'irene@example.com' };
        showSection('manager-dashboard');
        updateManagerDashboard();
        return;
    }
    
    // For registered users (Student or Stager)
    const registeredUser = users.find(u => u.username === username && u.password === password && u.role === role);
    
    if (registeredUser) {
        // Check if user is approved
        if (registeredUser.status === 'Pending') {
            alert('Your account is pending approval. Please wait for the manager to approve your registration.');
            return;
        }
        if (registeredUser.status === 'Rejected') {
            alert('Your account has been rejected. Please contact the manager.');
            return;
        }
        
        currentUser = registeredUser;
        if (role === 'student') {
            showSection('student-dashboard');
            updateStudentDashboard();
        } else if (role === 'stager') {
            showSection('stager-dashboard');
            updateStagerDashboard();
        }
    } else if (username) {
        alert('Invalid credentials. Please register first or check your username, password, and role.');
    }
}

// Register handler
function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;
    
    const newUser = {
        id: Date.now(),
        username,
        email,
        password,
        role,
        status: 'Pending', // Pending approval
        joined: new Date().toLocaleDateString()
    };
    
    users.push(newUser);
    saveData();
    
    alert('Registration submitted! Please wait for manager approval.');
    showLogin();
}

// Logout
function logout() {
    currentUser = null;
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    showHome();
}

// Update User Dashboard
function updateUserDashboard() {
    if (!currentUser) return;
    
    document.getElementById('user-name').textContent = currentUser.username;
    
    const userBookings = bookings.filter(b => b.username === currentUser.username);
    const userProjects = projects.filter(p => p.username === currentUser.username);
    
    document.getElementById('user-bookings-count').textContent = userBookings.length;
    document.getElementById('user-projects-count').textContent = userProjects.length;
    document.getElementById('user-tutorials-count').textContent = tutorials.length;
}

// Booking handler
function handleBooking(e) {
    e.preventDefault();
    
    const booking = {
        id: Date.now(),
        username: currentUser.username,
        service: document.getElementById('booking-service').value,
        date: document.getElementById('booking-date').value,
        time: document.getElementById('booking-time').value,
        description: document.getElementById('booking-description').value,
        status: 'Pending'
    };
    
    bookings.push(booking);
    saveData();
    
    alert('Booking submitted successfully!');
    document.getElementById('booking-form').reset();
    renderUserBookings();
}

// Render user bookings
function renderUserBookings() {
    const container = document.getElementById('user-bookings-list');
    const userBookings = bookings.filter(b => b.username === currentUser.username);
    
    if (userBookings.length === 0) {
        container.innerHTML = '<p>No bookings yet.</p>';
        return;
    }
    
    container.innerHTML = userBookings.map(booking => `
        <div class="booking-item">
            <div>
                <h4>${booking.service}</h4>
                <p>${booking.date} at ${booking.time}</p>
                <p>${booking.description}</p>
            </div>
            <span class="status-${booking.status.toLowerCase()}">${booking.status}</span>
        </div>
    `).join('');
}

// Project handler
function handleProject(e) {
    e.preventDefault();
    
    const project = {
        id: Date.now(),
        username: currentUser.username,
        name: document.getElementById('project-name').value,
        description: document.getElementById('project-desc').value,
        status: document.getElementById('project-status').value
    };
    
    projects.push(project);
    saveData();
    
    alert('Project added successfully!');
    document.getElementById('project-form').reset();
    renderProjects();
}

// Render projects
function renderProjects() {
    const container = document.getElementById('user-projects-list');
    const userProjects = projects.filter(p => p.username === currentUser.username);
    
    if (userProjects.length === 0) {
        container.innerHTML = '<p>No projects yet. Add your first project!</p>';
        return;
    }
    
    container.innerHTML = userProjects.map(project => `
        <div class="project-item">
            <div>
                <h4>${project.name}</h4>
                <p>${project.description}</p>
            </div>
            <span class="status-${project.status === 'completed' ? 'completed' : project.status === 'in-progress' ? 'confirmed' : 'pending'}">${project.status}</span>
        </div>
    `).join('');
}

// Render tools
function renderTools() {
    const container = document.getElementById('user-tools-grid');
    
    container.innerHTML = tools.map(tool => `
        <div class="tool-card">
            <h4>${tool.name}</h4>
            <p>Category: ${tool.category}</p>
            <p class="status-${tool.status === 'Available' ? 'available' : 'borrowed'}">${tool.status}</p>
        </div>
    `).join('');
}

// Render tutorials
function renderTutorials() {
    const container = document.getElementById('user-tutorials-grid');
    
    container.innerHTML = tutorials.map(tutorial => `
        <div class="tutorial-card">
            <h4>${tutorial.title}</h4>
            <p>Category: ${tutorial.category}</p>
            <p>${tutorial.content}</p>
        </div>
    `).join('');
}

// Update Manager Dashboard
function updateManagerDashboard() {
    const pendingUsers = users.filter(u => u.status === 'Pending').length;
    const approvedUsers = users.filter(u => u.status === 'Approved').length;
    
    document.getElementById('manager-users-count').textContent = `${approvedUsers} / ${users.length}`;
    document.getElementById('manager-bookings-count').textContent = bookings.length;
    document.getElementById('manager-projects-count').textContent = projects.length;
}

// Update Student Dashboard
function updateStudentDashboard() {
    if (!currentUser) return;
    
    document.getElementById('student-name').textContent = currentUser.username;
    
    const studentBookings = bookings.filter(b => b.username === currentUser.username);
    const studentProjects = projects.filter(p => p.username === currentUser.username);
    
    document.getElementById('student-bookings-count').textContent = studentBookings.length;
    document.getElementById('student-projects-count').textContent = studentProjects.length;
    document.getElementById('student-tutorials-count').textContent = tutorials.length;
}

// Update Stager Dashboard
function updateStagerDashboard() {
    if (!currentUser) return;
    
    document.getElementById('stager-name').textContent = currentUser.username;
    
    const stagerBookings = bookings.filter(b => b.stagerName === currentUser.username);
    const stagerProjects = projects.filter(p => p.username === currentUser.username);
    const studentsHelped = new Set(bookings.filter(b => b.stagerName === currentUser.username).map(b => b.username)).size;
    
    document.getElementById('stager-bookings-count').textContent = stagerBookings.length;
    document.getElementById('stager-projects-count').textContent = stagerProjects.length;
    document.getElementById('stager-students-count').textContent = studentsHelped || 0;
}

// Student Booking handler
function handleStudentBooking(e) {
    e.preventDefault();
    
    const booking = {
        id: Date.now(),
        username: currentUser.username,
        service: document.getElementById('student-booking-service').value,
        date: document.getElementById('student-booking-date').value,
        time: document.getElementById('student-booking-time').value,
        description: document.getElementById('student-booking-description').value,
        status: 'Pending'
    };
    
    bookings.push(booking);
    saveData();
    
    alert('Booking submitted successfully!');
    document.getElementById('student-booking-form').reset();
    renderStudentBookings();
}

// Render student bookings
function renderStudentBookings() {
    const container = document.getElementById('student-bookings-list');
    const studentBookings = bookings.filter(b => b.username === currentUser.username);
    
    if (studentBookings.length === 0) {
        container.innerHTML = '<p>No bookings yet.</p>';
        return;
    }
    
    container.innerHTML = studentBookings.map(booking => `
        <div class="booking-item">
            <div>
                <h4>${booking.service}</h4>
                <p>${booking.date} at ${booking.time}</p>
                <p>${booking.description}</p>
            </div>
            <span class="status-${booking.status.toLowerCase()}">${booking.status}</span>
        </div>
    `).join('');
}

// Student Project handler
function handleStudentProject(e) {
    e.preventDefault();
    
    const project = {
        id: Date.now(),
        username: currentUser.username,
        name: document.getElementById('student-project-name').value,
        description: document.getElementById('student-project-desc').value,
        status: document.getElementById('student-project-status').value
    };
    
    projects.push(project);
    saveData();
    
    alert('Project added successfully!');
    document.getElementById('student-project-form').reset();
    renderStudentProjects();
}

// Render student projects
function renderStudentProjects() {
    const container = document.getElementById('student-projects-list');
    const studentProjects = projects.filter(p => p.username === currentUser.username);
    
    if (studentProjects.length === 0) {
        container.innerHTML = '<p>No projects yet. Add your first project!</p>';
        return;
    }
    
    container.innerHTML = studentProjects.map(project => `
        <div class="project-item">
            <div>
                <h4>${project.name}</h4>
                <p>${project.description}</p>
            </div>
            <span class="status-${project.status === 'completed' ? 'completed' : project.status === 'in-progress' ? 'confirmed' : 'pending'}">${project.status}</span>
        </div>
    `).join('');
}

// Render student tools
function renderStudentTools() {
    const container = document.getElementById('student-tools-grid');
    
    container.innerHTML = tools.map(tool => `
        <div class="tool-card">
            <h4>${tool.name}</h4>
            <p>Category: ${tool.category}</p>
            <p class="status-${tool.status === 'Available' ? 'available' : 'borrowed'}">${tool.status}</p>
        </div>
    `).join('');
}

// Render student tutorials
function renderStudentTutorials() {
    const container = document.getElementById('student-tutorials-grid');
    
    container.innerHTML = tutorials.map(tutorial => `
        <div class="tutorial-card">
            <h4>${tutorial.title}</h4>
            <p>Category: ${tutorial.category}</p>
            <p>${tutorial.content}</p>
        </div>
    `).join('');
}

// Stager Project handler
function handleStagerProject(e) {
    e.preventDefault();
    
    const project = {
        id: Date.now(),
        username: currentUser.username,
        name: document.getElementById('stager-project-name').value,
        description: document.getElementById('stager-project-desc').value,
        status: document.getElementById('stager-project-status').value
    };
    
    projects.push(project);
    saveData();
    
    alert('Project added successfully!');
    document.getElementById('stager-project-form').reset();
    renderStagerProjects();
}

// Render stager projects
function renderStagerProjects() {
    const container = document.getElementById('stager-projects-list');
    const stagerProjects = projects.filter(p => p.username === currentUser.username);
    
    if (stagerProjects.length === 0) {
        container.innerHTML = '<p>No projects yet. Add your first project!</p>';
        return;
    }
    
    container.innerHTML = stagerProjects.map(project => `
        <div class="project-item">
            <div>
                <h4>${project.name}</h4>
                <p>${project.description}</p>
            </div>
            <span class="status-${project.status === 'completed' ? 'completed' : project.status === 'in-progress' ? 'confirmed' : 'pending'}">${project.status}</span>
        </div>
    `).join('');
}

// Render stager tools
function renderStagerTools() {
    const container = document.getElementById('stager-tools-grid');
    
    container.innerHTML = tools.map(tool => `
        <div class="tool-card">
            <h4>${tool.name}</h4>
            <p>Category: ${tool.category}</p>
            <p class="status-${tool.status === 'Available' ? 'available' : 'borrowed'}">${tool.status}</p>
        </div>
    `).join('');
}

// Render stager tutorials
function renderStagerTutorials() {
    const container = document.getElementById('stager-tutorials-grid');
    
    container.innerHTML = tutorials.map(tutorial => `
        <div class="tutorial-card">
            <h4>${tutorial.title}</h4>
            <p>Category: ${tutorial.category}</p>
            <p>${tutorial.content}</p>
        </div>
    `).join('');
}

// Render stager bookings
function renderStagerBookings() {
    const container = document.getElementById('stager-bookings-list');
    const stagerBookings = bookings.filter(b => b.stagerName === currentUser.username);
    
    if (stagerBookings.length === 0) {
        container.innerHTML = '<p>No bookings assigned to you yet.</p>';
        return;
    }
    
    container.innerHTML = stagerBookings.map(booking => `
        <div class="booking-item">
            <div>
                <h4>${booking.service}</h4>
                <p>Student: ${booking.username}</p>
                <p>${booking.date} at ${booking.time}</p>
                <p>${booking.description}</p>
            </div>
            <span class="status-${booking.status.toLowerCase()}">${booking.status}</span>
        </div>
    `).join('');
}

// Booking handler
function handleBooking(e) {
    e.preventDefault();
    
    const booking = {
        id: Date.now(),
        username: currentUser.username,
        service: document.getElementById('booking-service').value,
        date: document.getElementById('booking-date').value,
        time: document.getElementById('booking-time').value,
        description: document.getElementById('booking-description').value,
        status: 'Pending'
    };
    
    bookings.push(booking);
    saveData();
    
    alert('Booking submitted successfully!');
    document.getElementById('booking-form').reset();
    renderUserBookings();
}

// Render user bookings
function renderUserBookings() {
    const container = document.getElementById('user-bookings-list');
    const userBookings = bookings.filter(b => b.username === currentUser.username);
    
    if (userBookings.length === 0) {
        container.innerHTML = '<p>No bookings yet.</p>';
        return;
    }
    
    container.innerHTML = userBookings.map(booking => `
        <div class="booking-item">
            <div>
                <h4>${booking.service}</h4>
                <p>${booking.date} at ${booking.time}</p>
                <p>${booking.description}</p>
            </div>
            <span class="status-${booking.status.toLowerCase()}">${booking.status}</span>
        </div>
    `).join('');
}

// Project handler
function handleProject(e) {
    e.preventDefault();
    
    const project = {
        id: Date.now(),
        username: currentUser.username,
        name: document.getElementById('project-name').value,
        description: document.getElementById('project-desc').value,
        status: document.getElementById('project-status').value
    };
    
    projects.push(project);
    saveData();
    
    alert('Project added successfully!');
    document.getElementById('project-form').reset();
    renderProjects();
}

// Render projects
function renderProjects() {
    const container = document.getElementById('projects-list');
    const userProjects = projects.filter(p => p.username === currentUser.username);
    
    if (userProjects.length === 0) {
        container.innerHTML = '<p>No projects yet. Add your first project!</p>';
        return;
    }
    
    container.innerHTML = userProjects.map(project => `
        <div class="project-item">
            <div>
                <h4>${project.name}</h4>
                <p>${project.description}</p>
            </div>
            <span class="status-${project.status === 'completed' ? 'completed' : project.status === 'in-progress' ? 'confirmed' : 'pending'}">${project.status}</span>
        </div>
    `).join('');
}

// Render tools
function renderTools() {
    const container = document.getElementById('tools-grid');
    
    container.innerHTML = tools.map(tool => `
        <div class="tool-card">
            <h4>${tool.name}</h4>
            <p>Category: ${tool.category}</p>
            <p class="status-${tool.status === 'Available' ? 'available' : 'borrowed'}">${tool.status}</p>
        </div>
    `).join('');
}

// Render tutorials
function renderTutorials() {
    const container = document.getElementById('tutorials-grid');
    
    container.innerHTML = tutorials.map(tutorial => `
        <div class="tutorial-card">
            <h4>${tutorial.title}</h4>
            <p>Category: ${tutorial.category}</p>
            <p>${tutorial.content}</p>
        </div>
    `).join('');
}

// Render users (manager)
function renderUsers() {
    const container = document.getElementById('users-table-body');
    
    if (users.length === 0) {
        container.innerHTML = '<tr><td colspan="6">No users registered yet.</td></tr>';
        return;
    }
    
    container.innerHTML = users.map(user => `
        <tr>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.joined}</td>
            <td><span class="status-${user.status.toLowerCase()}">${user.status}</span></td>
            <td>
                ${user.status === 'Pending' ? `
                    <button onclick="approveUser(${user.id})" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px;">Approve</button>
                    <button onclick="rejectUser(${user.id})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Reject</button>
                ` : `
                    <button onclick="deleteUser(${user.id})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Delete</button>
                `}
            </td>
        </tr>
    `).join('');
}

// Approve user
function approveUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        user.status = 'Approved';
        saveData();
        renderUsers();
        alert(`${user.username} has been approved!`);
    }
}

// Reject user
function rejectUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        user.status = 'Rejected';
        saveData();
        renderUsers();
        alert(`${user.username} has been rejected.`);
    }
}

// Render bookings (manager)
function renderBookings() {
    const container = document.getElementById('bookings-table-body');
    
    if (bookings.length === 0) {
        container.innerHTML = '<tr><td colspan="6">No bookings yet.</td></tr>';
        return;
    }
    
    container.innerHTML = bookings.map(booking => `
        <tr>
            <td>${booking.username}</td>
            <td>${booking.service}</td>
            <td>${booking.date}</td>
            <td>${booking.time}</td>
            <td>${booking.status}</td>
            <td>
                <button onclick="updateBookingStatus(${booking.id}, 'Confirmed')" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px;">Confirm</button>
                <button onclick="updateBookingStatus(${booking.id}, 'Completed')" style="background: #667eea; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Complete</button>
            </td>
        </tr>
    `).join('');
}

// Update booking status
function updateBookingStatus(id, status) {
    const booking = bookings.find(b => b.id === id);
    if (booking) {
        booking.status = status;
        saveData();
        renderBookings();
    }
}

// Delete user
function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(u => u.id !== id);
        saveData();
        renderUsers();
    }
}

// Tool handler (manager)
function handleTool(e) {
    e.preventDefault();
    
    const tool = {
        id: Date.now(),
        name: document.getElementById('tool-name').value,
        category: document.getElementById('tool-category').value,
        status: document.getElementById('tool-status').value
    };
    
    tools.push(tool);
    saveData();
    
    alert('Tool added successfully!');
    document.getElementById('tool-form').reset();
    renderManagerTools();
}

// Render manager tools
function renderManagerTools() {
    const container = document.getElementById('manager-tools-grid');
    
    container.innerHTML = tools.map(tool => `
        <div class="tool-card">
            <h4>${tool.name}</h4>
            <p>Category: ${tool.category}</p>
            <p class="status-${tool.status === 'Available' ? 'available' : 'borrowed'}">${tool.status}</p>
            <button onclick="deleteTool(${tool.id})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-top: 10px;">Delete</button>
        </div>
    `).join('');
}

// Delete tool
function deleteTool(id) {
    if (confirm('Are you sure you want to delete this tool?')) {
        tools = tools.filter(t => t.id !== id);
        saveData();
        renderManagerTools();
    }
}

// Tutorial handler (manager)
function handleTutorial(e) {
    e.preventDefault();
    
    const tutorial = {
        id: Date.now(),
        title: document.getElementById('tutorial-title').value,
        category: document.getElementById('tutorial-category').value,
        content: document.getElementById('tutorial-content').value
    };
    
    tutorials.push(tutorial);
    saveData();
    
    alert('Tutorial added successfully!');
    document.getElementById('tutorial-form').reset();
    renderManagerTutorials();
}

// Render manager tutorials
function renderManagerTutorials() {
    const container = document.getElementById('manager-tutorials-grid');
    
    container.innerHTML = tutorials.map(tutorial => `
        <div class="tutorial-card">
            <h4>${tutorial.title}</h4>
            <p>Category: ${tutorial.category}</p>
            <p>${tutorial.content}</p>
            <button onclick="deleteTutorial(${tutorial.id})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-top: 10px;">Delete</button>
        </div>
    `).join('');
}

// Delete tutorial
function deleteTutorial(id) {
    if (confirm('Are you sure you want to delete this tutorial?')) {
        tutorials = tutorials.filter(t => t.id !== id);
        saveData();
        renderManagerTutorials();
    }
}

// Initialize data if empty
if (localStorage.getItem('stageInitialized') !== 'true') {
    saveData();
    localStorage.setItem('stageInitialized', 'true');
}