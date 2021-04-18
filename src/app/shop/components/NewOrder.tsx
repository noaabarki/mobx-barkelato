import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";

const DEFAULT_SERVING_TYPE = "cone or bowl";

interface INewOrderProps {
	onSubmit: (servingType: string) => void;
	show: boolean;
}

export const NewOrder = observer((props: INewOrderProps) => {
	const [servingType, setServingType] = useState("");

	const onChangeServingType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setServingType(e.target.value);
	};

	return (
		<NewOrderLayout>
			{props.show && (
				<React.Fragment>
					<input
						placeholder={DEFAULT_SERVING_TYPE}
						value={servingType}
						onChange={onChangeServingType}
					/>
					<button onClick={() => props.onSubmit(servingType)}>submit</button>
				</React.Fragment>
			)}
		</NewOrderLayout>
	);
});

const NewOrderLayout = styled.div``;
