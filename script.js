// FOTOS + RESPUESTA CORRECTA
const fotos = [
    { archivo: "img/foto1.jpg", correcta: "Dani", seleccion: null },
    { archivo: "img/foto2.jpg", correcta: "Vero", seleccion: null },
	{ archivo: "img/foto3.jpg", correcta: "Juan", seleccion: null },
	{ archivo: "img/foto4.jpg", correcta: "Ana", seleccion: null },
];

// OPCIONES DISPONIBLES
const opciones = ["Dani", "Vero", "Juan", "Ana"];

const container = document.getElementById("game-container");


// === GENERAR FOTOS ===
fotos.forEach((foto, idx) => {

    const div = document.createElement("div");
    div.className = "foto-item";

    div.innerHTML = `
        <div class="menu-sobre-foto" id="menu-${idx}">
            <div class="menu-close" id="close-${idx}">✕</div>
        </div>

        <img class="foto-img" src="${foto.archivo}" id="img-${idx}">
        <div class="nombre-elegido" id="nombre-${idx}"></div>
        <div class="overlay" id="overlay-${idx}"></div>
    `;

    container.appendChild(div);

    const menu = document.getElementById(`menu-${idx}`);
    const img = document.getElementById(`img-${idx}`);
    const closeBtn = document.getElementById(`close-${idx}`);

    // Crear opciones dentro del menú
    opciones.forEach(nombre => {
		const op = document.createElement("div");
		op.className = "menu-opcion";
		op.textContent = nombre;

		op.addEventListener("click", () => {

			// 1) Si seleccionó el MISMO nombre → solo cerrar
			if (foto.seleccion === nombre) {
				menu.style.display = "none";
				img.classList.remove("foto-blur");
				return;
			}

			// 2) Selección nueva → actualizar
			foto.seleccion = nombre;

			// MOSTRAR NOMBRE (antes oculto)
			const nombreDiv = document.getElementById(`nombre-${idx}`);
			nombreDiv.textContent = nombre;
			nombreDiv.classList.add("show");


			// Resetear overlay de ESTA foto
			const overlay = document.getElementById(`overlay-${idx}`);
			overlay.className = "overlay";
			overlay.textContent = "";

			// Cerrar menú
			menu.style.display = "none";
			img.classList.remove("foto-blur");
		});

		menu.appendChild(op);
	});


    // Abrir menú al tocar la foto
    img.addEventListener("click", () => {
        const visible = menu.style.display === "flex";
        menu.style.display = visible ? "none" : "flex";
        img.classList.toggle("foto-blur", !visible);
    });

    // Cerrar menú con la X
    closeBtn.addEventListener("click", () => {
        menu.style.display = "none";
        img.classList.remove("foto-blur");
    });
});


// === CHECK ===
document.getElementById("check-btn").addEventListener("click", () => {

    // Cerrar todos los menús abiertos
    fotos.forEach((_, idx) => {
        document.getElementById(`menu-${idx}`).style.display = "none";
        document.getElementById(`img-${idx}`).classList.remove("foto-blur");
    });

    // Evaluar respuestas
    fotos.forEach((foto, idx) => {
        const overlay = document.getElementById(`overlay-${idx}`);
        overlay.className = "overlay";

        if (foto.seleccion === foto.correcta) {
            overlay.textContent = "✔ Correcto";
            overlay.classList.add("correcto");
        } else {
            overlay.textContent = "✘ Incorrecto";
            overlay.classList.add("incorrecto");
        }
    });
});
