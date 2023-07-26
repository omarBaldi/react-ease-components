import React from 'react';

type ForProps<T> = {
  each: T[];
  element: React.FunctionComponent<T>;
};

export default function For<T>({ each, element: ElementToRender }: ForProps<T>) {
  return each.map((el, index) => <ElementToRender key={index} {...el} />);
}
