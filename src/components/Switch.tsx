import React from 'react';

interface Case<T> {
  condition: T;
  elementToRender: React.FunctionComponent;
}

type SwitchProps<T> = {
  conditionToEvaluate: T;
  cases: Case<T>[];
  fallbackElement?: React.ReactNode;
};

export default function Switch<T>({
  conditionToEvaluate,
  cases,
  fallbackElement,
}: SwitchProps<T>) {
  const conditionFound = cases.find(({ condition }) => condition === conditionToEvaluate);

  return typeof conditionFound !== 'undefined' ? (
    <conditionFound.elementToRender />
  ) : (
    fallbackElement ?? <React.Fragment></React.Fragment>
  );
}
