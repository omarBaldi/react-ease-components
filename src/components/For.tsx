import React from 'react';

/**
 * @description
 * Prevent from passing other elements rather than objects
 */
type FunctionComponent<T extends object> = {
  __type: 'FunctionComponent';
  each: T[];
  element: React.FunctionComponent<T>;
};

type RecursiveObjectProperties<T> = T extends object
  ? {
      [P in keyof T]-?: T[P] extends string | number
        ? P
        : T[P] extends object
        ? `${string & P}.${string & RecursiveObjectProperties<T[P]>}`
        : never;
    }[keyof T]
  : never;

type NativeElement<T extends object> = {
  __type: 'NativeElement';
  element: keyof JSX.IntrinsicElements;
} & (
  | {
      each: T[];
      propertyToRender: RecursiveObjectProperties<T>;
    }
  | {
      each: (string | number)[];
    }
);

function isNativeElement<T extends object>(
  props: FunctionComponent<T> | NativeElement<T>
): props is NativeElement<T> {
  return props.__type === 'NativeElement';
}

export default function For<T extends object>(
  props: FunctionComponent<T> | NativeElement<T>
) {
  if (isNativeElement(props)) {
    return 'propertyToRender' in props
      ? props.each.map((objElement, index) => {
          return React.createElement(props.element, {
            key: `native-element-obj-#${index}`,
            /**
             * TODO: to fix
             */
            children: '',
          });
        })
      : props.each.map((el, index) =>
          React.createElement(props.element, {
            key: `native-element-#${index}`,
            children: el,
          })
        );
  }

  const { each, element: ElementToRender } = props;

  return each.map((el, index) => <ElementToRender key={index} {...el} />);
}
