// FORMSPREE CONTACTO
const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();

  if (!nombre || !email || !mensaje) {
    showMessage('error', 'Completa todos los campos');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showMessage('error', 'Email inválido');
    return;
  }

  setLoading(true);

  const data = new FormData(form);
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      showMessage('success', 'Mensaje enviado correctamente');
      form.reset();
    } else {
      showMessage('error', 'Error al enviar el mensaje');
    }
  } catch (err) {
    showMessage('error', 'Error al enviar el mensaje');
  } finally {
    setLoading(false);
  }
});

function showMessage(type, text) {
  let msg = document.querySelector('.form-message');
  if (!msg) {
    msg = document.createElement('div');
    msg.className = 'form-message';
    document.querySelector('.form').prepend(msg);
  }
  msg.className = `form-message ${type}`;
  msg.textContent = text;
}

function setLoading(isLoading) {
  const button = document.querySelector('.form button');
  button.disabled = isLoading;
  button.textContent = isLoading ? 'Enviando...' : 'Enviar solicitud';
}

// HERO TYPING
const typingText = document.getElementById('typing-text');
const words = ['Seguro.', 'Confiable.', 'Siempre disponible.'];
let i = 0, j = 0, isDeleting = false, current = '';
function type() {
  if (i >= words.length) i = 0;
  let full = words[i];
  if (isDeleting) { current = full.substring(0, j--); }
  else { current = full.substring(0, j++); }
  typingText.textContent = current;
  if (!isDeleting && j === full.length) { isDeleting = true; setTimeout(type, 1000); }
  else if (isDeleting && j === 0) { isDeleting = false; i++; setTimeout(type, 500); }
  else { setTimeout(type, 150); }
}
type();

// FAQ INTERACTIVA
document.querySelectorAll('.faq-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
