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
	SelectFlavourRequiresOrderResponse,
	SuccesfulPaymentResponse,
} from "./dtos/responses";
import { IOrder, Order } from "./entities/order";

export interface IShopViewModel {
	flavours: IFlavour[] | undefined;
	currentOrder: IOrder | undefined;

	initNewOrder: () => void;
	onSelectFlavour: (flavour: IFlavour) => void;
	payOrder: (payment: number) => Promise<IResponse<number>>;
}

export class ShopViewModel implements ShopViewModel {
	@observable private _flavours: IFlavour[] | undefined;
	@observable currentOrder: IOrder | undefined;

	constructor(
		private client: IFlavoursClient,
		private drawerService: ICashDrawerService
	) {
		this.loadAllFlavours();
	}

	@computed
	get flavours(): IFlavour[] | undefined {
		return this._flavours && this._flavours.filter((f) => f.amount > 0);
	}

	@computed
	get enableSelectFlavours(): boolean {
		return !!this.currentOrder && !this.currentOrder.completed;
	}

	@action.bound
	public onSelectFlavour(flavour: IFlavour): IResponse<null> {
		if (!this.currentOrder || !this.enableSelectFlavours) {
			return new SelectFlavourRequiresOrderResponse();
		}

		if (!this._flavours || !this.flavours || this.flavours.length === 0) {
			return new RanOutOfFlavoursResponse();
		}

		const flavourIndex = this.flavours.findIndex((f) => f.id === flavour.id);
		if (flavourIndex < 0) {
			return new FlavourDoesNotExistsResponse();
		}

		this.currentOrder.addFlavour(flavour);
		this._flavours[flavourIndex].amount--;

		return { success: true };
	}

	@action.bound
	public initNewOrder(): void {
		this.currentOrder = new Order();
	}

	@action
	public payOrder = async (payment: number): Promise<IResponse<number>> => {
		if (this.currentOrder) {
			if (payment < this.currentOrder.price) {
				return new IncorrectPaymentAmountResponse(payment);
			}

			return await this.pushPaymentToDrawer(payment, this.currentOrder.price);
		}

		return new OrderDoesNotExistsResponse();
	};

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
