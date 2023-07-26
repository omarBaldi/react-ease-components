import React from 'react';

type ShowProps = {
  when: boolean;
  children: React.ReactNode;
  fallbackElement?: React.ReactNode;
};

export default function Show({
  when: shouldRenderChildren,
  children,
  fallbackElement,
}: ShowProps) {
  return shouldRenderChildren
    ? children
    : fallbackElement ?? <React.Fragment></React.Fragment>;
}
