import { observable, computed, action } from "mobx";
import { Flavour, IFlavour } from "./entities/flavour";
import { IShoppingCart, ShoppingCart } from "./entities/shoppingCart";

export class ShopStore {
	cart: IShoppingCart;
	@observable private _flavours: IFlavour[] | undefined;

	constructor() {
		this.cart = new ShoppingCart();
		this.getFlavours();
	}

	@computed
	get flavours() {
		return this._flavours;
	}

	@computed
	get enablePay() {
		return this.cart.totalPrice > 0;
	}

	public onAddFlavour(flavourName: string) {
		const flavour =
			this._flavours && this._flavours.find((f) => f.name === flavourName);
		if (flavour) {
			this.cart.addOrder(flavour.name, flavour.price);
			flavour.amountLeft--;
		}
	}

	public onRemoveFlavour(flavourName: string) {
		const flavour =
			this._flavours && this._flavours.find((f) => f.name === flavourName);
		if (flavour) {
			const existingOrderInCart = this.cart.orders.find(
				(o) => o.item.name === flavour.name
			);
			if (existingOrderInCart) {
				flavour.amountLeft++;
			}
			this.cart.removeOrder(flavour.name);
		}
	}

	public pay(paymnet: number) {
		if (this.enablePay) {
			this.cart.pay(paymnet);
		}
	}

	@action.bound
	private async getFlavours(): Promise<void> {
		await this.delay(2000);
		this._flavours = [
			new Flavour({
				name: "cream",
				price: 8,
				amount: 2,
			}),
			new Flavour({
				name: "sunday",
				price: 8,
				amount: 10,
			}),
			new Flavour({
				name: "creampie",
				price: 8,
				amount: 10,
			}),
			new Flavour({
				name: "iceCreamBowl",
				price: 8,
				amount: 10,
			}),
		];
	}

	private delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
