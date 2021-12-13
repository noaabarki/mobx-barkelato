import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

import { ShopStore } from "./shopStore";
import { IFlavour } from "./entities";
import { FlavourCard } from "./components/FlavourCard";
import { ShoppingCart } from "./components/ShoppingCart";

export const Shop = observer((props: { store: ShopStore }) => {
	return (
		<ShopLayout>
			<ShoppingCart cart={props.store.shoppingCart} />
			{!props.store.flavours ? (
				<span>loading...</span>
			) : (
				<Flavours
					flavours={props.store.flavours}
					onAddClick={(f) => props.store.addFlavourToShoppingCart(f.name)}
					onRemoveClick={(f) =>
						props.store.removeFlavourFromShoppingCart(f.name)
					}
				/>
			)}
		</ShopLayout>
	);
});

const ShopLayout = styled.div`
	display: grid;
	grid-template-columns: 25% 1fr;
	height: 98vh;
	grid-template-rows: 100%;
	grid-gap: 1rem;
`;

const Flavours = observer(
	(props: {
		flavours: IFlavour[];
		onAddClick: (flavour: IFlavour) => void;
		onRemoveClick: (flavour: IFlavour) => void;
	}) => {
		return (
			<FlavoursLayout>
				{props.flavours.map((f, index) => (
					<FlavourCard
						key={index}
						index={index}
						flavour={f}
						onAddClick={() => props.onAddClick(f)}
						onRemoveClick={() => props.onRemoveClick(f)}
					/>
				))}
			</FlavoursLayout>
		);
	}
);

const FlavoursLayout = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 10rem);
	grid-template-rows: repeat(4, 10rem);
	grid-gap: 1rem;

	margin: 5rem auto 1rem auto;
	text-align: center;
`;
