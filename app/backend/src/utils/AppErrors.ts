export default class AppErrors extends Error {
  public _status: number;

  constructor(status:number, message: string) {
    super(message);
    this._status = status;
  }
}
