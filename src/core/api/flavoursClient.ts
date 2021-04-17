import { IFlavour } from "../entities"

export interface IFlavoursClient {
  getFlavours: (vendorId?: number) => Promise<IFlavour[]>
}
