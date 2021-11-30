import { observable, computed, action } from "mobx";

import { IOrder, Order } from "./order";

export interface IShoppingCart {
	orders: IOrder[];
	totalItems: number;
	totalPrice: number;
	totalPaid: number;

	addItem: (item: { name: string, price: number }) => void;
	removeItem: (itemName: string) => void;
	pay: (paymnet: number) => void;
}

export interface IOrderRecord { index: number, order: IOrder }

export class ShoppingCart {
	@observable orders: IOrder[] = [];
	@observable totalPaid: number = 0

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
		if (existingOrder) {
			existingOrder.removeItem();
			if (existingOrder.totalItems === 0) {
				this.removeOrder(existingOrder);
			}
		}
	}

	@action.bound
	public pay(paymnet: number) {
		this.totalPaid += paymnet;
	}

	@computed
	get totalPrice() {
		return this.calcTotalOrdersPrice(this.orders) - this.totalPaid;
	}


	@computed
	get totalItems() {
		return this.calcTotalOrdersItems(this.orders);
	}

	private calcTotalOrdersItems = (orders: IOrder[]) => {
		return orders.reduce((accu, curr) => {
			return accu + curr.item.amount;
		}, 0);
	};

	private getNextOrderId = () => {
		return this.orders.length + 1;
	};

	private calcTotalOrdersPrice = (orders: IOrder[]) => {
		const ordersTotalPrice = orders.reduce((accu, curr) => {
			return accu + curr.totalPrice;
		}, 0);
		return ordersTotalPrice;
	};

	private removeOrder = (order: IOrder) => {
		this.orders.splice(this.orders.indexOf(order), 1);
	}
}
