/* ==========================================================
 🎀 Invitación Hello Kitty — script.js
 Versión FINAL mobile-friendly (iPhone / Android / PC)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================
     [1] CONFIG GLOBAL
     ========================================================== */
  const CONFIG = {
    fechaEvento: "2025-11-14T17:00:00-03:00",
    telefonoMama: "59898705489",
    direccionMaps: "https://www.google.com/maps/search/?api=1&query=Del+Pilar+621,+Melo,+Uruguay",
    musicaLocal: "imagenes/cumple-kitty.mp3",
    tituloEvento: "Cumple de Rocío 🎀",
    descripcionEvento: "Fiesta Hello Kitty para compartir y jugar 💗",
    ubicacionTexto: "Del Pilar 621, Melo, Uruguay"
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
  const btnRSVPhero = document.querySelector("#btnRSVP");
  const seccionRSVP = document.querySelector("#rsvp");
  const modal = document.querySelector("#modalConfirmacion");
  const cerrarModal = document.querySelector("#cerrarModal");
  const formRSVP = document.querySelector("#formAsistencia");
  const btnMapsHero = document.querySelector("#btnMapsHero");
  const btnMaps = document.querySelector("#btnMaps");
  const btnCalendar = document.querySelector("#btnCalendar");
  const dias = document.querySelector("#dias");
  const horas = document.querySelector("#horas");
  const minutos = document.querySelector("#minutos");
  const segundos = document.querySelector("#segundos");
  const anioActual = document.querySelector("#anioActual");
  const footerSmall = document.querySelector("footer small");

  /* ==========================================================
     [3] AOS INIT
     ========================================================== */
  if (window.AOS) {
    AOS.init({ duration: 700, once: true, easing: "ease" });
  }

  /* ==========================================================
     [4] UTILS
     ========================================================== */
  const smoothScrollTo = (el) => el?.scrollIntoView({ behavior: "smooth", block: "start" });

  const toICSDate = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(".000", "");

  /* ==========================================================
     [5] ABRIR SOBRE
     ========================================================== */
  btnAbrir.addEventListener("click", () => {
    document.body.classList.add("abierto");
    app.hidden = false;
    cover.style.display = "none";
    btnMusica.hidden = false;
    btnTop.hidden = false;
    pista.src = CONFIG.musicaLocal;
    pista.play().catch(() => console.warn("iOS bloqueó autoplay, usar botón de música."));
  });

  /* ==========================================================
     [6] MÚSICA
     ========================================================== */
  btnMusica.addEventListener("click", () => {
    if (pista.paused) {
      pista.play();
      btnMusica.innerHTML = `<i class="ri-music-2-line"></i>`;
    } else {
      pista.pause();
      btnMusica.innerHTML = `<i class="ri-pause-line"></i>`;
    }
  });

  /* ==========================================================
     [7] VOLVER ARRIBA
     ========================================================== */
  btnTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ==========================================================
     [8] SCROLL HACIA CONFIRMAR ASISTENCIA
     ========================================================== */
  btnRSVPhero?.addEventListener("click", () => smoothScrollTo(seccionRSVP));

  /* ==========================================================
     [9] CONTADOR
     ========================================================== */
  const target = new Date(CONFIG.fechaEvento);
  const actualizarContador = () => {
    const diff = target - new Date();
    if (diff <= 0) return ["00", "00", "00", "00"].forEach((v, i) => [dias, horas, minutos, segundos][i].textContent = v);
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    dias.textContent = d.toString().padStart(2, "0");
    horas.textContent = h.toString().padStart(2, "0");
    minutos.textContent = m.toString().padStart(2, "0");
    segundos.textContent = s.toString().padStart(2, "0");
  };
  actualizarContador();
  setInterval(actualizarContador, 1000);

  /* ==========================================================
     [10] MODAL
     ========================================================== */
  document.querySelector("#abrirModal")?.addEventListener("click", () => modal.setAttribute("aria-hidden", "false"));
  cerrarModal?.addEventListener("click", () => modal.setAttribute("aria-hidden", "true"));
  modal.addEventListener("click", (e) => e.target === modal && modal.setAttribute("aria-hidden", "true"));

  /* ==========================================================
     [11] FORM → WHATSAPP
     ========================================================== */
  formRSVP.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(formRSVP);
    const nombre = (f.get("nombre") || "Invitado").trim();
    const asiste = f.get("asiste");
    const extra = (f.get("extra") || "").trim();
    const msg = `Hola! Soy ${nombre} y ${
      asiste === "sí" ? "confirmo mi asistencia 🎉" : "no voy a poder asistir 😢"
    }${extra ? `\nMensaje: ${extra}` : ""}\n💗 (enviado desde la invitación de Rocío)`;
    window.open(`https://wa.me/${CONFIG.telefonoMama}?text=${encodeURIComponent(msg)}`, "_blank");
    formRSVP.reset();
    modal.setAttribute("aria-hidden", "true");
  });

  /* ==========================================================
     [12] MAPAS — UNIVERSAL FUNCIONAL
     ========================================================== */
  const mapsWebURL = CONFIG.direccionMaps;
  const mapsGeoURI = `geo:0,0?q=${encodeURIComponent(CONFIG.ubicacionTexto)}`;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const openMaps = (e) => {
    e.preventDefault();
    if (isMobile) {
      // intenta abrir la app de mapas
      window.location.href = mapsGeoURI;
      // fallback a versión web si la app no responde
      setTimeout(() => window.open(mapsWebURL, "_blank"), 800);
    } else {
      window.open(mapsWebURL, "_blank");
    }
  };

  btnMapsHero?.addEventListener("click", openMaps);
  btnMaps?.addEventListener("click", openMaps);

  /* ==========================================================
     [13] CALENDARIO (.ics)
     ========================================================== */
  btnCalendar?.addEventListener("click", () => {
    const start = toICSDate(CONFIG.fechaEvento);
    const endDate = new Date(CONFIG.fechaEvento);
    endDate.setHours(endDate.getHours() + 3);
    const end = toICSDate(endDate);
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Invitacion Hello Kitty//ES",
      "BEGIN:VEVENT",
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${CONFIG.tituloEvento}`,
      `DESCRIPTION:${CONFIG.descripcionEvento}`,
      `LOCATION:${CONFIG.ubicacionTexto}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cumple-rocio.ics";
    a.click();
    URL.revokeObjectURL(url);
  });

  /* ==========================================================
     [14] LIGHTBOX
     ========================================================== */
  const lightbox = document.querySelector("#lightbox");
  const lbImg = document.querySelector("#lbImg");
  const lbCap = document.querySelector("#lbCap");
  const lbClose = document.querySelector("#lbClose");
  document.querySelectorAll(".g-item img").forEach((img) =>
    img.addEventListener("click", () => {
      lbImg.src = img.dataset.full || img.src;
      lbCap.textContent = img.alt || "";
      lightbox.hidden = false;
    })
  );
  lbClose?.addEventListener("click", () => (lightbox.hidden = true));
  document.addEventListener("keydown", (e) => e.key === "Escape" && (lightbox.hidden = true));

  /* ==========================================================
     [15] FOOTER
     ========================================================== */
  if (footerSmall) {
    const year = new Date().getFullYear();
    footerSmall.innerHTML = `&copy; ${year} — diseñado por <a href="https://rodrigobrun.github.io/PORTFOLIO_RB/" target="_blank" rel="noopener">Rodrigo Brun</a>`;
  }

  /* ==========================================================
     [16] AÑO
     ========================================================== */
  anioActual.textContent = new Date().getFullYear();
});
