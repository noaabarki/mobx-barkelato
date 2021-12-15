import { IOrder, Order } from "./order";
import { action, computed, observable } from "mobx";

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
		this.totalPaid += paymnet;
	}

	@computed
	get total() {
		return this.ordersTotalPrice - this.totalPaid;
	}

	@computed
	get subtotal() {
		return this.totalPaid === this.ordersTotalPrice ? 0 : this.ordersTotalPrice - this.totalPaid;
	}

	@computed
	private get ordersTotalPrice() {
		return this.orders.reduce((accu, curr) => {
			return accu + curr.totalPrice;
		}, 0);
	}


	private getNextOrderId = () => {
		return this.orders.length + 1;
	};

	private removeOrder = (order: IOrder) => {
		this.orders.splice(this.orders.indexOf(order), 1);
	}
}
