import {BaseRouter} from '@essential-projects/http_node';
import {restSettings} from '@process-engine/kpi_api_contracts';

import {wrap} from 'async-middleware';

import {KpiApiController} from './kpi_api_controller';

import {resolveKpiContext} from './middlewares';

export class KpiApiRouter extends BaseRouter {

  private _kpiApiRestController: KpiApiController;

  constructor(kpiApiRestController: KpiApiController) {
    super();
    this._kpiApiRestController = kpiApiRestController;
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
    this.router.use(wrap(resolveKpiContext));
  }

  private registerRoutes(): void {
    const controller: KpiApiController = this.kpiApiRestController;

    this.router.get(restSettings.paths.getRuntimeInformationForProcessModel, wrap(controller.getRuntimeInformationForProcessModel.bind(controller)));
    this.router.get(restSettings.paths.getRuntimeInformationForFlowNode, wrap(controller.getRuntimeInformationForFlowNode.bind(controller)));
    this.router.get(restSettings.paths.getActiveTokensForProcessModel, wrap(controller.getActiveTokensForProcessModel.bind(controller)));
    this.router.get(restSettings.paths.getActiveTokensForCorrelationAndProcessModel,
                    wrap(controller.getActiveTokensForCorrelationAndProcessModel.bind(controller)));
    this.router.get(restSettings.paths.getActiveTokensForFlowNode, wrap(controller.getActiveTokensForFlowNode.bind(controller)));
  }
}
