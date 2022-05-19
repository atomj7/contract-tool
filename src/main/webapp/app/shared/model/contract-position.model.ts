import { ISubcontract } from 'app/shared/model/subcontract.model';
import { LifecycleStatus } from 'app/shared/model/enumerations/lifecycle-status.model';

export interface IContractPosition {
  id?: number;
  contractPositionId?: string;
  employeeId?: number | null;
  numberContractPosition?: number;
  restrictionTypeId?: string;
  restriction?: number;
  currencyId?: string;
  rateAnHour?: number;
  statusId?: string;
  lifecycleStatus?: LifecycleStatus | null;
  subcontract?: ISubcontract | null;
}

export const defaultValue: Readonly<IContractPosition> = {};
