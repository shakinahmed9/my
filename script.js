/* ========================= script.js ========================= */
const WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL_HERE'; // <-- replace this


// small helpers
document.getElementById('year').textContent = new Date().getFullYear();


// burger menu for mobile
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
if(burger){
burger.addEventListener('click', ()=>{
if(navLinks.style.display === 'flex'){
navLinks.style.display = '';
} else {
navLinks.style.display = 'flex';
navLinks.style.flexDirection = 'column';
}
});
}


// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(a => {
a.addEventListener('click', (e) => {
e.preventDefault();
document.querySelectorAll('.nav-links a').forEach(x=>x.classList.remove('active'));
a.classList.add('active');
const target = document.querySelector(a.getAttribute('href'));
if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
})
});


// Contact form -> Discord webhook
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');


if(form){
form.addEventListener('submit', async (e) => {
e.preventDefault();
statusEl.textContent = 'Sending...';


const fd = new FormData(form);
const payload = {
username: 'Contact Bot',
content: `**New message**
**Name:** ${escape(fd.get('name'))}
**Email:** ${escape(fd.get('email'))}
**Subject:** ${escape(fd.get('subject')||'-')}
**Message:** ${escape(fd.get('message'))}`
};


try{
const res = await fetch(WEBHOOK_URL, {
method: 'POST',
headers: {'Content-Type':'application/json'},
body: JSON.stringify(payload)
});


if(res.ok){
statusEl.textContent = 'Message sent — check your Discord.';
form.reset();
} else {
statusEl.textContent = 'Failed to send — check webhook.';
console.error('Webhook error', res.status);
}
} catch(err){
statusEl.textContent = 'Network error. Try later.';
console.error(err);
}
});
}


function escape(str){
if(!str) return '';
return String(str).replace(/```/g,'').replace(/@/g,'@');
}