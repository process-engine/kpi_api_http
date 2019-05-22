import {wrap} from 'async-middleware';

import {BaseRouter} from '@essential-projects/http_node';
import {IIdentityService} from '@essential-projects/iam_contracts';

import {restSettings} from '@process-engine/kpi_api_contracts';

import {KpiApiController} from './kpi_api_controller';
import {createResolveIdentityMiddleware} from './middlewares/index';

export class KpiApiRouter extends BaseRouter {

  private kpiApiRestController: KpiApiController;
  private identityService: IIdentityService;

  constructor(kpiApiRestController: KpiApiController, identityService: IIdentityService) {
    super();
    this.kpiApiRestController = kpiApiRestController;
    this.identityService = identityService;
  }

  public get baseRoute(): string {
    return 'api/kpi/v1';
  }

  public async initializeRouter(): Promise<void> {
    this.registerMiddlewares();
    this.registerRoutes();
  }

  private registerMiddlewares(): void {
    const resolveIdentity = createResolveIdentityMiddleware(this.identityService);
    this.router.use(wrap(resolveIdentity));
  }

  private registerRoutes(): void {
    const controller = this.kpiApiRestController;

    this.router.get(restSettings.paths.getRuntimeInformationForProcessModel, wrap(controller.getRuntimeInformationForProcessModel.bind(controller)));
    this.router.get(restSettings.paths.getRuntimeInformationForFlowNode, wrap(controller.getRuntimeInformationForFlowNode.bind(controller)));
    this.router.get(restSettings.paths.getActiveTokensForProcessModel, wrap(controller.getActiveTokensForProcessModel.bind(controller)));
    this.router.get(
      restSettings.paths.getActiveTokensForCorrelationAndProcessModel,
      wrap(controller.getActiveTokensForCorrelationAndProcessModel.bind(controller)),
    );
    this.router.get(restSettings.paths.getActiveTokensForProcessInstance, wrap(controller.getActiveTokensForProcessInstance.bind(controller)));
    this.router.get(restSettings.paths.getActiveTokensForFlowNode, wrap(controller.getActiveTokensForFlowNode.bind(controller)));
  }

}
