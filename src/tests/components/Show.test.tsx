import '@testing-library/jest-dom';
import { findAllByRole, render } from '@testing-library/react';
import Show from '../../components/Show';

describe('Show', () => {
  it.skip('should render children elements if "when" prop is set to true', async () => {
    const { container } = render(
      <Show when={true}>
        <>
          <h3>Hello from Show custom component</h3>
          <h1>This is another heading</h1>
        </>
      </Show>
    );

    const headings = await findAllByRole(container, 'heading');
    expect(headings.length).toBe(2);

    const [firstHeading, secondHeading] = headings;
    expect(firstHeading.innerText).toBe('Hello from Show custom component');
    expect(secondHeading.innerText).toBe('This is another heading');
  });
});
