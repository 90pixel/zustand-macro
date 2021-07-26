<div align="center">
<h1>zustand.macro</h1>
<img alt="babel-macro" src="https://img.shields.io/badge/-babel--macro-blueviolet" />
<a href="https://www.npmjs.com/package/@90pixel/zustand.macro">
<img alt="npm" src="https://img.shields.io/npm/v/@90pixel/zustand.macro?label=%4090pixel%2Fzustand.macro" />
</a>
<a href="https://www.npmjs.com/package/@90pixel/zustand.macro">
<img alt="npm" src="https://img.shields.io/npm/dm/@90pixel/zustand.macro" />
</a>
<img alt="NPM" src="https://img.shields.io/npm/l/@90pixel/zustand.macro" />
</div>

## Getting Started

This package is designed to improve the **Developer Experience (DX)** when working with `zustand` to manage the state in React applications.

## Table of Contents

-   [The Problem](#the-problem)
    -   [What if we need more then one prop?](#what-if-we-need-more-than-one-prop)
-   [Solution](#solution)
-   [Installation](#installation)
    -   [Updating your babel config](#updating-your-babel-config)
    -   [Adding useShallowStore hook](#adding-useshallowstore-hook)
    -   [Configuration](#configuration)

<br />

## The Problem

Lets say we have a store like this;

```js
import create from "zustand";

const useStore = create((set) => ({
    count: 0,
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
}));
```

If we use this store like this;

```js
export default function CounterA() {
    const { count } = usestore();
    // ...
}
```

We will encounter re-rendering issues. The `<CounterA />` component will re-render when any of the properties changed in store.

We will need to use the store like this, to avoid re-rendering issues.

```js
export default function CounterA() {
    const count = useStore((state) => state.count);
    // ...
}
```

### What if we need more than one prop?

Now we need to use the store with shallow equality function.

```js
import shallow from "zustand/shallow";

export default function CounterA() {
    const { count, incrementCount, decrementCount } = useStore(
        (s) => ({
            count: s.count,
            incrementCount: s.incrementCount,
            decrementCount: s.decrementCount,
        }),
        shallow
    );
    // ...
}
```

We are repeating a lot.

## Solution

Using `babel-plugin-macros` we can turn this code into this below, at `compile-time`.

```js
import useStoreMacro from "@90pixel/zustand.macro";

const {
  count,
  decrementCount,
  incrementCount,
} = useStoreMacro();

      ↓ ↓ ↓ ↓ ↓ ↓

// You can replace this with your own hook. Look at the Configuration section to learn more about it.
import { useShallowStore as _useShallowStore } from "hooks";

const {
  count,
  decrementCount,
  incrementCount,
} = _useShallowStore((s) => ({
  count: s.count,
  decrementCount: s.decrementCount,
  incrementCount: s.incrementCount,
}));
```

## Installation

Installation of the dependencies.

```term
npm install --save-dev @90pixel/zustand.macro babel-plugin-macros
```

or using yarn

```term
yarn add -D @90pixel/zustand.macro babel-plugin-macros
```

### Updating Your Babel config

You must add the `babel-plugin-macros` plugin into your babel plugin list.

```js
{
  // ...
  "plugins": [
    // ...other plugins

    // This must be added
    "macros"
  ]
}
```

### Adding useShallowStore hook

Add this hook into your custom hooks.

```js
import shallow from "zustand/shallow";
// Your store..
import { useStore } from "store";

export default function useShallowStore(selector, equalityFn = shallow) {
    return useStore(selector, equalityFn);
}
```

### Configuration

By default when you import the macro, the import statement will be deleted at compile-time.

Shallow store implementation will be added instead.

```js
import useStoreMacro from "@90pixel/zustand.macro";
      ↓ ↓ ↓ ↓ ↓ ↓
import { useShallowStore as _useShallowStore } from "hooks";
```

As you can see, import name `(useShallowStore)` and the import source `(import .. from 'hooks')` is hard coded.

You can change these in your `package.json` file.

```json
{
  ...
  "babelMacros": {

    "zustandMacro": {
      "useStore": {
        "importName": "useShallowStore",
        "importSource": "hooks"
      }
    }
  }
}
```


**You are ready to go now.**
