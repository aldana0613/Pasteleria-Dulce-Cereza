// Autor: <tu nombre>
// Maneja el formulario de tortas personalizadas (por ahora solo la parte visual)

const formulario = document.getElementById('form-personalizada');
const mensajeOk = document.getElementById('mensaje-ok');
const campoFecha = document.getElementById('fecha');

// No permitir elegir fechas que ya pasaron
campoFecha.min = new Date().toISOString().split('T')[0];

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();          // por ahora no se envía a ningún servidor
  mensajeOk.style.display = 'block';
  formulario.reset();
  mensajeOk.scrollIntoView({ behavior: 'smooth', block: 'center' });
});