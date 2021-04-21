export class Transfer {
  constructor(
    public user: string,
    public phone: string,
    public amount: number,
    public desc: string,
    public msg: string,
    public mode: string,
    public createdAt: string,
    public metadata?: {}
  ) {}
}
