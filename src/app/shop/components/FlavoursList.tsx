import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { IFlavour } from "../../../core/entities";
import { IOrder } from "../entities/order";

interface IFlavoursListProps {
	flavours: IFlavour[];
	activeOrder?: IOrder;
	onClickFlavour: (flavour: IFlavour) => void;
}

export const FlavoursList = observer((props: IFlavoursListProps) => {
	// const isFlavourInOrder = (flavour: IFlavour) => {
	// 	return props.activeOrder
	// 		? props.activeOrder.flavours.find((f) => f.id === flavour.id)
	// 		: false;
	// };
	return (
		<FlavoursListContainer>
			{props.flavours.map((f) => {
				const img = require(`../assets/images/${f.imageURI}`);
				return (
					<FlavourCard key={f.id}>
						<h5>{f.name}</h5>
						<Image alt={""} src={img} />
						<AddButton onClick={() => props.onClickFlavour(f)}>+</AddButton>
						{/* <Badge>{f.allergyLabels}</Badge> */}
					</FlavourCard>
				);
			})}
		</FlavoursListContainer>
	);
});

const AddButton = styled.button`
	border-radius: 50%;
	width: 2rem;
	height: 2rem;
	font-size: inherit;
	border: white;
`;

const FlavoursListContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
`;
const FlavourCard = styled.div`
	width: 220px;
	height: 180px;
	margin: 0.5rem;
	display: flex;
	flex-direction: column;
	border: 1px solid rgba(0, 0, 0, 0.125);
	border-radius: 0.25rem;
	align-items: center;
`;

const Badge = styled.span``;

const Image = styled.img`
	max-width: 70px;
	max-height: 70px;
`;
