export type Provider = {
  _id: string;
  akuteId: string;
  eaProviderId: number;
  email: string;
  firstName: string;
  lastName: string;
  licensedStates: string[];
  npi: string;
  numberOfPatients?: number;
  type: string;
};
