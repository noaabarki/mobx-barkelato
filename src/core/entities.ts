type AllergyLabels = "peanuts" | "gluten"

export interface IFlavour {
  id: string
  name: string
  allrgyLabels: AllergyLabels[]
  price: number
  amount: number
}

export enum ServingType {
  bowl = "bowl",
  cone = "cone",
}
export interface IOrder {
  isCompleted: boolean
  flavours: IFlavour[]
  type: ServingType
  price: number
}
