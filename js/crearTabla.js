//Crear una tabla con los datos de forma dinámica
const eventListenersCheckboxes = () => {
	const checkboxes = document // obtengo checkboxes
		.querySelector('#campos-mostrados-checkboxes')
		.querySelectorAll('input');

	checkboxes.forEach((checkbox) => {
		//por cada checkbox
		checkbox.addEventListener('click', (ev) => {
			// le agrego event listener
			const dataTable = document.querySelector('table'); // obtengo la tabla

			// Array.from() convierte la HTMLCollection o NodeList a un array simple
			const tableHeader = Array.from(
				dataTable.getElementsByTagName('th')
			); // obtengo los headers
			const indexOfHeader = tableHeader.indexOf(
				// obtengo el index del header correcto, segun el value del checkbox
				tableHeader.filter(
					(column) =>
						column.innerText.toLocaleLowerCase() === ev.target.value
				)[0]
			);

			// escondo el header si el checkbox no está checkeado, o lo muestro en caso contrario
			tableHeader[indexOfHeader].style.display = ev.target.checked
				? 'table-cell'
				: 'none';

			const tableBodyRows = Array.from(
				// obtengo las tr del tableBody
				dataTable.querySelector('tbody').querySelectorAll('tr')
			);

			tableBodyRows.forEach((row) => {
				// busco las rows desde el body
				const rowData = row.querySelectorAll('td'); // obtengo la HTMLCollection de tds de cada row

				rowData[indexOfHeader].style.display = ev.target.checked // la escondo o muestro dependiendo de si está checkeado o no el checkbox
					? 'table-cell'
					: 'none';
			});
		});
	});
};

export const crearTabla = (data) => {
	//cargo el thead
	const tabla = document.createElement('table');
	const thead = document.createElement('thead');
	const tbody = document.createElement('tbody');
	tbody.className += 'table-striped';

	const cabecera = document.createElement('tr');
	eventListenersCheckboxes();

	for (const key in data[0]) {
		if (key !== 'id') {
			// Si la key es diferente a id, la añadimos a la cabecera

			const th = document.createElement('th');
			const contenido = document.createTextNode(key);

			th.appendChild(contenido);
			cabecera.appendChild(th);
		}
	}
	thead.appendChild(cabecera);
	tabla.appendChild(thead);
	//cargo el tbody
	data.forEach((element) => {
		const tr = document.createElement('tr');
		for (const key in element) {
			if (key === 'id') {
				tr.setAttribute('data-id', element[key]);
			} else {
				const td = document.createElement('td');
				// td.addEventListener('click', handleclick);
				td.textContent = element[key];
				//td.innerText = element[key];   <-- Esto es lo mismo que el anterior
				tr.appendChild(td);
			}
		}
		tbody.appendChild(tr);
	});

	tabla.appendChild(tbody);

	return tabla;
};
