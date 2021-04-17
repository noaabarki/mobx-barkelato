export interface ITaste {
  flavourId: string
  flavourName: string
}

export interface IPayOrderResponse {
  isCompleted: boolean
  change: number
  errorMessage: string
}

interface IRequestTasteResponse {
  taste: ITaste | null
}

export type SelectFlavourResponse = IRequestTasteResponse | void
