import dayjs from 'dayjs';
import { IClient } from 'app/shared/model/client.model';
import { LifecycleStatus } from 'app/shared/model/enumerations/lifecycle-status.model';

export interface IProject {
  id?: number;
  clientId?: number;
  name?: string;
  startDate?: string;
  finishDate?: string | null;
  link?: string | null;
  statusId?: string | null;
  lifecycleStatus?: LifecycleStatus | null;
  client?: IClient | null;
}

export const defaultValue: Readonly<IProject> = {};
