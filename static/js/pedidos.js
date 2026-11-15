document.addEventListener("DOMContentLoaded", () => {
  const CLAVE_PEDIDO = "dulce_cereza_pedido";

  const lista = document.getElementById("lista-pedido");
  const vacio = document.getElementById("pedido-vacio");
  const resumen = document.getElementById("resumen");
  const formulario = document.getElementById("form-pedido");
  const botonConfirmar = document.getElementById("btn-confirmar");
  const entrega = document.getElementById("entrega");
  const campoDireccion = document.getElementById("campo-direccion");
  const direccion = document.getElementById("direccion");
  const mensajeOk = document.getElementById("mensaje-ok");
  const fecha = document.getElementById("fecha");

  const COSTO_DELIVERY = Number(resumen.dataset.delivery);
  const soles = (numero) => "S/ " + numero.toFixed(2);

  let pedido = [];

  try {
    const guardado = localStorage.getItem(CLAVE_PEDIDO);
    pedido = guardado ? JSON.parse(guardado) : [];

    const valido = Array.isArray(pedido) && pedido.every((producto) =>
      producto &&
      typeof producto.id === "string" &&
      typeof producto.nombre === "string" &&
      typeof producto.detalle === "string" &&
      Number.isFinite(producto.precio) &&
      producto.precio > 0 &&
      Number.isInteger(producto.cantidad) &&
      producto.cantidad > 0
    );

    if (!valido) throw new Error("Pedido no válido.");
  } catch (error) {
    lista.textContent =
      "No se pudo leer la selección guardada en este navegador.";
    botonConfirmar.disabled = true;

    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();
    });

    return;
  }

  function crearElemento(etiqueta, clase, texto) {
    const elemento = document.createElement(etiqueta);
    elemento.className = clase;

    if (texto !== undefined) elemento.textContent = texto;

    return elemento;
  }

  function crearBoton(clase, texto, etiqueta) {
    const boton = crearElemento("button", clase, texto);
    boton.type = "button";
    boton.setAttribute("aria-label", etiqueta);
    return boton;
  }

  function mostrarPedido() {
    lista.replaceChildren();

    pedido.forEach((producto) => {
      const fila = crearElemento("article", "item-pedido");
      fila.dataset.id = producto.id;

      const foto = crearElemento(
        "div",
        "item-foto",
        producto.emoji || "🍰"
      );

      const informacion = crearElemento("div", "item-info");

      informacion.append(
        crearElemento("h3", "", producto.nombre),
        crearElemento(
          "small",
          "",
          `${producto.detalle} · ${soles(producto.precio)} c/u`
        )
      );

      const controles = crearElemento("div", "cantidad-control");

      controles.append(
        crearBoton("menos", "−", `Reducir cantidad de ${producto.nombre}`),
        crearElemento("span", "cantidad", producto.cantidad),
        crearBoton("mas", "+", `Aumentar cantidad de ${producto.nombre}`)
      );

      const importe = crearElemento(
        "div",
        "precio-linea",
        soles(producto.precio * producto.cantidad)
      );

      const quitar = crearBoton(
        "quitar",
        "✕",
        `Quitar ${producto.nombre}`
      );
      quitar.title = "Quitar";

      fila.append(foto, informacion, controles, importe, quitar);
      lista.append(fila);
    });

    calcular();
  }

  function calcular() {
    const subtotal = pedido.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );

    const hayProductos = pedido.length > 0;
    const envio =
      entrega.value === "delivery" && hayProductos ? COSTO_DELIVERY : 0;

    document.getElementById("subtotal").textContent = soles(subtotal);
    document.getElementById("envio").textContent = soles(envio);
    document.getElementById("total").textContent = soles(subtotal + envio);

    vacio.style.display = hayProductos ? "none" : "block";
    botonConfirmar.disabled = !hayProductos;
  }

  lista.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button");
    const fila = boton?.closest(".item-pedido");

    if (!fila) return;

    // Copia para no cambiar la pantalla si falla el guardado.
    const actualizado = pedido.map((producto) => ({ ...producto }));
    const indice = actualizado.findIndex(
      (producto) => producto.id === fila.dataset.id
    );

    if (indice === -1) return;

    if (boton.classList.contains("mas")) {
      actualizado[indice].cantidad += 1;
    } else if (boton.classList.contains("menos")) {
      actualizado[indice].cantidad = Math.max(
        1,
        actualizado[indice].cantidad - 1
      );
    } else if (boton.classList.contains("quitar")) {
      actualizado.splice(indice, 1);
    } else {
      return;
    }

    try {
      localStorage.setItem(CLAVE_PEDIDO, JSON.stringify(actualizado));
      pedido = actualizado;
      mensajeOk.style.display = "none";
      mostrarPedido();
    } catch (error) {
      mensajeOk.textContent = "No se pudo guardar el cambio.";
      mensajeOk.style.display = "block";
    }
  });

  function actualizarEntrega() {
    const esDelivery = entrega.value === "delivery";
    campoDireccion.style.display = esDelivery ? "flex" : "none";
    direccion.required = esDelivery;
    calcular();
  }

  entrega.addEventListener("change", actualizarEntrega);

  // Fecha del navegador, sin convertirla a UTC.
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  fecha.min = `${hoy.getFullYear()}-${mes}-${dia}`;

  formulario.addEventListener("input", () => {
    mensajeOk.style.display = "none";
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (pedido.length === 0 || !formulario.reportValidity()) return;

    mensajeOk.textContent =
      "pedido realizado con éxito.";

    mensajeOk.style.display = "block";
    mensajeOk.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });

  mostrarPedido();
  actualizarEntrega();
});