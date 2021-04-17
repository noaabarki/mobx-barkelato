import { observer } from "mobx-react";
import React from "react";

import { IAppStore } from "../app";
import { Shop } from "./barelato/Shop";
import { ShopViewModel } from "./barelato/shopViewModel";

export const App = observer(({ store }: { store: IAppStore }) => {
	const shopViewModel = new ShopViewModel(
		store.gatewayClient,
		store.drawerService
	);
	return <Shop viewModel={shopViewModel} />;
});
