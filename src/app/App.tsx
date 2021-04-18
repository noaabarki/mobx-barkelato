import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

import { IAppStore } from "../app";
import { ShopStore } from "./shop/shopStore";
import { Shop } from "./shop/Shop";

const Body = styled.div`
	font-family: sans-serif;
	height: 100vh;
`;

const Body = styled.div`
	font-family: sans-serif;
	height: 100vh;
`;

export const App = observer(({ store }: { store: IAppStore }) => {
	const shopViewModel = new ShopStore();
	return (
		<Body>
			<Shop store={shopViewModel} />
		</Body>
	);
});
