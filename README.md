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

## Documentation

For now, check out [the source](/src/).
