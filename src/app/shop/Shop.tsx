import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

import { ShopStore } from "./shopStore";

import { IShoppingCart, IOrder, IFlavour } from "./entities";

export const Shop = observer((props: { store: ShopStore }) => {
	return (
		<ShopLayout>
			<Flavours
				flavours={props.store.flavours}
				onAddClick={(f) => props.store.addFlavourToShoppingCart(f.name)}
				onRemoveClick={(f) => props.store.removeFlavourFromShoppingCart(f.name)}
			/>
			{!props.store.flavours && <span>loading...</span>}
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
		flavours?: IFlavour[];
		onAddClick: (flavour: IFlavour) => void;
		onRemoveClick: (flavour: IFlavour) => void;
	}) => {
		if (!props.flavours) {
			return <></>;
		}

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

const FlavourCard = observer(
	(props: {
		index: number;
		flavour: IFlavour;
		onAddClick: () => void;
		onRemoveClick: () => void;
	}) => {
		return (
			<FlavourCardLayout enabled={!props.flavour.isOutOfStock}>
				<AmountCounter>
					<span>{props.flavour.amountLeft}</span>
				</AmountCounter>
				<span>{props.flavour.name}</span>
				<FlavorImage
					alt={""}
					src={require(`./assets/images/${props.index}.jpeg`)}
				/>
				<FlavorCardActions>
					<button
						onClick={props.onAddClick}
						disabled={props.flavour.isOutOfStock}
					>
						+
					</button>
					<span>{props.flavour.price}$</span>
					<button onClick={props.onRemoveClick}>-</button>
				</FlavorCardActions>
			</FlavourCardLayout>
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

const AmountCounter = styled.div`
	color: white;
	border-radius: 50%;
	width: 1.5rem;
	height: 1.5rem;
	line-height: 1.5rem;
	position: absolute;
	top: 0.2rem;
	right: 0.2rem;
	border: 1px solid;
	background: black;
	font-size: 12px;
`;

interface IShoppingCartProps {
	cart: IShoppingCart;
}

export const ShoppingCart = observer((props: IShoppingCartProps) => {
	return (
		<ShoppingCartLayout>
			<h3>Shopping Cart</h3>
			<OrdersList orders={props.cart.orders} />
			<div className="footer">
				<p>
					<span className="caption">total: </span>
					<span>{props.cart.totalItems}</span>
				</p>
				<hr />
				<p>
					<span className="caption">payments: </span>
					<span>{props.cart.totalPaid}</span>
				</p>
				<hr />
				<p>
					<span className="caption">total: </span>
					<span>{props.cart.totalPrice}</span>
				</p>
			</div>
		</ShoppingCartLayout>
	);
});

const ShoppingCartLayout = styled.div`
	border: 1px solid;
	text-align: center;
	display: grid;
	grid-template-rows: 3rem 1fr 6rem;

	h3 {
		border-bottom: 1px solid;
		margin-bottom: 0;
	}

	.footer {
		border-top: 1px solid;
		text-align: start;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		p {
			margin: 0;
			display: flex;
			justify-content: space-between;
			padding: 0 0.5rem;

			.caption {
				font-weight: bold;
			}
		}

		hr {
			margin: 0;
		}
	}
`;

const OrdersList = observer((props: { orders: IOrder[] }) => {
	return (
		<OrderListLayout>
			{props.orders.map((o, index) => {
				return (
					<li key={index}>
						<div>
							<span>{o.item.name}</span>
							<span>
								{o.item.amount} X {o.item.price} $
							</span>
						</div>
					</li>
				);
			})}
		</OrderListLayout>
	);
});

const OrderListLayout = styled.ul`
	list-style: none;
	padding: 0;

	li > div {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
	}
`;
