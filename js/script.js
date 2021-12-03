import { Anuncio_Objeto } from './Anuncio_Objeto.js';
import { crearTabla } from './crearTabla.js'; //Importamos la función crearTablacc

export const anuncios = JSON.parse(localStorage.getItem('anuncios')) || [];

export { divSpinner };
const $formulario = document.forms[0];
const $divTabla = document.getElementById('divTabla');
const divSpinner = document.querySelector('.spinner');
const formButtons = $formulario && $formulario.querySelectorAll('button');

let submitType = null;
actualizarTabla();

localStorage.setItem('anuncios', JSON.stringify(anuncios));

console.log(anuncios);
Array.from(formButtons).forEach((button) =>
	button.addEventListener('click', (ev) => {
		submitType = ev.target.innerText.toLowerCase();
	})
);

function limpiarTabla() {
	while ($divTabla.hasChildNodes()) {
		$divTabla.removeChild($divTabla.firstChild);
	}
}
//#region [rgba(20, 150, 90, 0.1)] TABLA Y FORMULARIOS]
//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los elementos HTML presentes.
// document.addEventListener('DOMContentLoaded', function(e) {
//     getPersonas();
// });

//DEVUELVE EL ID SELECCIONADO DE LA TABLA Y LO BUSCA. LO DEVUELVE Y SE CARGA EN EL FORMULARIO
window.addEventListener('click', (e) => {
	if (e.target.matches('td')) {
		const id = e.target.parentElement.dataset.id;
		const anuncioElegido = anuncios.find((anuncio) => anuncio.id == id);
		cargarFormulario(anuncioElegido);
	} else if (e.target.matches('#btnCancelar')) {
		toggleButtons(true);
		$formulario.reset();
	}
});

// CARGA FORMULARIO CON DATOS DE LA TABLA
function cargarFormulario(transaccion) {
	toggleButtons(false);
	const {
		txtId,
		txtTitulo,
		F_transaccion,
		txtDescripcion,
		txtPrecio,
		txtPuertas,
		txtKms,
		txtCantidadPotencia,
	} = $formulario;

	txtId.value = transaccion.id;
	txtTitulo.value = transaccion.titulo;
	F_transaccion.value = transaccion.F_transaccion;
	txtDescripcion.value = transaccion.descripcion;
	txtPrecio.value = transaccion.precio;
	txtPuertas.value = transaccion.puertas;
	txtKms.value = transaccion.kms;
	txtCantidadPotencia.value = transaccion.potencia;
}

const handleFormSubmit = (e) => {
	e.preventDefault(); //para que no se recargue la página
	const textoDeAlerta = `¿Está seguro que desea ${submitType}?`;
	alerta(textoDeAlerta);
};

$formulario.addEventListener('submit', handleFormSubmit);

function submitForm() {
	const {
		txtId,
		txtTitulo,
		F_transaccion,
		txtDescripcion,
		txtPrecio,
		txtPuertas,
		txtKms,
		txtCantidadPotencia,
	} = $formulario;

	//Debe estar tal cual el HTML
	const form_anuncio = new Anuncio_Objeto(
		txtId.value,
		txtTitulo.value,
		F_transaccion.value,
		txtDescripcion.value,
		txtPrecio.value,
		txtPuertas.value,
		txtKms.value,
		txtCantidadPotencia.value
	);
	const id = getMaxId();
	console.log(txtPuertas);

	if (form_anuncio.id === '') {
		form_anuncio.id = id + 1;
		handlerCrear(form_anuncio);
	} else if (submitType === 'eliminar') {
		handlerEliminar($formulario.txtId.value);
	} else {
		handlerModificar(form_anuncio);
	}
	$formulario.reset();
}
//#endregion
function getMaxId() {
	if (anuncios.length == 0) {
		return 0;
	} else {
		return anuncios.reduce((prev, current) =>
			prev.id > current.id ? prev : current
		).id;
	}
}
//#region [rgba(0, 100, 500, 0.1)] HANDLERS]

// Creación de elemento de tabla
const handlerCrear = (nuevoAnuncio) => {
	anuncios.push(nuevoAnuncio);
	actualizarStorage(anuncios);
	actualizarTabla();
};

// Eliminar elemento de la tabla
const handlerEliminar = (id) => {
	const indice = anuncios.findIndex((anuncio) => {
		return anuncio.id == id;
	});

	console.log(indice);

	anuncios.splice(indice, 1);
	const localAnuncios = JSON.parse(localStorage.getItem('anuncios'));
	localAnuncios.splice(indice, 1);
	localStorage.setItem('anuncios', JSON.stringify(localAnuncios));

	limpiarTabla();
	actualizarTabla(anuncios);
};

// Modificar elemento de la tabla, recibe el objeto no el ID.
const handlerModificar = (anuncioModificar) => {
	let indice = anuncios.findIndex((anuncio) => {
		return anuncio.id == anuncioModificar.id;
	});

	anuncios.splice(indice, 1);
	anuncios.push(anuncioModificar);

	limpiarTabla();
	actualizarTabla(anuncios);
	$formulario.reset();
};
//#endregion

const actualizarStorage = (data) => {
	localStorage.setItem('anuncios', JSON.stringify(data));
};

function toggleButtons(hide) {
	const botonEnviar = document.getElementById('btnAgregar');
	const botonEliminar = document.getElementById('btnEliminar');
	const botonCancelar = document.getElementById('btnCancelar');
	const botonModificar = document.getElementById('btnModificar');
	const botonesDeEdicion = [botonEliminar, botonCancelar, botonModificar];

	if (hide) {
		botonEnviar.style.display = 'block';
		botonesDeEdicion.map((boton) => (boton.style.display = 'none'));
	} else {
		botonEnviar.style.display = 'none';
		botonesDeEdicion.map((boton) => (boton.style.display = 'block'));
	}
}

function alerta(texto) {
	const divAlert = document.getElementById('custom-alert');
	divAlert.style.display = 'flex';

	divAlert.innerHTML = `
	<div class="alert-container">
		<p>${texto}</p>
		<div class="d-flex justify-content-end w-100">
			<button id="boton-confirmar" class="bg-green">Confirmar</button>
			<button id="boton-cancelar" class="bg-red">Cancelar</button>
		</div>
	</div>
    `;
	const borrarAlerta = () => {
		divAlert.innerHTML = '';
		divAlert.style.display = 'none';
	};

	const botonConfirmar = document.getElementById('boton-confirmar');

	botonConfirmar.addEventListener('click', () => {
		submitForm();
		borrarAlerta();
	});

	const botonCancelar = document.getElementById('boton-cancelar');

	botonCancelar.addEventListener('click', () => {
		submitType = null;
		borrarAlerta();
	});
}

function crearSpinner() {
	const spinnerContainer = document.createElement('div');
	spinnerContainer.className = 'spinner-wheel-container';
	const spinner = document.createElement('img');
	spinner.className = 'spinner-wheel';
	spinner.setAttribute('src', './resources/wheelspin.gif');
	spinner.setAttribute('alt', 'loadinh');
	spinnerContainer.appendChild(spinner);
	return spinnerContainer;
}

function actualizarTabla(nuevaLista) {
	if (localStorage.length !== 0) {
		while ($divTabla.hasChildNodes()) {
			$divTabla.removeChild($divTabla.firstElementChild);
		}
		$divTabla.appendChild(crearSpinner());

		setTimeout(() => {
			while ($divTabla.hasChildNodes()) {
				$divTabla.removeChild($divTabla.firstElementChild);
			}
			const data = JSON.parse(localStorage.getItem('anuncios'));
			if (data) {
				sortTabla(nuevaLista || anuncios);
				$divTabla.appendChild(crearTabla(nuevaLista || anuncios));
			}
		}, 3000);
	}
}

function sortTabla(array) {
	array.sort((a, b) => {
		return a.titulo - b.titulo;
	});

	function promedio(ev) {
		let listaFiltrada = [];
		if (ev.target.value !== 'todos') {
			listaFiltrada = anuncios.filter(
				(anuncio) => anuncio.F_transaccion === ev.target.value
			);
		} else {
			listaFiltrada = anuncios;
		}
		const suma = listaFiltrada.reduce(
			(acc, cur) => acc + parseFloat(cur.precio),
			0
		);

		const promedio = suma / listaFiltrada.length;
		const promedioFiltrado = document.getElementById('txtPrecioFilter');
		promedioFiltrado.value = promedio;
	}

	listTransaccionesFiltrado.addEventListener('change', (ev) => {
		const input = document.getElementById('listTransaccionesFiltrado');
		const election = input.value;

		if (election === 'todos') {
			limpiarTabla();
			actualizarTabla(anuncios);
		} else {
			const misAnuncios = JSON.parse(localStorage.getItem('anuncios'));
			let listaFiltrada = misAnuncios
				.filter((a) => a.F_transaccion === election)
				.map((a) => a);
			limpiarTabla();
			actualizarTabla(listaFiltrada);
		}
		promedio(ev);
	});

	const limpiarSpinner = () => {
		while (divSpinner.hasChildNodes()) {
			divSpinner.removeChild(divSpinner.firstChild);
		}
	};
}
