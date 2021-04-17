import { IOrder } from "./entities";

export interface ITaste {
	flavourId: string;
	flavourName: string;
}

export type UpdateOrderOptions = Pick<IOrder, "flavours" | "completed">;
