import { ViewModel } from './ViewModel';

export abstract class StandardViewModel extends ViewModel {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onBeforePaint(config?: any): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onAfterPaint(config?: any): void {}
}
