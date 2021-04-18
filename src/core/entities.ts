type AllergyLabels = "peanuts" | "gluten";

export interface IFlavour {
	id: string;
	name: string;
	allergyLabels: AllergyLabels[];
	price: number;
	amount: number;
	imageURI: string;
}
