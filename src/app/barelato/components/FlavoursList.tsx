import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { IFlavour } from "../../../core/entities"

interface IFlavoursListProps {
  flavours: IFlavour[]
  onClickFlavour: (flavour: IFlavour) => void
}

export const FlavoursList = observer((props: IFlavoursListProps) => {
  return (
    <FlavoursListLayout>
      <ul>
        {props.flavours.map((element) => {
          return (
            <li id={element.id} onClick={() => props.onClickFlavour(element)}>
              {element.name}
            </li>
          )
        })}
      </ul>
    </FlavoursListLayout>
  )
})

const FlavoursListLayout = styled.div``
