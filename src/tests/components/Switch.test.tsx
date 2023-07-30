import '@testing-library/jest-dom';
import { queryByText, render } from '@testing-library/react';
import Switch from '../../components/Switch';

describe('Switch', () => {
  const cases: React.ComponentProps<typeof Switch>['cases'] = [
    { condition: 'String test #1', elementToRender: () => <h1>String test #1</h1> },
    { condition: 'String test #2', elementToRender: () => <h1>String test #2</h1> },
    { condition: 'String test #3', elementToRender: () => <h1>String test #3</h1> },
  ];

  it('should render correct React function component if condition matches the condition to evaluate', () => {
    const { container } = render(
      <Switch conditionToEvaluate='String test #3' cases={cases} />
    );

    const headingElement = queryByText(container, 'String test #3');
    expect(headingElement).toBeInTheDocument();
  });

  it('should render correct fallback element if no condition matches the condition to evaluate', () => {
    const { container } = render(
      <Switch
        conditionToEvaluate='String test #4'
        cases={cases}
        fallbackElement={<div>No element found</div>}
      />
    );

    const notFoundElement = queryByText(container, 'No element found');
    expect(notFoundElement).toBeInTheDocument();
  });

  it('should not render anything if no condition matches the condition to evaluate and no fallback element is provided', () => {
    const { container } = render(
      <Switch conditionToEvaluate='String test #4' cases={cases} />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
