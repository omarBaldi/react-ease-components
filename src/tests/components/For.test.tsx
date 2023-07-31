import '@testing-library/jest-dom';
import { findAllByRole, queryByText, render } from '@testing-library/react';
import For from '../../components/For';

function TestComponent(props: { title: string }) {
  return <h1>{props.title}</h1>;
}

describe('For', () => {
  it("should render React function components if type is set to 'FunctionComponent'", async () => {
    const list = [{ title: 'First' }, { title: 'Second' }, { title: 'Third' }];

    const { container } = render(
      <For __type='FunctionComponent' each={list} element={TestComponent} />
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

  it("should render correct nested object property into native element when type is set to 'NativeElement'", async () => {
    const testObj = [
      {
        title: 'Title here',
        description: 'description here',
        age: 27,
        ok: true,
        location: {
          born: 'Italy',
          moved: 'Denmark',
          anotherNestedProperty: {
            nestedAge: 72,
            nestedWeight: 80,
            nestedBoolean: true,
            nestedNickname: 'nickname 1',
          },
        },
      },
      {
        title: 'Title here 2',
        description: 'description here 2',
        age: 24,
        ok: false,
        location: {
          born: 'Italy',
          moved: 'None',
          anotherNestedProperty: {
            nestedAge: 71,
            nestedBoolean: true,
            nestedWeight: 81,
            nestedNickname: 'nickname 2',
          },
        },
      },
    ];

    const { container } = render(
      <For
        __type='NativeElement'
        each={testObj}
        propertyToRender='location.anotherNestedProperty.nestedNickname'
        element='div'
      />
    );

    const elements = [...Array(testObj.length)].map((_, index) => {
      return queryByText(
        container,
        testObj[index].location.anotherNestedProperty.nestedNickname
      );
    });

    for (const element of elements) {
      expect(element).toBeInTheDocument();
    }
  });
});
