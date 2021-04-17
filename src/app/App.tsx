import { observer } from "mobx-react";
import React from "react";

import { IAppStore } from "../app";
import { Shop } from "./shop/Shop";
import { ShopViewModel } from "./shop/shopViewModel";

export const App = observer(({ store }: { store: IAppStore }) => {
	const shopViewModel = new ShopViewModel(
		store.gatewayClient,
		store.drawerService
	);
	return <Shop viewModel={shopViewModel} />;
});
