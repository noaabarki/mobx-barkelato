import React from "react";
import ReactDOM from "react-dom";

import store from "./app";
import { App } from "./app/App";
import { ShopViewModel } from "./app/barelato/shopViewModel";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStore() {
	return {
		shopViewModel: new ShopViewModel(store.gatewayClient, store.drawerService),
	};
}
ReactDOM.render(<App store={store} />, document.getElementById("root"));
