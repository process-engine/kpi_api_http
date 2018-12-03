import {ActiveToken, FlowNodeRuntimeInformation, IKpiApi, KpiRequest} from '@process-engine/kpi_api_contracts';

import {Response} from 'express';

export class KpiApiController {
  public config: any = undefined;

  private httpCodeSuccessfulResponse: number = 200;

  private _kpiService: IKpiApi;

  constructor(kpiService: IKpiApi) {
    this._kpiService = kpiService;
  }

  private get kpiService(): IKpiApi {
    return this._kpiService;
  }

  public async getRuntimeInformationForProcessModel(request: KpiRequest, response: Response): Promise<void> {
    const processModelId: string = request.params.process_model_id;

    const result: Array<FlowNodeRuntimeInformation> =
      await this.kpiService.getRuntimeInformationForProcessModel(request.identity, processModelId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

  public async getRuntimeInformationForFlowNode(request: KpiRequest, response: Response): Promise<void> {
    const processModelId: string = request.params.process_model_id;
    const flowNodeId: string = request.params.flow_node_id;

    const result: FlowNodeRuntimeInformation =
      await this.kpiService.getRuntimeInformationForFlowNode(request.identity, processModelId, flowNodeId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

  public async getActiveTokensForProcessModel(request: KpiRequest, response: Response): Promise<void> {
    const processModelId: string = request.params.process_model_id;

    const result: Array<ActiveToken> = await this.kpiService.getActiveTokensForProcessModel(request.identity, processModelId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

  public async getActiveTokensForCorrelationAndProcessModel(request: KpiRequest, response: Response): Promise<void> {
    const correlationId: string = request.params.correlation_id;
    const processModelId: string = request.params.process_model_id;

    const result: Array<ActiveToken> = await this
      .kpiService
      .getActiveTokensForCorrelationAndProcessModel(request.identity, correlationId, processModelId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

  public async getActiveTokensForFlowNode(request: KpiRequest, response: Response): Promise<void> {
    const flowNodeId: string = request.params.flow_node_id;

    const result: Array<ActiveToken> = await this.kpiService.getActiveTokensForFlowNode(request.identity, flowNodeId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }
}
