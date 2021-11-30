import { observable, computed } from "mobx";

type CreateFlavourArgs = { name: string; price: number; amount?: number };
export interface IFlavour {
	name: string;
	amountLeft: number;
	price: number;
	isOutOfStock: boolean;
}

export class Flavour implements IFlavour {
	name: string;
	price: number;

	@observable private _amountLeft: number;
	constructor(args: CreateFlavourArgs) {
		this.name = args.name;
		this.price = args.price;
		this._amountLeft = args.amount || 0;;
	}

	@computed
	get amountLeft() {
		return this._amountLeft;
	}
	set amountLeft(v: number) {
		this._amountLeft = v;
	}

	@computed
	get isOutOfStock() {
		return this.amountLeft === 0
	}

}
