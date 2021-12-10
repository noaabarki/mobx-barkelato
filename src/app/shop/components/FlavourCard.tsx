import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

import { IFlavour } from "../entities";

export const FlavourCard = observer(
	(props: {
		index: number;
		flavour: IFlavour;
		onAddClick: () => void;
		onRemoveClick: () => void;
	}) => {
		return (
			<FlavourCardLayout enabled={!props.flavour.isOutOfStock}>
				<Amount value={props.flavour.amountLeft} />
				<span>{props.flavour.name}</span>
				<FlavorImage
					alt={""}
					src={require(`../assets/images/${props.index}.jpeg`)}
				/>
				{/* <FlavorCardActions>
					<button
						onClick={props.onAddClick}
						disabled={props.flavour.isOutOfStock}
					>
						+
					</button>
					<span>{props.flavour.price}$</span>
					<button onClick={props.onRemoveClick}>-</button>
				</FlavorCardActions> */}
			</FlavourCardLayout>
		);
	}
);

const Amount = observer(({ value }: { value: number }) => {
	return (
		<AmountBadge>
			<span>{value}</span>
		</AmountBadge>
	);
});

const FlavorImage = styled.img`
	max-width: 80px;
	max-height: 80px;
`;

const FlavourCardLayout = styled.div<{ enabled: boolean }>`
	border: 1px solid;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0 1rem;
	position: relative;

	${FlavorImage} {
		opacity: ${(props) => (props.enabled ? 1 : 0.5)};
	}
`;

const FlavorCardActions = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
`;

const AmountBadge = styled.div`
	color: white;
	border-radius: 50%;
	width: 3rem;
	height: 3rem;
	line-height: 1.5rem;
	position: absolute;
	top: -1.5rem;
	right: -0.5rem;
	border: 1px solid;
	background: black;
	font-size: 18px;
	align-items: center;
	display: flex;
	justify-content: center;
`;
