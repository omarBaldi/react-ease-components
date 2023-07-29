interface Case<T> {
  condition: T;
  elementToRender: React.FunctionComponent;
}

type SwitchProps<T> = {
  conditionToEvaluate: T;
  cases: Case<T>[];
};

export default function Switch<T>({ conditionToEvaluate, cases }: SwitchProps<T>) {
  const conditionFound = cases.find(({ condition }) => condition === conditionToEvaluate);

  return (
    <>{typeof conditionFound !== 'undefined' && <conditionFound.elementToRender />}</>
  );
}
