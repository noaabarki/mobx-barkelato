import React, { useState } from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

const DEFAULT_SERVING_TYPE = "cone or bowl"

interface INewOrderProps {
  onSubmit: (servingType: string) => void
}

export const NewOrder = observer((props: INewOrderProps) => {
  const [showNewOrder, setShowNewOrderNewOrder] = useState(false)
  const [servingType, setServingType] = useState("")

  const onClickNewOrder = (value: boolean) => {
    setShowNewOrderNewOrder(value)
  }

  const onChangeServingType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServingType(e.target.value)
  }

  return (
    <NewOrderLayout>
      {showNewOrder && (
        <React.Fragment>
          <input
            placeholder={DEFAULT_SERVING_TYPE}
            value={servingType}
            onChange={onChangeServingType}
          />
          <button onClick={() => props.onSubmit(servingType)}>submit</button>
        </React.Fragment>
      )}
      <button onClick={() => onClickNewOrder(true)}>new order</button>
      {showNewOrder && (
        <button onClick={() => onClickNewOrder(false)}>cancel order</button>
      )}
    </NewOrderLayout>
  )
})

const NewOrderLayout = styled.div``
