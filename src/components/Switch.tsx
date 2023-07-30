import React, { useMemo } from 'react';

type AllowedTypes = string | boolean | number | object | unknown[];

interface Case<T> {
  condition: T;
  elementToRender: React.FunctionComponent | keyof JSX.IntrinsicElements;
}

type SwitchProps<T> = {
  conditionToEvaluate: T;
  cases: Case<T>[];
  fallbackElement?: React.ReactNode;
};

export default function Switch<T extends AllowedTypes>({
  conditionToEvaluate,
  cases,
  fallbackElement,
}: SwitchProps<T>) {
  const memoizedCasesRecord = useMemo(
    () =>
      cases.reduce((acc, { condition, elementToRender }) => {
        /**
         * @description
         * Considering the fact that the object
         * only accept the followings types "string | number | symbol" as keys,
         * I need to make sure to convert all of them into strings.
         */
        const stringifiedConditionKey = JSON.stringify(condition);
        acc[stringifiedConditionKey] = elementToRender;

        return acc;
      }, {} as Record<string, Case<T>['elementToRender']>),
    [cases]
  );

  const ElementToUse = memoizedCasesRecord[JSON.stringify(conditionToEvaluate)] as
    | React.FunctionComponent
    | undefined;

  return typeof ElementToUse !== 'undefined' ? (
    <ElementToUse />
  ) : (
    fallbackElement ?? <React.Fragment></React.Fragment>
  );
}
