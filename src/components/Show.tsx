import React from 'react';

type ShowProps = {
  when: boolean;
  children: React.ReactNode;
};

export default function Show({ when: shouldRenderChildren, children }: ShowProps) {
  return <React.Fragment>{shouldRenderChildren && children}</React.Fragment>;
}
