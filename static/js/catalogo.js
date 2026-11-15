document.addEventListener("DOMContentLoaded", () => {
  console.log("Catálogo actualizado: JavaScript iniciado");
  console.log(
    "Botones encontrados:",
    document.querySelectorAll(".agregar-producto").length
  );
  const CLAVE_PEDIDO = "dulce_cereza_pedido";
  const chips = document.querySelectorAll(".chip");
  const tarjetas = document.querySelectorAll(".tarjeta");
  const buscador = document.getElementById("buscador");
  const vacio = document.getElementById("vacio");

  let categoriaActiva = "Todas";

  function leerPedido() {
    const guardado = localStorage.getItem(CLAVE_PEDIDO);
    const pedido = guardado ? JSON.parse(guardado) : [];

    if (!Array.isArray(pedido)) {
      throw new Error("El pedido guardado no es válido.");
    }

    return pedido;
  }

  // Buscador y filtros existentes.
  function filtrar() {
    const texto = buscador.value.toLowerCase().trim();
    let visibles = 0;

    tarjetas.forEach((tarjeta) => {
      const coincideCategoria =
        categoriaActiva === "Todas" ||
        tarjeta.dataset.categoria === categoriaActiva;

      const coincideTexto =
        tarjeta.dataset.nombre.includes(texto);

      const mostrar = coincideCategoria && coincideTexto;

      tarjeta.style.display = mostrar ? "" : "none";

      if (mostrar) visibles++;
    });

    vacio.style.display = visibles === 0 ? "block" : "none";
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((elemento) => {
        elemento.classList.remove("activo");
      });

      chip.classList.add("activo");
      categoriaActiva = chip.dataset.categoria;
      filtrar();
    });
  });

  buscador.addEventListener("input", filtrar);

  // Agregar la presentación seleccionada.
  document.querySelectorAll(".agregar-producto").forEach((boton) => {
    boton.addEventListener("click", () => {
      const tarjeta = boton.closest(".tarjeta");
      const selector = tarjeta.querySelector(".presentacion-producto");
      const opcion = selector.selectedOptions[0];
      const aviso = tarjeta.querySelector(".aviso-producto");

      if (!opcion) {
        aviso.textContent = "Selecciona una presentación.";
        return;
      }

      const nombre = boton.dataset.nombre;
      const tamano = opcion.value;
      const precio = Number(opcion.dataset.precio);

      if (!Number.isFinite(precio) || precio <= 0) {
        aviso.textContent = "No se pudo identificar el precio.";
        return;
      }

      // Identificador temporal para este avance.
      const id = JSON.stringify([nombre, tamano]);

      try {
        const pedido = leerPedido();
        const existente = pedido.find((producto) => producto.id === id);

        if (existente) {
          existente.cantidad += 1;
        } else {
          pedido.push({
            id,
            nombre,
            detalle: `${tamano} · ${opcion.dataset.porciones}`,
            precio,
            cantidad: 1,
            emoji: boton.dataset.emoji,
          });
        }

        localStorage.setItem(CLAVE_PEDIDO, JSON.stringify(pedido));

        aviso.textContent =
          `Agregaste ${nombre} (${tamano}). Puedes verlo en Pedidos.`;
      } catch (error) {
        aviso.textContent =
          "No se pudo guardar la selección. Comprueba que el navegador permita el almacenamiento local.";
      }
    });
  });
});