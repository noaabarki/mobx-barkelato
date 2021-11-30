import { computed, observable, runInAction } from "mobx";
import { Flavour, IFlavour } from "./entities/flavour";
import { IShoppingCart, ShoppingCart } from "./entities/shoppingCart";

export class ShopStore {
	shoppingCart: IShoppingCart;
	@observable private _flavours: IFlavour[] | undefined;

	constructor() {
		this.shoppingCart = new ShoppingCart();
		this.loadFlavours();
	}

	@computed
	get flavours() {
		if (!this._flavours) {
			this.loadFlavours();
		}

		return this._flavours;
	}


	public addFlavourToShoppingCart(flavourName: string) {
		const flavour = this._flavours?.find((f) => f.name === flavourName);
		if (flavour) {
			this.shoppingCart.addItem({ ...flavour });
			flavour.amountLeft++;
		}
	}

	public removeFlavourFromShoppingCart(flavourName: string) {
		const flavour = this._flavours?.find((f) => f.name === flavourName);
		if (flavour) {
			this.shoppingCart.removeItem(flavourName);
			flavour.amountLeft--;
		}
	}

	@computed
	get enablePay() {
		return this.shoppingCart.totalPrice > 0;
	}

	public pay(paymnet: number) {
		if (this.enablePay) {
			this.shoppingCart.pay(paymnet);
		}
	}

	private loadFlavours = async (): Promise<void> => {
		const flavours = await this.fetchFlavours();
		runInAction(() => {
			this._flavours = flavours;
		})
	}

	private fetchFlavours = async (): Promise<Flavour[]> => {
		await this.delay(2000);
		return [
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
