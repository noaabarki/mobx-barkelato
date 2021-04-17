import uuid from "uuid"
import { IFlavour } from "../entities"
import { IFlavoursClient } from "./flavoursClient"

export class GatewayClient implements IFlavoursClient {
  private _baseURL: string
  constructor(URL: string) {
    this._baseURL = URL
  }
  public async getFlavours(vendorId?: number): Promise<IFlavour[]> {
    return [
      {
        id: uuid(),
        name: "strawberry",
        allrgyLabels: ["peanuts"],
        price: 8,
        amount: 10,
      },
    ]
  }
}
