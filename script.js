/* ==========================================================
 🎀 Invitación Hello Kitty — script.js
 Versión con audio local (no pisa el src del HTML)
 ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================
     [1] CONFIGURACIÓN GENERAL
     ========================================================== */
  const CONFIG = {
    fechaEvento: "2025-11-14T17:00:00-03:00",
    telefonoMama: "59898705489", // <- tu número con código país (sin +)
    direccionMaps: "https://maps.app.goo.gl/n9WfSMhcFP5A5BzW8",
    // ya no usamos musicaSrc porque el audio está en el HTML
  };

  /* ==========================================================
     [2] CACHE DE ELEMENTOS
     ========================================================== */
  const app = document.querySelector("#app");
  const cover = document.querySelector(".cover");
  const btnAbrir = document.querySelector("#btnAbrirSobre");
  const pista = document.querySelector("#pista");
  const btnMusica = document.querySelector("#btnMusica");
  const btnTop = document.querySelector("#btnTop");
  const modal = document.querySelector("#modalConfirmacion");
  const cerrarModal = document.querySelector("#cerrarModal");
  const formRSVP = document.querySelector("#formAsistencia");
  const btnMapsHero = document.querySelector("#btnMapsHero");
  const btnMaps = document.querySelector("#btnMaps");
  const dias = document.querySelector("#dias");
  const horas = document.querySelector("#horas");
  const minutos = document.querySelector("#minutos");
  const segundos = document.querySelector("#segundos");
  const anioActual = document.querySelector("#anioActual");
  const lightbox = document.querySelector("#lightbox");
  const lbImg = document.querySelector("#lbImg");
  const lbCap = document.querySelector("#lbCap");
  const lbClose = document.querySelector("#lbClose");

  /* ==========================================================
     [3] INIT AOS
     ========================================================== */
  if (window.AOS) AOS.init({ duration: 700, once: true });

  /* ==========================================================
     [4] ABRIR SOBRE
     ========================================================== */
  btnAbrir.addEventListener("click", () => {
    document.body.classList.add("abierto");
    app.hidden = false;
    cover.style.display = "none";
    btnMusica.hidden = false;
    btnTop.hidden = false;
    pista.play().catch(() => {});
  });

  /* ==========================================================
     [4.1] BOTÓN "CONFIRMAR ASISTENCIA" DEL HERO
     ➜ baja directo a la tarjeta que dice "Confirmar por WhatsApp"
     ========================================================== */
  const btnRSVP = document.querySelector("#btnRSVP");
  const sectionRSVP = document.querySelector("#rsvp");

  if (btnRSVP && sectionRSVP) {
    btnRSVP.addEventListener("click", () => {
      sectionRSVP.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ==========================================================
     [5] MÚSICA (botón flotante)
     ========================================================== */
  btnMusica.addEventListener("click", () => {
    if (pista.paused) {
      pista.play().catch(() => {});
      // icono cuando está sonando
      btnMusica.innerHTML = `<i class="ri-music-2-line"></i>`;
    } else {
      pista.pause();
      // icono cuando está pausado
      btnMusica.innerHTML = `<i class="ri-pause-line"></i>`;
    }
  });

  /* ==========================================================
     [6] BOTÓN SUBIR ARRIBA
     ========================================================== */
  btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ==========================================================
     [7] CONTADOR REGRESIVO
     ========================================================== */
  const target = new Date(CONFIG.fechaEvento);
  const actualizarContador = () => {
    const ahora = new Date();
    const diff = target - ahora;

    if (diff <= 0) {
      dias.textContent = horas.textContent = minutos.textContent = segundos.textContent = "00";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    dias.textContent = d.toString().padStart(2, "0");
    horas.textContent = h.toString().padStart(2, "0");
    minutos.textContent = m.toString().padStart(2, "0");
    segundos.textContent = s.toString().padStart(2, "0");
  };
  actualizarContador();
  setInterval(actualizarContador, 1000);

  /* ==========================================================
     [8] MODAL DE CONFIRMACIÓN
     ========================================================== */
  document.querySelector("#abrirModal").addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "false");
  });

  cerrarModal.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "true");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.setAttribute("aria-hidden", "true");
  });

  /* ==========================================================
   [9] FORMULARIO WHATSAPP
   ========================================================== */
formRSVP.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(formRSVP);
  const nombre = data.get("nombre") || "Invitado/a";
  const asiste = data.get("asiste");
  const extra = data.get("extra") || "";

  // mensaje bien limpito
  let mensaje = `Hola! Soy ${nombre} y `;
  if (asiste === "sí") {
    mensaje += "confirmo mi asistencia 💗";
  } else {
    mensaje += "esta vez no voy a poder ir 😔";
  }

  if (extra.trim() !== "") {
    mensaje += `\n\nMensaje: ${extra}`;
  }

  const url = `https://wa.me/${CONFIG.telefonoMama}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");

  formRSVP.reset();
  modal.setAttribute("aria-hidden", "true");
});


  /* ==========================================================
     [10] BOTONES DE MAPS
     ========================================================== */
  btnMapsHero.href = CONFIG.direccionMaps;
  btnMaps.href = CONFIG.direccionMaps;

  /* ==========================================================
     [11] COPIAR CUENTA (si está visible)
     ========================================================== */
  const btnCopiarCuenta = document.querySelector("#btnCopiarCuenta");
  if (btnCopiarCuenta) {
    btnCopiarCuenta.addEventListener("click", () => {
      const cuenta = document.querySelector("#numeroCuenta")?.textContent;
      if (cuenta) {
        navigator.clipboard.writeText(cuenta);
        btnCopiarCuenta.innerHTML = "¡Copiado!";
        setTimeout(() => {
          btnCopiarCuenta.innerHTML = '<i class="ri-file-copy-line"></i> Copiar cuenta';
        }, 1500);
      }
    });
  }

  /* ==========================================================
     [12] LIGHTBOX GALERÍA
     ========================================================== */
  document.querySelectorAll(".g-item img").forEach((img) => {
    img.addEventListener("click", () => {
      lbImg.src = img.dataset.full || img.src;
      lbCap.textContent = img.alt;
      lightbox.hidden = false;
    });
  });

  lbClose.addEventListener("click", () => (lightbox.hidden = true));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") lightbox.hidden = true;
  });

  /* ==========================================================
     [13] AÑO ACTUAL
     ========================================================== */
  anioActual.textContent = new Date().getFullYear();
});
