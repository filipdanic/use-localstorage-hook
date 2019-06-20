[![NPM](https://img.shields.io/npm/v/use-localstorage-hook.svg)](https://www.npmjs.com/package/use-localstorage-hook)
# use-localstorage-hook

A custom React hook that lets you sync with `localStorage` and helps you manipulate objects via built-in `JSON.stringify` helpers.

[👉 Demo site and docs.](https://filipdanic.github.io/use-localstorage-hook/)

## Quick Start

Start with:
```
npm install --save use-localstorage-hook
```

And in your component use the hook like this:
```
[ val, setVal ] = useLocalStorage(
  'demo',
  { a: 'Hello!' }
);
console.log(val.a)
// => "Hello!"
```

## Docs

The complete documentation as well as a live demo [is available here.](https://filipdanic.github.io/use-localstorage-hook/)

## License

MIT © [filipdanic](https://github.com/filipdanic)
