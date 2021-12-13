import { observable, computed, action } from "mobx";

import { IOrder, Order } from "./order";

export interface IShoppingCart {
	orders: IOrder[];
	total: number;
	subtotal: number;

	addItem: (item: { name: string, price: number }) => void;
	removeItem: (itemName: string) => void;
	pay: (paymnet: number) => void;
}

export interface IOrderRecord { index: number, order: IOrder }

export class ShoppingCart {
	@observable orders: IOrder[] = [];
	@observable private totalPaid: number = 0

	@action.bound
	public addItem(item: { name: string, price: number }) {
		const existingOrder = this.orders.find((o) => o.item.name === item.name);
		if (existingOrder) {
			existingOrder.addItem();
		} else {
			this.orders.push(new Order(this.getNextOrderId(), item));
		}
	}

	@action.bound
	public removeItem(itemName: string) {
		const existingOrder = this.orders.find((o) => o.item.name === itemName);
		if (!existingOrder)
			return

		existingOrder.removeItem();
		if (existingOrder.totalItems === 0) {
			this.removeOrder(existingOrder);
		}
	}

	@action.bound
	public pay(paymnet: number) {
		const isPaymentTooHigh = this.total - paymnet >= 0
		if (isPaymentTooHigh) {
			this.totalPaid += paymnet;
		} else {
			throw Error('too much money')
		}
	}

	@computed
	get total() {
		const ordersTotalPrice = this.orders.reduce((accu, curr) => {
			return accu + curr.totalPrice;
		}, 0);
		return ordersTotalPrice - this.totalPaid;
	}

	@computed
	get subtotal() {
		return this.total - this.totalPaid
	}

	private getNextOrderId = () => {
		return this.orders.length + 1;
	};

	private removeOrder = (order: IOrder) => {
		this.orders.splice(this.orders.indexOf(order), 1);
	}
}
