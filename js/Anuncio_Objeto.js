import Anuncio from './Anuncio.js';

export class Anuncio_Objeto extends Anuncio {
	constructor(
		id,
		titulo,
		F_transaccion,
		descripcion,
		precio,
		puertas,
		kms,
		potencia
	) {
		super(id, titulo, F_transaccion, descripcion, precio);
		this.puertas = puertas;
		this.kms = kms;
		this.potencia = potencia;
	}
}
