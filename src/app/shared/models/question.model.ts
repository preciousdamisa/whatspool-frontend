export class Question {
  constructor(
    public que: string,
    public optA: string,
    public optB: string,
    public optC: string,
    public optD: string,
    public optE: string,
    public no: number,
    public ans?: string,
    public expl?: string
  ) {}
}
