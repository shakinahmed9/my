

/* ========================= script ========================= */
const WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL_HERE';


document.getElementById('year').textContent = new Date().getFullYear();


const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => {
navLinks.classList.toggle('open');
if (navLinks.style.display === 'flex') {
navLinks.style.display = 'none';
} else {
navLinks.style.display = 'flex';
navLinks.style.flexDirection = 'column';
}
});


const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');


form.addEventListener('submit', async (e) => {
e.preventDefault();
status.textContent = 'Sending...';


const fd = new FormData(form);
const data = {
name: fd.get('name'),
email: fd.get('email'),
subject: fd.get('subject'),
message: fd.get('message')
};


const content = `**New Message**\n**Name:** ${data.name}\n**Email:** ${data.email}\n**Subject:** ${data.subject}\n**Message:** ${data.message}`;


try {
const res = await fetch(WEBHOOK_URL, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ content })
});


if (res.ok) {
status.textContent = 'Message sent successfully!';
form.reset();
} else {
status.textContent = 'Failed to send message.';
}
} catch (err) {
status.textContent = 'Network error. Please try again later.';
}
});