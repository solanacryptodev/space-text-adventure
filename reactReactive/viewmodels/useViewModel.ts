import constructor from 'tsyringe/dist/typings/types/constructor';
import { useEffect, useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import { get, hasIn, bind } from 'lodash';
import { DependencyService } from '../services/DependencyService';
import { getObjectName, lifeCycleLog, LifeCycleObject } from '../core/LifeCycleObject';

import { ViewModel } from './ViewModel';

interface IUseDependencyConfig {
  name: string;
  onInitialize: any;
  onBeforePaint: any;
  onAfterPaint: any;
  onEnd: any;
  [key: string]: any;
}

type UseDependencyConfig = Partial<IUseDependencyConfig>;

function handleReactLifeCycle<T extends LifeCycleObject>(
  lifeCycleObj: T,
  config?: UseDependencyConfig
): T {
  useIsomorphicLayoutEffect(() => {
    lifeCycleLog('~~~~ handleReactLifeCycle useEffect init call for:', getObjectName(lifeCycleObj));
    lifeCycleObj.initialize(config);

    if (hasIn(lifeCycleObj, 'onBeforePaint')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const onBeforePaint = get(lifeCycleObj, 'onBeforePaint').bind(lifeCycleObj);
      onBeforePaint(config);
    }

    return () => {
      lifeCycleLog(
        '~~~~ handleReactLifeCycle useEffect cleanup call for:',
        getObjectName(lifeCycleObj)
      );
      lifeCycleObj.end();
    };
  }, []);

  useEffect(() => {
    if (hasIn(lifeCycleObj, 'onAfterPaint')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const onAfterPaint = get(lifeCycleObj, 'onAfterPaint').bind(lifeCycleObj);
      onAfterPaint(config);
    }
  }, []);

  return lifeCycleObj;
}

export const useViewModel = <T extends ViewModel>(
  token: constructor<T>,
  config?: UseDependencyConfig
) => {
  const vm = DependencyService.resolve(token);

  if (!vm) {
    throw new Error(`Unable to resolve ${token} view model`);
  }

  const [viewModel] = useState(vm);

  handleReactLifeCycle(viewModel, config);

  return viewModel;
};
