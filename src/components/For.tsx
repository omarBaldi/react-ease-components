import React from 'react';

/**
 * @description
 * Prevent from passing other elements rather than objects
 */
type ComponentForProps<T extends object> = {
  __type: 'ComponentForProps';
  each: T[];
  element: React.FunctionComponent<T>;
};

type NativeElement = {
  __type: 'NativeElement';
  each: string[];
  element: keyof JSX.IntrinsicElements;
};

function isNativeElement<T extends object>(
  props: ComponentForProps<T> | NativeElement
): props is NativeElement {
  return props.__type === 'NativeElement';
}

export default function For<T extends object>(
  props: ComponentForProps<T> | NativeElement
) {
  return isNativeElement(props)
    ? props.each.map((el, index) => {
        return React.createElement(props.element, {
          key: index,
          children: el,
        });
      })
    : props.each.map((el, index) => {
        return <props.element key={index} {...el} />;
      });
}
