export interface CommandResponse {
  status?: CommandResultStatus;
  commandType: string;
  error?: string;
  supplierId: string;
}

export enum CommandResultStatus {
  Success = 'Success',
  Failure = 'Failure'
}
