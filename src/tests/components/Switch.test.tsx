import '@testing-library/jest-dom';
import { queryByText, render } from '@testing-library/react';
import Switch from '../../components/Switch';

/**
 * TODO: use normal function to access condition value
 * TODO: create folder in tests called utils that render whichever component you have and return the container and other properties (DRY)
 */
describe('Switch', () => {
  it('should render correct React function component if condition matches the conditionToEvaluate', () => {
    const cases: React.ComponentProps<typeof Switch>['cases'] = [
      { condition: 'String test #1', elementToRender: () => <h1>String test #1</h1> },
      { condition: 'String test #2', elementToRender: () => <h1>String test #2</h1> },
      { condition: 'String test #3', elementToRender: () => <h1>String test #3</h1> },
    ];

    const { container } = render(
      <Switch conditionToEvaluate='String test #3' cases={cases} />
    );

    const headingElement = queryByText(container, 'String test #3');
    expect(headingElement).toBeInTheDocument();
  });
});
