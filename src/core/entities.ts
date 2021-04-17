type AllergyLabels = "peanuts" | "gluten";

export interface IFlavour {
	id: string;
	name: string;
	allrgyLabels: AllergyLabels[];
	price: number;
	amount: number;
}
