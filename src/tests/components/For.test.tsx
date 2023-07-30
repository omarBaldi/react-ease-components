import { findAllByRole, render } from '@testing-library/react';
import For from '../../components/For';

function TestComponent(props: { title: string }) {
  return <h1>{props.title}</h1>;
}

describe('For', () => {
  it("should render React function components if type is set to 'ComponentForProps'", async () => {
    const list = [{ title: 'First' }, { title: 'Second' }, { title: 'Third' }];

    const { container } = render(
      <For __type='ComponentForProps' each={list} element={TestComponent} />
    );

    const headingsElements = await findAllByRole(container, 'heading');
    expect(headingsElements.length).toBe(list.length);

    headingsElements.forEach((headingElement, index) => {
      const expectedInnerText = list[index].title;
      expect(headingElement.innerText).toBe(expectedInnerText);
    });
  });
});
