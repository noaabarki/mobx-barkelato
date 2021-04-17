import { action, observable } from "mobx"

export interface ICashDrawerService {
  isOpen: boolean

  open: () => Promise<void>
  addMoneyToDrawer: (money: number) => Promise<void>
  close: () => Promise<void>
}

export class CashDrawerService implements ICashDrawerService {
  @observable isOpen: boolean = false

  @action.bound
  public async open(): Promise<void> {
    this.isOpen = true
  }

  @action
  public async addMoneyToDrawer(money: number): Promise<void> {
    console.log("money:", money)
  }

  @action
  public async close(): Promise<void> {
    this.isOpen = false
  }
}
