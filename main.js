let registrosActivos = [];

function mostrarAlerta(mensaje) {
    let alerta = document.querySelector(".cont_alert");
    alerta.textContent = mensaje;
    alerta.classList.remove("alert2");
    alerta.classList.add("alert2");
    setTimeout(() => {
        alerta.textContent = "";
        alerta.classList.remove("alert2");
    }, 2000);
}

function registrar() {
    let formulario = document.querySelector('.cont_for');
    formulario.style.left = '50%';
}

function cerrar() {
    let formulario = document.querySelector('.cont_for');
    formulario.style.left = '-100%';
    document.getElementById('nombreMascota').value = '';
    document.getElementById('nombrePropietario').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('tipoMascota').value = '0';
    document.getElementById('fechaCita').value = '';
    document.getElementById('horaCita').value = '';
    document.getElementById('sintomas').value = '';
}

function enviar() {
    let nombreMascota = document.getElementById('nombreMascota').value;
    let nombrePropietario = document.getElementById('nombrePropietario').value;
    let telefono = document.getElementById('telefono').value;
    let tipoMascota = document.getElementById('tipoMascota').value;
    let fechaCita = document.getElementById('fechaCita').value;
    let horaCita = document.getElementById('horaCita').value;
    let sintomas = document.getElementById('sintomas').value;
    let formulario = document.querySelector('.cont_for');

    if (!nombreMascota || !nombrePropietario || !telefono || tipoMascota === '0' || !fechaCita || !horaCita || !sintomas) {
        mostrarAlerta('Por favor, complete todos los campos del formulario.');
        return;
    }

    if (telefono.length < 9) {
        mostrarAlerta('Ingrese un número de teléfono válido (mínimo 9 dígitos)');
        return;
    }

    let fechaActual = new Date();

    if (new Date(fechaCita) <= fechaActual) {
        mostrarAlerta('Seleccione una fecha de cita mayor a la fecha actual');
        return;
    }

    let horaCitaFormato24 = parseInt(horaCita.split(':')[0]);
    if (horaCitaFormato24 < 9 || horaCitaFormato24 > 17) {
        mostrarAlerta('Seleccione una hora de cita válida (entre las 9:00 y las 17:00).');
        return;
    }

    mostrarAlerta('Formulario enviado con éxito!');

    document.getElementById('nombreMascota').value = '';
    document.getElementById('nombrePropietario').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('tipoMascota').value = '0';
    document.getElementById('fechaCita').value = '';
    document.getElementById('horaCita').value = '';
    document.getElementById('sintomas').value = '';

    if (tipoMascota === '1') {
        mascota = 'Perro';
        img = './img/img perro.jpg';
    }
    else if (tipoMascota === '2') {
        mascota = 'Gato';
        img = './img/img gato.jpg';
    }
    else if (tipoMascota === '3') {
        mascota = 'ave';
        img = './img/img ave.jpg';
    }
    else {
        mascota = 'otro';
    }

    let registro = {
        id: registrosActivos.length + 1,
        img: img,
        nombreMascota: nombreMascota,
        nombrePropietario: nombrePropietario,
        telefono: telefono,
        tipoMascota: mascota,
        fechaCita: fechaCita,
        horaCita: horaCita,
        sintomas: sintomas,
        estado: "activa"
    };

    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img class="img_mascota" src="${img}">
        <p class="text_tipo">${mascota}</p>
        <p class="text_mascota">${nombreMascota}</p>
        <p class="text_propietario">${nombrePropietario}</p>
        <p class="text_fecha">${fechaCita}</p>
        <p class="text_hora">${horaCita}</p>
        <p class="text_sintomas">${sintomas}</p>
        <button class="btn_activar" onclick="abrirCard(${registro.id})">Activar</button>
        <button class="btn_cerrar_card" onclick="cerrarCard(${registro.id})">Cerrar</button>
        <button class="btn_anular" onclick="anularCard(${registro.id})">Anular</button>
        <button class="btn_editar" onclick="editarCard(${registro.id})">Editar</button>
    `;

    let contActivas = document.querySelector('.cont_activas');
    contActivas.appendChild(card);

    registro.card = card;

    registrosActivos.push(registro);

    formulario.style.left = '-100%';
}

function abrirCard(id) {
    let index = registrosActivos.findIndex(registro => registro.id === id);

    if (index !== -1) {
        registrosActivos[index].estado = 'activa';
        renderizarCards();
    }
}

function cerrarCard(id) {
    let index = registrosActivos.findIndex(registro => registro.id === id);

    if (index !== -1) {
        registrosActivos[index].estado = 'cerrada';
        renderizarCards();
    }
}

function anularCard(id) {
    let index = registrosActivos.findIndex(registro => registro.id === id);

    if (index !== -1) {
        registrosActivos[index].estado = 'anulada';
        renderizarCards();
    }
}


function renderizarCards() {
    let contActivas = document.querySelector('.cont_activas');
    let contCerradas = document.querySelector('.cont_cerradas');
    let contAnuladas = document.querySelector('.cont_anuladas');

    contActivas.innerHTML = '';
    contCerradas.innerHTML = '';
    contAnuladas.innerHTML = '';

    registrosActivos.forEach(registro => {
        let card = registro.card.cloneNode(true);

        card.querySelectorAll('button').forEach(btn => btn.remove());

        let btnAbrir = document.createElement('button');
        btnAbrir.textContent = 'Activar';
        btnAbrir.onclick = () => abrirCard(registro.id);
        card.appendChild(btnAbrir);

        let btnCerrar = document.createElement('button');
        btnCerrar.textContent = 'Cerrar';
        btnCerrar.onclick = () => cerrarCard(registro.id);
        card.appendChild(btnCerrar);

        let btnAnular = document.createElement('button');
        btnAnular.textContent = 'Anular';
        btnAnular.onclick = () => anularCard(registro.id);
        card.appendChild(btnAnular);

        let btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => editarCard(registro.id);
        card.appendChild(btnEditar);

        if (registro.estado === 'activa') {
            contActivas.appendChild(card);
        } else if (registro.estado === 'cerrada') {
            contCerradas.appendChild(card);
        } else if (registro.estado === 'anulada') {
            contAnuladas.appendChild(card);
        }
    });
}


function verActivas() {
    let activas = document.querySelector('.cont_activas');
    let cerradas = document.querySelector('.cont_cerradas');
    let anuladas = document.querySelector('.cont_anuladas');

    activas.style.display = "flex";
    cerradas.style.display = "none";
    anuladas.style.display = "none";
}

function verCerradas() {
    let activas = document.querySelector('.cont_activas');
    let cerradas = document.querySelector('.cont_cerradas');
    let anuladas = document.querySelector('.cont_anuladas');

    activas.style.display = "none";
    cerradas.style.display = "flex";
    anuladas.style.display = "none";
}

function verAnuladas() {
    let activas = document.querySelector('.cont_activas');
    let cerradas = document.querySelector('.cont_cerradas');
    let anuladas = document.querySelector('.cont_anuladas');

    activas.style.display = "none";
    cerradas.style.display = "none";
    anuladas.style.display = "flex";
}

function editarCard(id) {
    let index = registrosActivos.findIndex(registro => registro.id === id);

    if (index !== -1) {
        let registro = registrosActivos[index];

        mostrarFormularioEdicion(registro, index);
    }
}

function mostrarFormularioEdicion(registro, index) {
    let formularioEdicion = document.querySelector('.cont_for');

    formularioEdicion.querySelector('#nombreMascota').value = registro.nombreMascota;
    formularioEdicion.querySelector('#nombrePropietario').value = registro.nombrePropietario;
    formularioEdicion.querySelector('#telefono').value = registro.telefono;
    let mascotaId;
    if (registro.tipoMascota === "Perro") {
        mascotaId = 1;
    } else if (registro.tipoMascota === "Gato") {
        mascotaId = 2;
    } else if (registro.tipoMascota === "Ave") {
        mascotaId = 3;
    } else {
        mascotaId = 4;
    }
    formularioEdicion.querySelector('#tipoMascota').value = mascotaId;
    formularioEdicion.querySelector('#fechaCita').value = registro.fechaCita;
    formularioEdicion.querySelector('#horaCita').value = registro.horaCita;
    formularioEdicion.querySelector('#sintomas').value = registro.sintomas;

    let btnEnviar = formularioEdicion.querySelector('.btn_enviar');
    btnEnviar.onclick = function () {
        actualizarRegistro(registro, index);
    };

    formularioEdicion.style.left = '50%';
}

function actualizarRegistro(registro, index) {
    registro.nombreMascota = document.getElementById('nombreMascota').value;
    registro.nombrePropietario = document.getElementById('nombrePropietario').value;
    registro.telefono = document.getElementById('telefono').value;
    registro.tipoMascota = document.getElementById('tipoMascota').value;
    registro.fechaCita = document.getElementById('fechaCita').value;
    registro.horaCita = document.getElementById('horaCita').value;
    registro.sintomas = document.getElementById('sintomas').value;

    registro.card.querySelector('.text_mascota').textContent = registro.nombreMascota;
    registro.card.querySelector('.text_propietario').textContent = registro.nombrePropietario;
    
    let formularioEdicion = document.querySelector('.cont_for');
    let btnEnviar = formularioEdicion.querySelector('.btn_enviar');
    btnEnviar.onclick = function () {
        enviar();
    };
    cerrar();
}