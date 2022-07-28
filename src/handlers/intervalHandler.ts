export class IntervalHandler {
  private intervalFunctions: ((now: Date) => Promise<void>)[];
  constructor(intervalFunctions: ((now: Date) => Promise<void>)[]) {
    this.intervalFunctions = intervalFunctions;
  }
  public initInterval(intervalTime: number) {
    setInterval(async () => {
      const now: Date = new Date();
      this.intervalFunctions.forEach(async (fnc) => {
        await fnc(now);
      });
    }, intervalTime);
  }
}
