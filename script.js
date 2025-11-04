<!-- ===== File: script.js ===== -->
// Replace this with your Discord webhook URL
const WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL_HERE';


document.getElementById('year').textContent = new Date().getFullYear();


// mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
menuToggle?.addEventListener('click', ()=>{
const nav = document.querySelector('.nav-links');
if(nav) nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});


// Contact form submit -> Discord webhook
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');


form?.addEventListener('submit', async (e)=>{
e.preventDefault();
statusEl.textContent = 'Sending...';


const fd = new FormData(form);
const data = {
name: fd.get('name'),
email: fd.get('email'),
subject: fd.get('subject'),
message: fd.get('message')
};


// Basic validation
if(!data.name || !data.email || !data.message){
statusEl.textContent = 'Please fill the required fields.';
return;
}


// Build a readable message for Discord
const content = `**New contact message**\n**Name:** ${escapeText(data.name)}\n**Email:** ${escapeText(data.email)}\n**Subject:** ${escapeText(data.subject || '-') }\n**Message:** ${escapeText(data.message)}`;


try{
const res = await fetch(WEBHOOK_URL, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ content })
});


if(res.ok){
statusEl.textContent = 'Message sent — check Discord.';
form.reset();
} else {
statusEl.textContent = 'Failed to send (check webhook URL).';
console.error('discord webhook error', res.status, await res.text());
}
} catch(err){
statusEl.textContent = 'Network error sending message.';
console.error(err);
}
});


function escapeText(str){
if(!str) return '';
return String(str).replace(/`/g, '\`').replace(/@/g, '@');
}