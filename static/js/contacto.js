// Interacción del formulario de contacto para el avance de front-end.
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-contacto");
  const mensajeOk = document.getElementById("mensaje-ok");

  if (!formulario || !mensajeOk) return;

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!formulario.reportValidity()) return;

    mensajeOk.textContent =
      "mensaje enviado correctamente.";

    mensajeOk.style.display = "block";

    mensajeOk.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });

  formulario.addEventListener("input", () => {
    mensajeOk.style.display = "none";
  });
});