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

	@action.bound
	public addOrder(item: string, price: number) {
		const existingOrderIndex = this.findOrderIndex(item);
		if (existingOrderIndex >= 0) {
			this.orders[existingOrderIndex].addItem();
		} else {
			this.orders.push(this.createOrder(item, price));
		}
	}

	@action.bound
	public removeOrder(item: string) {
		const existingOrderIndex = this.findOrderIndex(item);
		if (existingOrderIndex >= 0) {
			const existingOrder = this.orders[existingOrderIndex];
			if (existingOrder.item.amount > 1) {
				existingOrder.removeItem();
			} else {
				this.orders.splice(existingOrderIndex, 1);
			}
		}
	}

	private generateOrderId = () => {
		return this.orders.length + 1;
	};

	private findOrderIndex = (item: string) => {
		return this.orders.findIndex((o) => o.item.name === item);
	};

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
