/**
 * Object which helps manage life cycle calls, should be the base class for items that deal with life cycles, such
 * as React view life cycle, or network life cycle class.
 */
import { nanoid } from 'nanoid';
import { InjectionToken } from 'tsyringe';
import { clone, get, hasIn, memoize, pull } from 'lodash';
import { makeObservable, observable, runInAction } from 'mobx';

import { DependencyService } from '../services/DependencyService';
import { GlobalScopeService } from '../services/GlobalContextService';

const SHOULD_LOG_LIFE_CYCLE = false;

export const lifeCycleLog = SHOULD_LOG_LIFE_CYCLE ? console.log : () => {};

export const getObjectName = memoize((obj) => {
  if (obj.name) return `${obj.name}`;
  return Object.getPrototypeOf(obj).constructor.name;
});

export type LifeCycleConfig = Record<string, unknown>;

export interface ILifeCycleObject {
  initialize(config?: any): void;
  end(config?: any): void;
}

export abstract class LifeCycleObject implements ILifeCycleObject {
  protected _id: string = '';
  protected initGuard = 0;
  protected _memoKey: string = '';
  protected _isSSR = true;
  protected dependencies: Array<any>;

  isInitialized = false;

  protected constructor() {
    this._memoKey = this._id;
    this._isSSR = GlobalScopeService.Return().isSSR;
    this.dependencies = new Array<any>();

    makeObservable(this, {
      isInitialized: observable,
    });
  }

  initialize(config?: any) {
    this.initGuard += 1;

    lifeCycleLog(
      `!!!!! ${getObjectName(this)} initialize() called. Total holds: ${this.initGuard}`
    );

    if (this.initGuard > 1) {
      return;
    }

    lifeCycleLog(`~~~ ${getObjectName(this)} initializing`);

    this.initializeDependencies(config);
    this.onInitialize(config);

    runInAction(() => {
      this.isInitialized = true;
    });
  }

  end(config?: any) {
    this.initGuard -= 1;

    lifeCycleLog(`!!!!! ${getObjectName(this)} end() called. Remaining holds: ${this.initGuard}`);

    if (this.initGuard > 0) {
      return;
    }

    this.initGuard = 0;

    lifeCycleLog(`~~~ ${getObjectName(this)} ending - all holds removed`);

    this._memoKey = nanoid(10);
    this.onEnd(config);
    this.endDependencies();

    this.isInitialized = false;
  }

  get isSSR(): boolean {
    return this._isSSR;
  }

  get isCSR(): boolean {
    return !this._isSSR;
  }

  get id(): string {
    return clone(this._id);
  }

  get memoKey(): string {
    return clone(this._memoKey);
  }

  public addDependency<T>(token: InjectionToken<T>): T {
    const depObj = DependencyService.resolve(token);
    this.dependencies.push(depObj);

    lifeCycleLog(
      `~~ ${getObjectName(this)} Adding dependency`,
      getObjectName(depObj),
      `DepList: [ ${this.dependencies.map((obj) => getObjectName(obj)).join(', ')} ]`
    );

    return depObj as T;
  }

  public removeDependency(token: InjectionToken<any>): void {
    const depObj = DependencyService.resolveSafe(token);
    if (!depObj) {
      throw new Error(`Unable to resolve ${String(token)}`);
    }

    if (this.dependencies.find((value) => value === depObj)) {
      if (this.isLifeCycleObj(depObj)) {
        const end = get(depObj, 'end').bind(depObj);
        end();
      }

      pull(this.dependencies, depObj);
    }
  }

  protected initializeDependencies(config?: any): void {
    lifeCycleLog(
      `~~~ ${getObjectName(this)}: Going to init: `,
      this.dependencies.map((obj) => getObjectName(obj)).join(', ')
    );
    this.dependencies.forEach((value) => {
      if (this.isLifeCycleObj(value)) {
        const initialize = get(value, 'initialize').bind(value);
        initialize(config);
      }
    });
  }

  protected endDependencies(): void {
    lifeCycleLog(
      `~~~ ${getObjectName(this)}: Going to end: `,
      this.dependencies.map((obj) => getObjectName(obj)).join(', ')
    );
    this.dependencies.forEach((value) => {
      if (this.isLifeCycleObj(value)) {
        lifeCycleLog('~~~Calling end on:', getObjectName(value));
        const end = get(value, 'end').bind(value);
        end();
      }
    });
  }

  private isLifeCycleObj(value: any): boolean {
    return hasIn(value, 'initialize') && hasIn(value, 'end');
  }

  protected abstract onInitialize(config?: any): void;
  protected abstract onEnd(config?: any): void;
}
