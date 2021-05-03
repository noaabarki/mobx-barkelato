import { action, computed, observable } from "mobx";
import { IFlavour } from "../../../core/entities";
import { InvalidServingTypeResponse, IResponse } from "../dtos/responses";

export interface IOrder {
	completed: boolean;
	flavours: IFlavour[];
	type: ServingType;
	price: number;

	addFlavour: (flavour: IFlavour) => void;
	setType: (type: string) => IResponse<boolean>;
	completeOrder: () => void;
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
		const servingType = this.getServingType(type);
		if (servingType) {
			this.type = servingType;
			return { success: true };
		}

		return new InvalidServingTypeResponse();
	};

	@action
	public addFlavour = (flavour: IFlavour): void => {
		this.flavours.push(flavour);
	};

	private getServingType(type: string): ServingType | null {
		if (type === ServingType.cone) {
			return ServingType.cone;
		} else if (type === ServingType.bowl) {
			return ServingType.bowl;
		}

		return null;
	}
}
