export class Transaction {
  constructor(
    public amount: number,
    public purpose: string,
    public sender: { name: string; phone: string; user: string },
    public receiver: { name: string; phone: string; user: string },
    public msg: string,
    public createdAt: string,
    public metadata?: {}
  ) {}
}
