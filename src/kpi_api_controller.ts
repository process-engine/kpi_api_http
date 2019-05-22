import {IKpiApi, KpiRequest} from '@process-engine/kpi_api_contracts';

import {Response} from 'express';

export class KpiApiController {

  private httpCodeSuccessfulResponse = 200;

  private kpiService: IKpiApi;

  constructor(kpiService: IKpiApi) {
    this.kpiService = kpiService;
  }

  public async getRuntimeInformationForProcessModel(request: KpiRequest, response: Response): Promise<void> {
    const processModelId = request.params.process_model_id;

    const result = await this.kpiService.getRuntimeInformationForProcessModel(request.identity, processModelId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

  public async getRuntimeInformationForFlowNode(request: KpiRequest, response: Response): Promise<void> {
    const processModelId = request.params.process_model_id;
    const flowNodeId = request.params.flow_node_id;

    const result = await this.kpiService.getRuntimeInformationForFlowNode(request.identity, processModelId, flowNodeId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

  public async getActiveTokensForProcessModel(request: KpiRequest, response: Response): Promise<void> {
    const processModelId = request.params.process_model_id;

    const result = await this.kpiService.getActiveTokensForProcessModel(request.identity, processModelId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

  public async getActiveTokensForCorrelationAndProcessModel(request: KpiRequest, response: Response): Promise<void> {
    const correlationId = request.params.correlation_id;
    const processModelId = request.params.process_model_id;

    const result = await this
      .kpiService
      .getActiveTokensForCorrelationAndProcessModel(request.identity, correlationId, processModelId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

  public async getActiveTokensForProcessInstance(request: KpiRequest, response: Response): Promise<void> {
    const processInstanceId = request.params.process_instance_id;

    const result = await this.kpiService.getActiveTokensForProcessInstance(request.identity, processInstanceId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

  public async getActiveTokensForFlowNode(request: KpiRequest, response: Response): Promise<void> {
    const flowNodeId = request.params.flow_node_id;

    const result = await this.kpiService.getActiveTokensForFlowNode(request.identity, flowNodeId);

    response.status(this.httpCodeSuccessfulResponse).json(result);
  }

}
