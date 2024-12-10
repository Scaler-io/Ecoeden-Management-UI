export class BaseService {
  getHttpHeaders(subscriptionKey: string, apiVersion: string = 'v1') {
    return {
      'api-version': apiVersion,
      'ocp-apim-subscriptionkey': subscriptionKey
    };
  }
}
