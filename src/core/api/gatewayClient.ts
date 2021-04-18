import uuid from "uuid";
import { IFlavour } from "../entities";
import { IFlavoursClient } from "./flavoursClient";

export class GatewayClient implements IFlavoursClient {
	private _baseURL: string;
	constructor(URL: string) {
		this._baseURL = URL;
	}
	public async getFlavours(vendorId?: number): Promise<IFlavour[]> {
		return [
			{
				id: uuid(),
				name: "strawberry",
				allergyLabels: ["peanuts"],
				price: 8,
				amount: 10,
				imageURI: "strawberry.jpg",
			},
			{
				id: uuid(),
				name: "Rasberry",
				allergyLabels: [],
				price: 8,
				amount: 10,
				imageURI: "rasberry.jpeg",
			},
			{
				id: uuid(),
				name: "Pavlova",
				allergyLabels: [],
				price: 8,
				amount: 10,
				imageURI: "pavlova.jpeg",
			},
			{
				id: uuid(),
				name: "Crazy suger",
				allergyLabels: [],
				price: 8,
				amount: 10,
				imageURI: "crazySuger.jpeg",
			},
			{
				id: uuid(),
				name: "Coffee lady",
				allergyLabels: [],
				price: 8,
				amount: 10,
				imageURI: "coffeeLady.jpeg",
			},
			{
				id: uuid(),
				name: "Cherry Mint",
				allergyLabels: [],
				price: 8,
				amount: 10,
				imageURI: "cherryMint.jpeg",
			},
		];
	}
}
