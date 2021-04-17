import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { IFlavour } from "../../../core/entities";

interface IFlavoursListProps {
	flavours: IFlavour[];
	onClickFlavour: (flavour: IFlavour) => void;
}

export const FlavoursList = observer((props: IFlavoursListProps) => {
	return (
		<FlavoursListLayout>
			<ul>
				{props.flavours.map((f) => {
					return (
						<li key={f.id} onClick={() => props.onClickFlavour(f)}>
							{f.name}
						</li>
					);
				})}
			</ul>
		</FlavoursListLayout>
	);
});

const FlavoursListLayout = styled.div``;
