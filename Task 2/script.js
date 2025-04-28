const form = document.getElementById('contactForm');
const formMsg = document.getElementById('form-msg');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name === '' || email === '' || message === '') {
    formMsg.textContent = 'Please fill in all fields.';
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    formMsg.textContent = 'Invalid email address.';
    return;
  }

  formMsg.style.color = 'green';
  formMsg.textContent = 'Thank you for contacting us!';
  form.reset();
});

// Scroll animation using Intersection Observer
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});
