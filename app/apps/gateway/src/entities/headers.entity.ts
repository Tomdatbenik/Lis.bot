export class RequiredHeaders {
  constructor(headers: any) {
    this.authorization = headers?.authorization ? headers?.authorization : '';
  }

  authorization: string;
}
