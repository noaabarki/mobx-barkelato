import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { IShopViewModel } from "./shopViewModel";
import { FlavoursList } from "./components/FlavoursList";
import { NewOrder } from "./components/NewOrder";
import { Order } from "./components/Order";

interface IShopProps {
	viewModel: IShopViewModel;
}

export const Shop = observer(({ viewModel }: IShopProps) => {
	return (
		<ShopLayout>
			{viewModel.currentOrder && <Order order={viewModel.currentOrder} />}
			{!viewModel.currentOrder && (
				<NewOrder onSubmit={viewModel.initNewOrder} />
			)}
			{viewModel.flavours && (
				<React.Fragment>
					<h1>All Flavours</h1>
					<FlavoursList
						flavours={viewModel.flavours}
						onClickFlavour={viewModel.onSelectFlavour}
					/>
				</React.Fragment>
			)}
		</ShopLayout>
	);
});

const ShopLayout = styled.div``;
