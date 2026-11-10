# @homebound/activesupport

This package provides prototype extensions, similar to the Ruby
[ActiveSupport](https://guides.rubyonrails.org/active_support_core_extensions.html) project.

## Installation

```bash
npm install --save @homebound/activesupport
```

```bash
yarn add @homebound/activesupport
```

## Usage

There are two ways to use this package: install the prototype extensions globally, or import the helpers as plain
functions. You can also mix the two.

### Global imports (install prototype extensions)

Import a `/global` subpath purely for its side effects. Everything exported from the matching impl module is installed
onto `Array.prototype` (etc.) and becomes available everywhere in your app.

```typescript
// Install everything at once (arrays, maps, objects, and temporal types):
import "@homebound/activesupport/global";

[1, null, 2].compact(); // [1, 2]
[1, 2, 3].sum(); // 6
```

You can also install just a slice to keep the prototype surface small:

```typescript
import "@homebound/activesupport/array/global";
import "@homebound/activesupport/map/global";
import "@homebound/activesupport/temporal/plainDate/global";
```

Global imports are side-effectful, so do them once at your app's entry point (e.g. `src/index.ts` or a `setupTests.ts`).

### Direct imports (no prototype pollution)

If you'd rather not touch the global prototypes, import the helpers as plain functions from the unsuffixed subpath:

```typescript
import { compact, sum, groupBy } from "@homebound/activesupport/array";
import { getOrCreate } from "@homebound/activesupport/map";
import { addBusinessDays } from "@homebound/activesupport/temporal/plainDate";

compact([1, null, 2]); // [1, 2]
sum([1, 2, 3]); // 6
```

These subpaths are pure — importing them has no side effects and tree-shakes normally, so you only ship what you use.

### Mixing the two

It's fine to install some globals and import others as functions. For example, install the array extensions globally for
ergonomic chaining, but keep temporal helpers as explicit function calls:

```typescript
import "@homebound/activesupport/array/global";
import { addBusinessDays } from "@homebound/activesupport/temporal/plainDate";

const dueDates = records.compact().map((r) => addBusinessDays(r.start, 5));
```

### Chaining async array helpers

`asyncMap`, `asyncFilter` and `asyncFlatMap` return an `ArrayPromise<T>`, a `Promise<T[]>` that also has the built-in
array methods and this library's array helpers. You can keep chaining without awaiting each step:

```typescript
import "@homebound/activesupport/array/global";

await userIds
  .asyncMap((id) => loadUser(id))
  .compact()
  .asyncFilter((user) => isActive(user))
  .sortByKey("name")
  .forEach((user) => console.log(user.name));
```

- Methods that return an array (`map`, `compact`, `asyncFilter`, `sortBy`, ...) return another `ArrayPromise`, so the
  chain continues. Methods that return anything else (`sum`, `groupBy`, `first`, `forEach`, ...) return a plain
  `Promise`.
- Method names keep their usual meaning: `.map(fn)` behaves like `Array#map`, so an async `fn` gives you an array of
  promises. Use `.asyncMap(fn)` to await each callback.
- Each step waits for the whole previous step to finish (like `Promise.all`). Elements aren't streamed through the chain
  one at a time.
- Helpers that mutate their array (`remove`, `removeAll`, `findAndRemove`) aren't available on `ArrayPromise`.
- `ArrayPromise.from(arrayOrPromise)` wraps any array or promise of an array. It's exported from
  `@homebound/activesupport/array`, and `asyncMap` etc. return it from the plain-function API too.

## Documentation

For now, check out [the source](/src/).
