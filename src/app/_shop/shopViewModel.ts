import { action, computed, observable } from "mobx";

import { IFlavoursClient } from "../../core/api/flavoursClient";
import { IFlavour } from "../../core/entities";
import { ICashDrawerService } from "../../core/services/cashDrawerService";
import {
	FlavourDoesNotExistsResponse,
	IncorrectPaymentAmountResponse,
	IResponse,
	OrderDoesNotExistsResponse,
	RanOutOfFlavoursResponse,
	SuccesfulPaymentResponse,
} from "./dtos/responses";
import { Order } from "./entities/order";
import { IShoppingCart } from "./entities/shoppingCart";

export interface IShopViewModel {
	flavours: IFlavour[] | undefined;
	cart: IShoppingCart;

	createNewOrder: () => void;
	cancelOrder: () => void;
	onSelectFlavour: (flavour: IFlavour) => void;
	payOrder: (payment: number) => Promise<IResponse<number>>;
}

export class ShopViewModel implements ShopViewModel {
	@observable private _flavours: IFlavour[] | undefined;
	@observable cart: IShoppingCart;

	constructor(
		private client: IFlavoursClient,
		private drawerService: ICashDrawerService
	) {
		this.cart = { activeOrder: undefined };
		this.loadAllFlavours();
	}

	@computed
	get flavours(): IFlavour[] | undefined {
		return this._flavours && this._flavours.filter((f) => f.amount > 0);
	}

	@computed
	get enableSelectFlavours(): boolean {
		return !!this.cart.activeOrder && !this.cart.activeOrder.completed;
	}

	@action.bound
	public onSelectFlavour(flavour: IFlavour): IResponse<null> {
		if (!this.cart.activeOrder || !this.enableSelectFlavours) {
			const order = new Order();
			this.cart.activeOrder = order;
			this.cart.activeOrder.addFlavour(flavour);
			// return new SelectFlavourRequiresOrderResponse();
		}

		if (!this._flavours || !this.flavours || this.flavours.length === 0) {
			return new RanOutOfFlavoursResponse();
		}

		const flavourIndex = this.flavours.findIndex((f) => f.id === flavour.id);
		if (flavourIndex < 0) {
			return new FlavourDoesNotExistsResponse();
		}

		this.cart.activeOrder.addFlavour(flavour);
		this._flavours[flavourIndex].amount--;

		return { success: true };
	}

	@action.bound
	public createNewOrder(): void {
		const order = new Order();
		this.cart.activeOrder = order;
	}

	@action.bound
	public async payOrder(payment: number): Promise<IResponse<number>> {
		if (this.cart.activeOrder) {
			if (payment < this.cart.activeOrder.price) {
				return new IncorrectPaymentAmountResponse(payment);
			}

			return await this.pushPaymentToDrawer(
				payment,
				this.cart.activeOrder.price
			);
		}

		return new OrderDoesNotExistsResponse();
	}

	@action.bound
	public cancelOrder() {
		this.cart.activeOrder = undefined;
	}

	@action
	private loadAllFlavours = async () => {
		const apiFlavours = await this.client.getFlavours();
		this._flavours = apiFlavours;
	};

	private async pushPaymentToDrawer(
		payment: number,
		price: number
	): Promise<IResponse<number>> {
		await this.drawerService.pushMoneyToDrawer(price);
		this.drawerService.close();
		return new SuccesfulPaymentResponse(payment - price);
	}
}
