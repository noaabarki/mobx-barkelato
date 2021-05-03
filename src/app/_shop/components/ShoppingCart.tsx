import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { IShoppingCart } from "../entities/shoppingCart";
import { Order } from "./Order";

interface IShoppingCartProps {
	cart: IShoppingCart;
}

export const ShoppingCart = observer((props: IShoppingCartProps) => {
	const { activeOrder } = props.cart;
	return (
		<ShoppingCartLayout>
			<TitleWrapper>
				<h3>Shopping cart</h3>
			</TitleWrapper>
			<OrdersStack>{activeOrder && <Order order={activeOrder} />}</OrdersStack>
			<BalanceFooter>
				<LabelFor
					label="items"
					value={activeOrder ? activeOrder.flavours.length.toString() : "0"}
				/>
				<LabelFor
					label="price"
					value={activeOrder ? activeOrder.price.toString() : "0 $"}
				/>
			</BalanceFooter>
		</ShoppingCartLayout>
	);
});

const ShoppingCartLayout = styled.div`
	display: grid;
	grid-template-rows: 4rem 1fr 5rem;
	width: 100%;
`;

const OrdersStack = styled.div`
	display: flex;
	flex-direction: column;
`;

const TitleWrapper = styled.div`
	border-bottom: 1px solid;
`;

const BalanceFooter = styled.div`
	border-top: 1px solid;
	text-align: start;
`;

const LabelFor = observer(
	({ label, value }: { label: string; value: string }) => {
		return (
			<LabelForContainer>
				<span className="label">{label}:</span>
				<span>{value}</span>
			</LabelForContainer>
		);
	}
);

const LabelForContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0.5rem 0.5rem 0;

	span.label {
		font-weight: bold;
		text-transform: uppercase;
	}
`;
