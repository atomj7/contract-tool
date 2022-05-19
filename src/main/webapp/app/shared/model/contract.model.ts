import dayjs from 'dayjs';
import { IClient } from 'app/shared/model/client.model';
import { ISubcontract } from 'app/shared/model/subcontract.model';
import { LifecycleStatus } from 'app/shared/model/enumerations/lifecycle-status.model';

export interface IContract {
  id?: number;
  cipher?: string;
  providerId?: string;
  typeId?: string | null;
  sum?: number;
  positionCount?: number;
  currencyId?: string;
  paymentTerm?: number;
  paymentTermTypeId?: string;
  startDate?: string;
  finishDate?: string;
  statusId?: string;
  link?: string | null;
  lifecycleStatus?: LifecycleStatus | null;
  client?: IClient | null;
  subcontracts?: ISubcontract[] | null;
}

export const defaultValue: Readonly<IContract> = {};
