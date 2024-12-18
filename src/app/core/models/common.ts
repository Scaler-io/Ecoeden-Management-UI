export interface CommandResponse {
  status?: CommandResultStatus;
  commandType: string;
  error?: string;
}

export enum CommandResultStatus {
  Success = 'Success',
  Failure = 'Failure'
}
