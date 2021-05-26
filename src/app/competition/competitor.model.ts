export class Competitor {
  constructor(
    public id: string,
    public user: string,
    public currentQuestionNumber: number,
    public type: string,
    public score?: number
  ) {}
}
