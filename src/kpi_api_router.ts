import {wrap} from 'async-middleware';

import {BaseRouter} from '@essential-projects/http_node';
import {IIdentityService} from '@essential-projects/iam_contracts';

import {restSettings} from '@process-engine/kpi_api_contracts';

import {KpiApiController} from './kpi_api_controller';
import {createResolveIdentityMiddleware, MiddlewareFunction} from './middlewares/index';

export class KpiApiRouter extends BaseRouter {

  private _kpiApiRestController: KpiApiController;
  private _identityService: IIdentityService;

  constructor(kpiApiRestController: KpiApiController, identityService: IIdentityService) {
    super();
    this._kpiApiRestController = kpiApiRestController;
    this._identityService = identityService;
  }

  private get kpiApiRestController(): KpiApiController {
    return this._kpiApiRestController;
  }

  public get baseRoute(): string {
    return 'api/kpi/v1';
  }

  public async initializeRouter(): Promise<void> {
    this.registerMiddlewares();
    this.registerRoutes();
  }

  private registerMiddlewares(): void {
    const resolveIdentity: MiddlewareFunction = createResolveIdentityMiddleware(this._identityService);
    this.router.use(wrap(resolveIdentity));
  }

  private registerRoutes(): void {
    const controller: KpiApiController = this.kpiApiRestController;

    this.router.get(restSettings.paths.getRuntimeInformationForProcessModel, wrap(controller.getRuntimeInformationForProcessModel.bind(controller)));
    this.router.get(restSettings.paths.getRuntimeInformationForFlowNode, wrap(controller.getRuntimeInformationForFlowNode.bind(controller)));
    this.router.get(restSettings.paths.getActiveTokensForProcessModel, wrap(controller.getActiveTokensForProcessModel.bind(controller)));
    this.router.get(restSettings.paths.getActiveTokensForCorrelationAndProcessModel,
                    wrap(controller.getActiveTokensForCorrelationAndProcessModel.bind(controller)));
    this.router.get(restSettings.paths.getActiveTokensForProcessInstance, wrap(controller.getActiveTokensForProcessInstance.bind(controller)));
    this.router.get(restSettings.paths.getActiveTokensForFlowNode, wrap(controller.getActiveTokensForFlowNode.bind(controller)));
  }
}
