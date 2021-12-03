export const crearListadoIndex = (data) => {
	console.log(data);
	const allCards = document.createElement('div');
	allCards.className = 'container';
	//para generar la tabla con cada elemento del listado
	let cardsRow = document.createElement('div');
	cardsRow.className = 'cards-row';

	data.forEach(
		({
			titulo,
			F_transaccion,
			descripcion,
			precio,
			puertas,
			kms,
			potencia,
		}) => {
			const card = document.createElement('div');
			card.className = 'card-container col-12 col-md-6 p-3';

			card.innerHTML = `
			<div class="card">
				<div class="card-header">
					<h2>${titulo}</h2>
				</div>
				<div class="card-body">
					<div class="card-first-half">
						<div class="first-half-text">
							<h3>${F_transaccion}</h3>
							<p>${descripcion}</p>
						</div>
						<div class="first-half-img">
							<img class="img-fluid m-auto" src="./resources/auto-anuncio.jpeg" />
						</div>
					</div>
					<div class="card-second-half">
						<div class="second-half-icon text-green center-items">
							<i class="fas fa-dollar-sign"></i>
							<p>precio</p>
							<div>${precio}</div>
						</div>
						<div class="second-half-icon text-purple center-items">
							<i class="fas fa-door-open"></i>
							<p>puertas</p>
							<div>${puertas}</div>
						</div>
						<div class="second-half-icon text-blue center-items">
							<i class="fas fa-tachometer-alt"></i>
							<p>kms</p>
							<div>${kms}</div>
						</div>
						<div class="second-half-icon text-red center-items">
							<i class="fas fa-car-battery"></i>
							<p>potencia</p>
							<div>${potencia}</div>
						</div>
					</div>
				</div>
			</div>
			`;

			const addCardToRow = () => {
				cardsRow.appendChild(card);
			};
			const addRowToAllCards = () => {
				allCards.appendChild(cardsRow);
			};
			const resetCardsRow = () => {
				cardsRow = document.createElement('div');
				cardsRow.className = 'cards-row';
			};

			const cardsAmount = cardsRow.childNodes.length;

			if (cardsAmount < 2) {
				addCardToRow();
			} else {
				addRowToAllCards();
				resetCardsRow();
				addCardToRow();
			}
		}
	);

	if (cardsRow.childNodes.length) {
		allCards.appendChild(cardsRow);
	}

	return allCards;
};
