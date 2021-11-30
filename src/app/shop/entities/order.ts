import { observable, computed, action } from "mobx"
import { IOrderItem } from "../interfaces/order.interfaces"

export interface IOrder {
  id: number
  item: IOrderItem
  totalPrice: number
  totalItems: number

  addItem: () => void
  removeItem: () => void
}

type NewOrderItemArgs = Pick<IOrderItem, 'name' | 'price'>
export class Order implements IOrder {
  public id: number
  @observable item: IOrderItem

  constructor(id: number, item: NewOrderItemArgs) {
    this.id = id
    this.item = this.createNewItem(item)
  }

  @computed
  get totalPrice() {
    return this.item.price * (this.item.amount || 1)
  }

  @computed
  get totalItems() {
    return this.item.amount
  }

  @action.bound
  public addItem() {
    this.item.amount++
  }

  @action.bound
  public removeItem() {
    this.item.amount--
  }

  private createNewItem = ({ name, price }: NewOrderItemArgs) => {
    return {
      name,
      price,
      amount: 1,
    }
  }


}
