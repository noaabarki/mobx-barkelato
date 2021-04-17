import { action, observable } from "mobx";
import { IResponse } from "../entities";

export interface ICashDrawerService {
	isOpen: boolean;

	open: () => Promise<void>;
	pushMoneyToDrawer: (money: number) => Promise<IResponse<boolean | null>>;
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
	public async pushMoneyToDrawer(
		money: number
	): Promise<IResponse<boolean | null>> {
		if (this.isOpen) {
			this._drawer += money;
			return { success: true, data: true, error: "" };
		}
		return { success: false, data: null, error: "darwer is closed" };
	}

	@action
	public async close(): Promise<void> {
		this.isOpen = false;
	}
}
