import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { IShopViewModel } from "./shopViewModel";
import { FlavoursList } from "./components/FlavoursList";
import { NewOrder } from "./components/NewOrder";
import { ShoppingCart } from "./components/ShoppingCart";

interface IShopProps {
	viewModel: IShopViewModel;
}

export const Shop = observer(({ viewModel }: IShopProps) => {
	const [showNewOrder, setShowNewOrder] = useState(
		viewModel.cart.activeOrder ? true : false
	);

	const handleOnClickAddOrder = () => {
		setShowNewOrder(true);
	};

	return (
		<ShopLayout>
			<Header>
				<Title>Barelato</Title>
			</Header>
			<SideNav>
				<ShoppingCart cart={viewModel.cart} />
			</SideNav>
			<FlavoursContainer>
				<div>
					{showNewOrder && (
						<NewOrder onSubmit={viewModel.createNewOrder} show={true} />
					)}
				</div>
				{viewModel.flavours && (
					<FlavoursList
						flavours={viewModel.flavours}
						onClickFlavour={viewModel.onSelectFlavour}
						activeOrder={viewModel.cart.activeOrder}
					/>
				)}
			</FlavoursContainer>
		</ShopLayout>
	);
});

const ShopLayout = styled.div`
	display: grid;
	grid-template-rows: 10rem 1fr;
	grid-template-columns: 20rem 1fr;
	height: 100%;
`;
const FlavoursContainer = styled.div`
	margin: 0 auto;
	width: 70%;
`;

const Header = styled.div`
	grid-row-start: 1;
	grid-column-end: 3;
	grid-column-start: 1;
	grid-row-end: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 1px solid;
`;
const Title = styled.h2`
	padding: 0 0.5rem;
`;

const SideNav = styled.div`
	display: flex;
	flex-flow: row wrap;
	grid-column-start: 1;
	grid-column-end: 1;
	border-right: 1px solid;
	text-align: center;
`;
