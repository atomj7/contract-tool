import { IProject } from 'app/shared/model/project.model';
import { IContract } from 'app/shared/model/contract.model';
import { LifecycleStatus } from 'app/shared/model/enumerations/lifecycle-status.model';

export interface IClient {
  id?: number;
  name?: string;
  salesManagerId?: number;
  countryId?: string;
  partnerStatus?: boolean;
  contactPerson?: string;
  contractEmail?: string;
  industryId?: string | null;
  signer?: string | null;
  signerPosition?: string | null;
  legalAdress?: string | null;
  registrationNumber?: string | null;
  baseOfActivityId?: string | null;
  vatNumber?: string | null;
  bankName?: string | null;
  bankAdress?: string | null;
  swiftCode?: string | null;
  ibanCode?: string | null;
  lifecycleStatus?: LifecycleStatus | null;
  projects?: IProject[] | null;
  contracts?: IContract[] | null;
}

export const defaultValue: Readonly<IClient> = {
  partnerStatus: false,
};
