import dayjs from 'dayjs';
import { IContract } from 'app/shared/model/contract.model';
import { IProject } from 'app/shared/model/project.model';
import { LifecycleStatus } from 'app/shared/model/enumerations/lifecycle-status.model';

export interface ISubcontract {
  id?: number;
  contractId?: number;
  projectId?: number;
  subcontractCipher?: string;
  statusId?: string;
  cooperationTypeId?: string;
  sum?: number | null;
  positions?: number;
  currencyId?: string;
  paymentTermTypeId?: string;
  paymentTermId?: string;
  startDate?: string;
  finishDate?: string;
  typeId?: string | null;
  tasktTypeId?: string;
  technologyId?: string;
  domenId?: string;
  link?: string | null;
  lifecycleStatus?: LifecycleStatus | null;
  contract?: IContract | null;
  project?: IProject | null;
}

export const defaultValue: Readonly<ISubcontract> = {};
