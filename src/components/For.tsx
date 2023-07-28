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

type NativeElement<T extends object> = {
  __type: 'NativeElement';
  element: keyof JSX.IntrinsicElements;
} & (
  | {
      each: T[];
      propertyToRender: keyof T;
    }
  | {
      each: (string | number)[];
    }
);

function isNativeElement<T extends object>(
  props: ComponentForProps<T> | NativeElement<T>
): props is NativeElement<T> {
  return props.__type === 'NativeElement';
}

export default function For<T extends object>(
  props: ComponentForProps<T> | NativeElement<T>
) {
  if (isNativeElement(props)) {
    return 'propertyToRender' in props
      ? props.each.map((objElement, index) =>
          React.createElement(props.element, {
            key: index,
            children: objElement[props.propertyToRender],
          })
        )
      : props.each.map((el, index) =>
          React.createElement(props.element, { key: index, children: el })
        );
  }

  const { each, element: ElementToRender } = props;

  return each.map((el, index) => <ElementToRender key={index} {...el} />);
}
