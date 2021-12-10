import * as mobx from "mobx";
import { Flavour, IFlavour } from "./entities/flavour";
import { IShoppingCart, ShoppingCart } from "./entities/shoppingCart";
import delay from "./delay";

export class ShopStore {
	shoppingCart: IShoppingCart;
	@mobx.observable private _flavours: IFlavour[] | undefined;

	constructor() {
		this.shoppingCart = new ShoppingCart();
	}

	@mobx.computed
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
			flavour.amountLeft--;
		}
	}

	public removeFlavourFromShoppingCart(flavourName: string) {
		const flavour = this._flavours?.find((f) => f.name === flavourName);
		if (flavour && this.itemExistsInShoppingCart(flavour.name)) {
			this.shoppingCart.removeItem(flavourName);
			flavour.amountLeft++;
		}
	}

	private async loadFlavours(): Promise<void> {
		const flavours = await this.fetchFlavours();
		mobx.runInAction(() => {
			this._flavours = flavours;
		})
	}

	private fetchFlavours = async (): Promise<Flavour[]> => {
		await delay(2000);
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

	private itemExistsInShoppingCart(itemName: string) {
		return this.shoppingCart.orders.find((o) => o.item.name === itemName);
	}

}
