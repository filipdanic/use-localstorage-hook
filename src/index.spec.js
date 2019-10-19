import {fireEvent, render} from '@testing-library/react';
import React from 'react';
import useLocalStorage from '.';

afterEach(() => {
  localStorage.clear();
});

test('reads and updates value', () => {
  function TestComponent() {
    const [value, setValue] = useLocalStorage('test', {foo: 'bar'});

    return (
      <div>
        <label htmlFor='output'>Value</label>
        <output id='output'>{JSON.stringify(value)}</output>

        <button onClick={() => setValue({foo: 1})}>Set to 1</button>
        <button onClick={() => setValue({foo: 5})}>Set to 5</button>
      </div>
    );
  }

  const {getByLabelText, getByText} = render(<TestComponent />);

  fireEvent.click(getByText('Set to 1'));
  expect(localStorage.getItem('test')).toBe(JSON.stringify({foo: 1}));
  expect(getByLabelText('Value').innerHTML).toBe(localStorage.getItem('test'));

  fireEvent.click(getByText('Set to 5'));
  expect(localStorage.getItem('test')).toBe(JSON.stringify({foo: 5}));
  expect(getByLabelText('Value').innerHTML).toBe(localStorage.getItem('test'));
});

test('supports useRawValues', () => {
  function TestComponent() {
    const [value, setValue] = useLocalStorage('test', JSON.stringify({foo: 'bar'}), true);

    return (
      <div>
        <label htmlFor='output'>Value</label>
        <output id='output'>{value}</output>

        <button onClick={() => setValue(JSON.stringify({foo: 1}))}>Set to 1</button>
        <button onClick={() => setValue(JSON.stringify({foo: 5}))}>Set to 5</button>
      </div>
    );
  }

  const {getByLabelText, getByText} = render(<TestComponent />);

  fireEvent.click(getByText('Set to 1'));
  expect(localStorage.getItem('test')).toBe(JSON.stringify({foo: 1}));
  expect(getByLabelText('Value').innerHTML).toBe(localStorage.getItem('test'));

  fireEvent.click(getByText('Set to 5'));
  expect(localStorage.getItem('test')).toBe(JSON.stringify({foo: 5}));
  expect(getByLabelText('Value').innerHTML).toBe(localStorage.getItem('test'));
});

test('supports subscribe', () => {
  function TestComponent() {
    const [value] = useLocalStorage('test', {foo: 'bar'}, false, true);

    return (
      <div>
        <label htmlFor='output'>Value</label>
        <output id='output'>{JSON.stringify(value)}</output>
      </div>
    );
  }

  const {getByLabelText} = render(<TestComponent />);

  fireEvent(window, new StorageEvent('storage', {key: 'test', newValue: JSON.stringify({foo: 1})}));
  expect(getByLabelText('Value').innerHTML).toBe(JSON.stringify({foo: 1}));

  fireEvent(window, new StorageEvent('storage', {key: 'test', newValue: JSON.stringify({foo: 5})}));
  expect(getByLabelText('Value').innerHTML).toBe(JSON.stringify({foo: 5}));
});
