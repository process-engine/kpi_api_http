import {ActiveToken, AverageFlowNodeRuntime, IKpiApiService, KpiRequest} from '@process-engine/kpi_api_contracts';

import {Response} from 'express';

export class KpiApiController {
  public config: any = undefined;

  private httpCodeSuccessfulResponse: number = 200;

  private _kpiService: IKpiApiService;

  constructor(kpiService: IKpiApiService) {
    this._kpiService = kpiService;
  }

  private get kpiService(): IKpiApiService {
    return this._kpiService;
  }

  public async getAverageRuntimeForProcessModel(request: KpiRequest, response: Response): Promise<void> {
    const processModelId: string = request.params.process_model_id;

    const result: Array<AverageFlowNodeRuntime> = await this.kpiService.getAverageRuntimeForProcessModel(request.identity, processModelId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

  public async getAverageRuntimeForFlowNode(request: KpiRequest, response: Response): Promise<void> {
    const processModelId: string = request.params.process_model_id;
    const flowNodeId: string = request.params.flow_node_id;

    const result: AverageFlowNodeRuntime = await this.kpiService.getAverageRuntimeForFlowNode(request.identity, processModelId, flowNodeId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

  public async getActiveTokensForProcessModel(request: KpiRequest, response: Response): Promise<void> {
    const processModelId: string = request.params.process_model_id;

    const result: Array<ActiveToken> = await this.kpiService.getActiveTokensForProcessModel(request.identity, processModelId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

  public async getActiveTokensForFlowNode(request: KpiRequest, response: Response): Promise<void> {
    const flowNodeId: string = request.params.flow_node_id;

    const result: Array<ActiveToken> = await this.kpiService.getActiveTokensForFlowNode(request.identity, flowNodeId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }
}
