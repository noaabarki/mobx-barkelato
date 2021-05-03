import { observer } from "mobx-react";
import styled from "styled-components";
import { IFlavour } from "./entities/flavour";

import { ShopStore } from "./shopStore";

import { IShoppingCart } from "./entities/shoppingCart";
import { IOrder } from "./entities/order";
import React from "react";

export const Shop = observer((props: { store: ShopStore }) => {
	if (props.store.flavours) {
		return (
			<ShopLayout>
				<ShoppingCart cart={props.store.cart} />
				<Flavours
					flavours={props.store.flavours}
					onAddClick={(f) => props.store.onAddFlavour(f.name)}
					onRemoveClick={(f) => props.store.onRemoveFlavour(f.name)}
				/>
			</ShopLayout>
		);
	} else {
		return <span>loading...</span>;
	}
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

const FlavourCard = observer(
	(props: {
		index: number;
		flavour: IFlavour;
		onAddClick: () => void;
		onRemoveClick: () => void;
	}) => {
		return (
			<FlavourCardLayout enabled={props.flavour.enabled}>
				<img
					alt={""}
					src={require(`./assets/images/${props.index}.jpeg`).default}
				/>
				<div className="buttons">
					<button onClick={props.onAddClick}>+</button>
					<span>{props.flavour.price}$</span>
					<button onClick={props.onRemoveClick}>-</button>
				</div>
			</FlavourCardLayout>
		);
	}
);

const FlavourCardLayout = styled.div<{ enabled: boolean }>`
	border: 1px solid;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0 1rem;

	img {
		max-width: 80px;
		max-height: 80px;
	}

	.buttons {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
`;

interface IShoppingCartProps {
	cart: IShoppingCart;
}

export const ShoppingCart = observer((props: IShoppingCartProps) => {
	return (
		<ShoppingCartLayout>
			<h3>Shopping Cart</h3>
			<hr />
			<Orders orders={props.cart.orders} />
			<span>{props.cart.totalItems}</span>
		</ShoppingCartLayout>
	);
});

const Orders = observer((props: { orders: IOrder[] }) => {
	return (
		<ul>
			{props.orders.map((o, index) => {
				return <li key={index}>{o.item.name}</li>;
			})}
		</ul>
	);
});

const ShoppingCartLayout = styled.div`
	border: 1px solid;
	text-align: center;
`;
