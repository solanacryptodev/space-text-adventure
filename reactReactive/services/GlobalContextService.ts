import { nanoid } from 'nanoid';
import { get, set, keys } from 'lodash';

export interface Injectable<T> {
  new (): T;
}

export interface InjectableWithArgs<T> {
  new (...args: any[]): T;
}

export type InjectCtor<T> = Injectable<T> | InjectableWithArgs<T>;

export interface Contextable {
  isSSR: boolean;
}

export class GlobalScopeService implements Contextable {
  isSSR = false;

  globalContext: any;

  // eslint-disable-next-line no-use-before-define
  private static instance: GlobalScopeService;

  static readonly STATIC_CONTEXT_ID = nanoid(5);
  static readonly GLOBAL_CONTEXTS_ID = '__S_a_GlobalContextStore';

  objectsStored = new Array<string>();

  constructor() {
    const isWindowDefined = typeof window !== 'undefined';
    const isGlobalDefined = typeof global !== 'undefined';

    if (!isGlobalDefined && !isWindowDefined)
      throw new Error(
        `${GlobalScopeService.STATIC_CONTEXT_ID}; Unknown environment: Global is undefined and Window is undefined `
      );

    this.globalContext = isWindowDefined ? window : global;
    set(this.globalContext, GlobalScopeService.GLOBAL_CONTEXTS_ID, this);
    this.isSSR = !isWindowDefined;
  }

  static Return(): GlobalScopeService {
    if (!GlobalScopeService.instance) {
      const gcs = GlobalScopeService.Search<GlobalScopeService>(
        GlobalScopeService.GLOBAL_CONTEXTS_ID
      );
      GlobalScopeService.instance = gcs ?? new GlobalScopeService();
    }
    return GlobalScopeService.instance;
  }

  protected static Search<T>(key: string): T {
    const isWindowDefined = typeof window !== 'undefined';
    const isGlobalDefined = typeof global !== 'undefined';
    if (isWindowDefined) return get(window, key);
    if (isGlobalDefined) return get(global, key);

    throw new Error('Environment does not provide a valid global context');
  }

  static FindInGlobal<T>(key: string): T | null {
    const globalContextStore = GlobalScopeService.Return();
    return get(globalContextStore.globalContext, key);
  }

  static PutInGlobal<T>(key: string, obj: T): T {
    const globalContextStore = GlobalScopeService.Return();
    set(globalContextStore.globalContext, key, obj);
    globalContextStore.objectsStored.push(key);
    if (obj && keys(obj).includes('isSSR')) {
      set(obj as any, 'isSSR', globalContextStore.isSSR);
    }
    if (obj && keys(obj).includes('context')) {
      const { context = '' } = obj as any;
      set(globalContextStore.globalContext, `${key}_${context}`, obj);
    }
    return obj;
  }

  static RemoveFromGlobalScope(key: string): void {
    const globalContextStore = GlobalScopeService.Return();
    set(globalContextStore.globalContext, key, null);
  }

  static RemoveAllFromGlobal(): void {
    const globalContextStore = GlobalScopeService.Return();
    globalContextStore.objectsStored.forEach((objectName) => {
      GlobalScopeService.RemoveFromGlobalScope(objectName);
    });
    globalContextStore.objectsStored = new Array<string>();
  }
}

export function FindOrCreateInGlobal<T extends Contextable>(
  key: string,
  creator: Injectable<T>
): T {
  const { FindInGlobal, PutInGlobal } = GlobalScopeService;
  const instance = FindInGlobal<T>(key) ?? PutInGlobal(key, new creator());
  return instance;
}
