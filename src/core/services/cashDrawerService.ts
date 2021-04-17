import { action, observable } from "mobx";

export interface ICashDrawerService {
	isOpen: boolean;

	open: () => Promise<void>;
	pushMoneyToDrawer: (money: number) => Promise<boolean>;
	close: () => Promise<void>;
}

export class CashDrawerService implements ICashDrawerService {
	@observable isOpen: boolean = false;
	@observable private _drawer: number = 0;

	@action.bound
	public async open(): Promise<void> {
		this.isOpen = true;
	}

	@action
	public async pushMoneyToDrawer(money: number): Promise<boolean> {
		if (!this.isOpen) {
			this.isOpen = true;
		}

		this._drawer += money;
		await this.delay(1000);
		return true;
	}

	@action
	public async close(): Promise<void> {
		this.isOpen = false;
	}

	private delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
