import { observable, computed, action } from "mobx";

import { IOrder, Order } from "./order";

export interface IShoppingCart {
	orders: IOrder[];
	totalItems: number;
	totalPrice: number;
	totalPaid: number;

	addOrder: (item: string, price: number) => void;
	removeOrder: (item: string) => void;
	pay: (paymnet: number) => void;
}

export class ShoppingCart {
	@observable orders: IOrder[];
	@observable totalPaid: number;

	constructor() {
		this.orders = [];
		this.totalPaid = 0;
	}

	@action.bound
	public addOrder(item: string, price: number) {
		const existingRecord = this.findOrder(item);
		if (existingRecord) {
			existingRecord.order.addItem();
		} else {
			this.orders.push(this.createOrder(item, price));
		}
	}

	@action.bound
	public removeOrder(item: string) {
		const existingRecord = this.findOrder(item);
		if (existingRecord) {
			existingRecord.order.removeItem();
			if (existingRecord.order.totalItems === 0) {
				this.orders.splice(this.orders.indexOf(existingRecord.order), 1);
			}
		}
	}

	@computed
	get totalItems() {
		return this.calcTotalOrdersItems(this.orders);
	}

	@computed
	get totalPrice() {
		return this.calcTotalOrdersPrice(this.orders) - this.totalPaid;
	}

	@action.bound
	public pay(paymnet: number) {
		this.totalPaid += paymnet;
	}



	private generateOrderId = () => {
		return this.orders.length + 1;
	};

	private findOrder = (item: string): { index: number, order: IOrder } | undefined => {
		const existingOrderIndex = this.orders.findIndex((o) => o.item.name === item);
		if (existingOrderIndex >= 0) {
			return { index: existingOrderIndex, order: this.orders[existingOrderIndex] };
		}
	}


	private createOrder = (item: string, price: number) => {
		return new Order(this.generateOrderId(), item, price);
	};

	private calcTotalOrdersItems = (orders: IOrder[]) => {
		return orders.reduce((accu, curr) => {
			return accu + curr.item.amount;
		}, 0);
	};

	private calcTotalOrdersPrice = (orders: IOrder[]) => {
		const ordersTotalPrice = orders.reduce((accu, curr) => {
			return accu + curr.totalPrice;
		}, 0);
		return ordersTotalPrice;
	};
}
