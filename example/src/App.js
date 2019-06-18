import React from 'react';
import useLocalStorage from 'use-localstorage-hook';
import logo from './logo.png';

const App = () => {
  const [ val, setVal ] = useLocalStorage('demo', { a: 'Hello!' });
  return (
    <div className='card'>
      <img src={logo} style={{ height: 96, marginBottom: 12 }} alt='' />
      <img src='https://img.shields.io/npm/v/use-localstorage-hook.svg' alt='' />
      <h1>use-localstorage-hook</h1>
      <p>A custom React hook that lets you <mark>sync with localStorage</mark> and helps you manipulate objects via built-in <code>JSON.stringy</code> helpers.</p>
      <p>Start with:</p>
      <p><code>npm install --save use-localstorage-hook</code></p>
      <p>And in your component use the hook like this:</p>
      <pre>
        {`[ val, setVal ] = useLocalStorage(\n`}
        {`  'demo',\n`}
        {`  { a: 'Hello!' } \n`}
        {`); \n`}
        {`console.log(val.a) \n`}
        {`// => "Hello!" `}
      </pre>
      <h2>Demo</h2>
      <p>LocalStorage for key <mark>demo</mark>:</p>
      <pre>
        {JSON.stringify(val, 2)}
      </pre>
      <button onClick={() => setVal({ a: Math.random() })}>
        Set a random number
      </button>
      <h2>Raw Mode</h2>
      <p>If you don’t want this library to serialize/deserialize objects for you, pass a third parameter called <code>useRawValues</code> as <code>true</code>.</p>
      <h2>Prior Art</h2>
      <p>Very much a copy of how the package <code>use-hooks</code> implements <code>useLocalStorage.</code></p>
    </div>
  );
};

export default App;
