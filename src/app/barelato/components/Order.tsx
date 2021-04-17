import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import { IFlavour, IOrder } from "../../../core/entities"

interface IOrderProps {
  order: IOrder
}

export const Order = observer((props: IOrderProps) => {
  return (
    <OrderLayout>
      <span>{props.order.type}</span>
      <OrderFlavours flavours={props.order.flavours} />
    </OrderLayout>
  )
})

const OrderLayout = styled.div``

const OrderFlavours = observer(({ flavours }: { flavours: IFlavour[] }) => {
  return (
    <ul>
      {flavours.map((f: IFlavour) => {
        return <li id={f.id}>{f.name}</li>
      })}
    </ul>
  )
})
