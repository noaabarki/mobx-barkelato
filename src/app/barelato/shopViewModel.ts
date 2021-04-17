import { action, computed, observable } from "mobx";

import { IFlavoursClient } from "../../core/api/flavoursClient";
import { IFlavour, IResponse } from "../../core/entities";
import { ICashDrawerService } from "../../core/services/cashDrawerService";
import { UpdateOrderOptions } from "./models/dtos";
import { IOrder, Order } from "./models/entities";

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
		if (
			!this.enableSelectFlavours ||
			!this._flavours ||
			this._flavours.length > 0
		) {
			return {
				success: false,
				data: null,
				error: "please create an order",
			};
		}

		const flavourIndex = this._flavours.findIndex((f) => f.id === flavour.id);
		if (flavourIndex < 0) {
			return {
				success: false,
				data: null,
				error: "we don't have this flavour",
			};
		}

		this._flavours[flavourIndex].amount--;
		const response = this.updateCurrentOrder({
			flavours: [this._flavours[flavourIndex]],
		});

		return { success: response.success, data: null, error: response.error };
	}

	@action.bound
	private updateCurrentOrder(
		opts: Partial<UpdateOrderOptions>
	): IResponse<IOrder | null> {
		if (this.currentOrder && opts.flavours) {
			this.currentOrder.flavours.push(...opts.flavours);
			return {
				success: true,
				data: this.currentOrder,
				error: "",
			};
		}
		return {
			success: false,
			data: null,
			error: "failed to update order",
		};
	}

	@action.bound
	public initNewOrder(): void {
		this.currentOrder = new Order();
	}

	// pay order cash only
	@action
	public payOrder = async (payment: number): Promise<IResponse<number>> => {
		if (this.currentOrder) {
			if (payment < this.currentOrder.price) {
				return {
					success: false,
					data: payment,
					error: "Incorrect payment",
				};
			}

			const change = this.getChange(payment, this.currentOrder.price);
			if (!this.drawerService.isOpen) {
				await this.drawerService.open();
			}
			await this.drawerService.pushMoneyToDrawer(payment - change);
			this.drawerService.close();

			return {
				success: true,
				data: change,
				error: "",
			};
		}

		return {
			success: false,
			data: payment,
			error: "no order to pay for",
		};
	};

	@action
	private loadAllFlavours = async () => {
		const apiFlavours = await this.client.getFlavours();
		this._flavours = apiFlavours;
	};

	private getChange(payment: number, price: number): number {
		// change without calculating coins in drawer or in payment
		return payment - price;
	}
}
