import {UnauthorizedError} from '@essential-projects/errors_ts';
import {IIdentity} from '@essential-projects/iam_contracts';

import {KpiRequest} from '@process-engine/kpi_api_contracts';

import {NextFunction, Response} from 'express';

export function resolveKpiContext(request: KpiRequest, response: Response, next: NextFunction): void {
  const bearerToken: string = request.get('authorization');

  if (!bearerToken) {
    throw new UnauthorizedError('No auth token provided!');
  }

  request.identity = <IIdentity> {
    token: bearerToken.substr('Bearer '.length),
  };

  next();
}
