import { IOrder, IShoppingCart } from "../entities";

import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

interface IShoppingCartProps {
	cart: IShoppingCart;
}

export const ShoppingCart = observer((props: IShoppingCartProps) => {
	return (
		<ShoppingCartLayout>
			<h3>Shopping Cart</h3>
			<OrdersList orders={props.cart.orders} />
			<ShoppingCartFooter subtotal={props.cart.subtotal} total={props.cart.total} />
		</ShoppingCartLayout>
	);
});

const ShoppingCartFooter = (props: {subtotal: number, total: number}) => {
	const {subtotal, total} = props;
	return (
		<div className="footer">
				<hr />
				<p>
					<span className="caption">Subtotal: </span>
					<span>{subtotal}</span>
				</p>
				<hr />
				<p>
					<span className="caption">Total: </span>
					<span>{total}</span>
				</p>
			</div>)
}

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
