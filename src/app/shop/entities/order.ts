import { observable, computed, action } from "mobx"
import { IOrderItem } from "../interfaces/order.interfaces"

export interface IOrder {
  id: number
  item: IOrderItem
  totalPrice: number

  addItem: () => void
  removeItem: () => void
}

export class Order implements IOrder {
  public id: number

  @observable item: IOrderItem
  constructor(id: number, name: string, price: number) {
    this.id = id
    this.item = this.createItem(name, price)
  }

  @computed
  get totalPrice() {
    return this.item.price * this.item.amount
  }

  @action.bound
  public addItem() {
    this.item.amount++
  }

  @action.bound
  public removeItem() {
    this.item.amount--
  }

  private createItem = (name: string, price: number) => {
    return {
      name,
      price,
      amount: 1,
    }
  }
}
