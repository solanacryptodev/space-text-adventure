import { ObservableReactionContainer } from '../core/ObservableReactionContainer';

export abstract class ViewModel extends ObservableReactionContainer {
  public abstract onBeforePaint(config?: any): void;
  public abstract onAfterPaint(config?: any): void;
}
