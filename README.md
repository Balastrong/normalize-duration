# normalize-duration

Normalize a duration in different time units then chose your favourite format.

```ts
normalizeDuration({ milliseconds: 3500 });
// return { milliseconds: 500, seconds: 3 }

normalizeDuration({ seconds: 5541 });
// return { seconds: 21, minutes: 32, hours: 1 }
```

## Table of contents

- [Installation](#installation)
  - [Node](#node)
  - [Deno](#deno)
- [Usage](#usage)
  - [Optional Parameters](#optional-parameters)

## Installation

### Node

```sh
# If you use npm
npm install normalize-duration

# If you use yarn
yarn add normalize-duration
```

### Deno

Coming soon on [deno.land/x](https://deno.land/x)!

## Usage

The first parameter is a `Duration` object in the following format:

```ts
export type Duration = {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};
```

You can fill as many fields as you want and pass it to normalizeDuration which will return a `Duration` object with the normalized values.

```ts
normalizeDuration({ years: 1, months: 20, days: 3 });
// return { years: 2, months: 8, days: 3 }
```

### Optional Parameters

You can get extra customization with some optional parameters:

```ts
export type Options = {
  customUnits?: Array<keyof Duration>;
  stripZeroes?: boolean;
};
```

    - `customUnits`: An array of custom units to use.
    - `stripZeroes`: If true, will strip zeroes from the output.
