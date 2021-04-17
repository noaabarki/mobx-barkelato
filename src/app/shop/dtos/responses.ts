export interface IResponse<T> {
	success: boolean;
	data?: T | null;
	error?: string;
}

abstract class Response<T> implements IResponse<T> {
	public success: boolean;
	public data?: T | null;

	constructor() {
		this.success = false;
		this.data = null;
	}
}
export class SelectFlavourRequiresOrderResponse extends Response<null> {
	public error: string;
	constructor() {
		super();
		this.error = "create an order to select flavour";
	}
}

export class RanOutOfFlavoursResponse extends Response<null> {
	public error: string;
	constructor() {
		super();
		this.error = "we ran out of flavours";
	}
}

export class FlavourDoesNotExistsResponse extends Response<null> {
	public error: string;
	constructor() {
		super();
		this.error = "we don't have this flavour";
	}
}

export class InvalidServingTypeResponse extends Response<boolean> {
	public error: string;
	constructor() {
		super();
		this.data = false;
		this.error = "invalid type: must be bowl or cone";
	}
}

export class IncorrectPaymentAmountResponse extends Response<number> {
	public error: string;
	constructor(data: number) {
		super();
		this.data = data;
		this.error = `incorrect payment`;
	}
}

export class SuccesfulPaymentResponse extends Response<number> {
	constructor(charge?: number) {
		super();
		this.success = true;
		this.data = charge;
	}
}

export class OrderDoesNotExistsResponse extends Response<null> {
	constructor() {
		super();
		this.success = false;
	}
}
