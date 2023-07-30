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

  it("should render correct native DOM elements when type is set to 'NativeElement' with object array and propertyToRender", async () => {
    const list = [
      { title: 'First', description: 'First - description' },
      { title: 'Second', description: 'Second - description' },
      { title: 'Third', description: 'Third - description' },
    ];

    const propertyToRender: keyof (typeof list)[0] = 'title';

    const { container } = render(
      <For
        __type='NativeElement'
        each={list}
        propertyToRender={propertyToRender}
        element='button'
      />
    );

    const buttonElements = await findAllByRole(container, 'button');
    expect(buttonElements.length).toEqual(list.length);

    buttonElements.forEach((buttonElement, index) => {
      const expectedInnerText = list[index][propertyToRender];
      expect(buttonElement.innerText).toBe(expectedInnerText);
    });
  });
});
