import { IAppStore } from "../app";
import React from "react";
import { Shop } from "./shop/Shop";
import { ShopStore } from "./shop/shopStore";
import { observer } from "mobx-react";
import styled from "styled-components";

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
