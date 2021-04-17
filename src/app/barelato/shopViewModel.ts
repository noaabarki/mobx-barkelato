import { action, computed, observable } from "mobx"

import { IFlavoursClient } from "../../core/api/flavoursClient"
import { IFlavour, IOrder, ServingType } from "../../core/entities"
import { ICashDrawerService } from "../../core/services/cashDrawerService"
import { IPayOrderResponse, ITaste, SelectFlavourResponse } from "./dtos"

export interface IShopViewModel {
  flavours: IFlavour[] | undefined
  currentOrder: IOrder | undefined

  initNewOrder: (type: string) => void
  requestTaste: (flavour: IFlavour) => void
  onSelectFlavour(flavour: IFlavour): SelectFlavourResponse
  completeTaste: () => void
  completeOrder: () => void
  payOrder: (payment: number) => Promise<IPayOrderResponse>
}

export class ShopViewModel implements ShopViewModel {
  @observable private _flavours: IFlavour[] | undefined
  @observable private _messageStack: string[] = []

  @observable currentOrder: IOrder | undefined
  @observable isServingTaste: boolean = false
  @observable isServingOrder: boolean = false

  constructor(
    private client: IFlavoursClient,
    private drawerService: ICashDrawerService
  ) {
    this.loadAllFlavours()
  }

  @computed
  get flavours(): IFlavour[] | undefined {
    return this._flavours && this._flavours.filter((f) => f.amount > 0)
  }

  @action.bound
  public onSelectFlavour(flavour: IFlavour): void {
    if (this.isServingTaste) {
      this.handleSelectTasteFlavour(flavour)
    } else if (this.isServingOrder) {
      this.addFlavourToCurrentOrder(flavour)
    } else {
      this._messageStack.push("please request a taste or create an order")
    }
  }

  @action.bound
  public requestTaste(): void {
    this.isServingTaste = true
  }

  @action.bound
  public handleSelectTasteFlavour(flavour: IFlavour): ITaste | null {
    if (this._flavours) {
      const flavourIndex = this._flavours.findIndex((f) => f.id === flavour.id)
      switch (true) {
        case flavourIndex < 0:
          this._messageStack.push("sorry, we dont have that flavour")
          return null
        case this._flavours[flavourIndex].amount < 0:
          this._messageStack.push("sorry, we ran out")
          return null
        default:
          this._flavours[flavourIndex].amount--
          this._messageStack.push("enjoy")
          return this.createTaste(this._flavours[flavourIndex])
      }
    }

    this._messageStack.push("we ran out of all flavours")
    return null
  }

  @action.bound
  public completeTaste(): void {
    this.isServingTaste = false
  }

  @action
  public initNewOrder = (type: string): void => {
    if (!this.isServingTaste) {
      this.isServingOrder = true
      if (type === ServingType.bowl || type === ServingType.cone) {
        this.currentOrder = this.initOrder(type)
      } else {
        this._messageStack.push("invalid type")
      }
    }
  }

  @action
  public completeOrder = () => {
    if (this.currentOrder) {
      this.currentOrder.isCompleted = true
      this.isServingOrder = false
    }
  }

  // pay order cash only
  @action
  public payOrder = async (payment: number): Promise<IPayOrderResponse> => {
    if (this.currentOrder) {
      const change = this.getChange(payment, this.currentOrder.price)
      if (change >= 0) {
        if (!this.drawerService.isOpen) {
          await this.drawerService.open()
          const orderPaymnet = this.currentOrder.price - change
          await this.drawerService.addMoneyToDrawer(orderPaymnet)
          this.drawerService.close()
          return {
            isCompleted: true,
            change: change,
            errorMessage: "thank you!",
          }
        }
      } else {
        return {
          isCompleted: false,
          change: payment,
          errorMessage: "Incorrect payment",
        }
      }
    }

    return {
      isCompleted: false,
      change: payment,
      errorMessage: "no order to pay for",
    }
  }

  @action.bound
  private addFlavourToCurrentOrder(flavour: IFlavour): void {
    if (this.currentOrder) {
      this.currentOrder.flavours.push(flavour)
      this.currentOrder.price = this.calcTotalPrice(this.currentOrder.flavours)
    }
  }

  @action
  private loadAllFlavours = async () => {
    const apiFlavours = await this.client.getFlavours()
    this._flavours = apiFlavours
  }

  private getChange(payment: number, price: number): number {
    // change without calculating coins in drawer or in payment
    return payment - price
  }

  private initOrder = (type: ServingType): IOrder => {
    return {
      isCompleted: false,
      type: type,
      flavours: [],
      price: 0,
    }
  }

  private createTaste(selectedFlavour: IFlavour): ITaste {
    return {
      flavourId: selectedFlavour.id,
      flavourName: selectedFlavour.name,
    }
  }

  private calcTotalPrice = (flavours: IFlavour[]): number => {
    return flavours.reduce((prev, current) => {
      return prev + current.price
    }, 0)
  }
}
