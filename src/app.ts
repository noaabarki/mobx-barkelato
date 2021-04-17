import {
	CashDrawerService,
	ICashDrawerService,
} from "./core/services/cashDrawerService";
import { GatewayClient } from "./core/api/gatewayClient";

export interface IAppStore {
	gatewayClient: GatewayClient;
	drawerService: ICashDrawerService;
}

class AppStore implements IAppStore {
	public gatewayClient: GatewayClient;
	public drawerService: ICashDrawerService;
	constructor() {
		this.gatewayClient = new GatewayClient("");
		this.drawerService = new CashDrawerService();
	}
}

export default new AppStore();
