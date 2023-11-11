import '@abraham/reflection';
import { get, isFunction, memoize, set } from 'lodash';
import { container, DependencyContainer, InjectionToken, Lifecycle } from 'tsyringe';
import constructor from 'tsyringe/dist/typings/types/constructor';
import { GlobalScopeService } from './GlobalContextService';

function getContainer(): DependencyContainer {
  let globalContainer = GlobalScopeService.FindInGlobal(
    '__RK_Global_Container'
  ) as DependencyContainer;
  if (!globalContainer) {
    globalContainer = container;
    GlobalScopeService.PutInGlobal('__RK_Global_Container', globalContainer);
  }
  return globalContainer;
}

const globalContainer = memoize(getContainer);

const _container = globalContainer();

export class DependencyService {
  static registerValue<T>(token: InjectionToken<T>, value: T): DependencyContainer {
    return _container.register(token, { useValue: value });
  }

  static registerSingleton<T>(token: InjectionToken<T>): DependencyContainer {
    if (!isFunction(token)) throw new Error(`{token} must be a function`);
    return _container.registerSingleton(token as unknown as constructor<T>);
  }

  static registerAsSingleton<T>(from: InjectionToken<T>, to: InjectionToken<T>): DependencyService {
    return _container.registerSingleton(from, to);
  }

  static registerClass<T>(token: constructor<T>): DependencyContainer {
    return _container.register(token, { useClass: token }, { lifecycle: Lifecycle.Transient });
  }

  static resolve<T extends unknown>(token: InjectionToken<T>): T {
    const t = _container.resolve(token);
    return t;
  }

  static resolveSafe<T extends unknown>(token: InjectionToken<T>): T | null {
    try {
      if (_container.isRegistered(token)) {
        return DependencyService.resolve(token);
      }
      if (isFunction(token)) {
        const rVal = DependencyService.resolve(token);
        return rVal;
      }
    } catch (e) {
      console.error(`~~~ Error resolving: ${token.toString().substring(0, 50)}`, e);
    }

    return null;
  }

  static container(): DependencyContainer {
    return _container;
  }

  static isRegistered<T>(token: InjectionToken<T>): boolean {
    return _container.isRegistered(token);
  }
}

export const resolveDependency = <T>(token: InjectionToken<T>): T | null => {
  return DependencyService.resolveSafe(token);
};
