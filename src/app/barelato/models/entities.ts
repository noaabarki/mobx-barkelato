import { action, computed, observable } from "mobx";
import { IFlavour, IResponse } from "../../../core/entities";

export interface IOrder {
	completed: boolean;
	flavours: IFlavour[];
	type: ServingType;
	price: number;
}

export enum ServingType {
	bowl = "bowl",
	cone = "cone",
}

export class Order implements IOrder {
	@observable public completed: boolean;
	@observable public flavours: IFlavour[];
	@observable type: ServingType;

	constructor() {
		this.completed = false;
		this.flavours = [];
		this.type = ServingType.cone;
	}

	@computed
	public get price(): number {
		return this.flavours
			? this.flavours.reduce((prev, curr) => {
					return prev + curr.price;
			  }, 0)
			: 0;
	}

	@action
	public completeOrder = () => {
		this.completed = true;
	};

	@action
	public setType = (type: string): IResponse<boolean> => {
		if (type === ServingType.cone || type === ServingType.bowl) {
			this.type = type;
			return { success: true, data: true, error: "" };
		}

		return {
			success: false,
			data: true,
			error: "invalid type: must be bowl or cone",
		};
	};
}
