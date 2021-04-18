import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

import { IAppStore } from "../app";
import { Shop } from "./shop/Shop";
import { ShopViewModel } from "./shop/shopViewModel";

const Body = styled.div`
	font-family: sans-serif;
	height: 100vh;
`;

export const App = observer(({ store }: { store: IAppStore }) => {
	const shopViewModel = new ShopViewModel(
		store.gatewayClient,
		store.drawerService
	);
	return (
		<Body>
			<Shop viewModel={shopViewModel} />
		</Body>
	);
});
