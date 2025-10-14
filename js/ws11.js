// script.js - Core functionality only
const USER_KEY = 'expenseAppUser';
const EXPENSES_KEY = 'expenseAppExpenses';

function loadNavbar() {
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    const usernameDisplay = document.querySelector('.username-display');
    const datetimeDisplay = document.querySelector('.datetime-display');

    // Display username in top right corner
    if (usernameDisplay) {
        usernameDisplay.textContent = user ? `User: ${user.userName}` : `User: Guest`;
    }

    // Optional: Display Date and Time
    if (datetimeDisplay) {
        const now = new Date();
        datetimeDisplay.textContent = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        // Update time every second
        setInterval(() => {
            const current = new Date();
            datetimeDisplay.textContent = `${current.toLocaleDateString()} ${current.toLocaleTimeString()}`;
        }, 1000);
    }

    // Exit functionality
    const exitLink = document.getElementById('exitApp');
    if (exitLink) {
        exitLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Application closing. Data is stored locally.');
            window.close();
        });
    }
}

document.addEventListener('DOMContentLoaded', loadNavbar);