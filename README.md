Unexceptional
=============

[![npm version](https://badge.fury.io/js/unexceptional.svg)](https://badge.fury.io/js/unexceptional)

Exception safe functions and promises by converting thrown errors to values (like Go and Lua). See [this gist](https://gist.github.com/eiriklv/1fb4af8a268b394ddce5b8e4623bc546) for background.

__NOTE:__ This meant initially developed for usage together with `async/await` and `function*/yield`, so all results are converted to promises (see the source in `index.js` for more info).

## Usage examples

Safe(r) functions:

```js
const { safeFunction } = require('unexceptional');

function iThrowThingsSometimes(val, shouldThrow) {
  if (shouldThrow) {
    throw new Error('Something went wrong');
  } else {
    return val;
  }
}

const iDontThrowAnyMore = safeFunction(iThrowThingsSometimes);

async function main() {
  const [error, result] = await iDontThrowAnyMore(50);
  // error === undefined
  // result === 50

  if (error) {
    // handle error as a value or ignore
  }

  const [error2, result2] = await iDontThrowAnyMore(50, true);
  // error2 === Error('Something went wrong');
  // result2 === undefined

  if (error2) {
    // handle error as a value or ignore
  }
}

main();
```

Safe(r) promises:

```js
const { safePromise } = require('unexceptional');

function iRejectSometimes(val, shouldReject) {
  return new Promise(function(resolve, reject) {
    if (shouldReject) {
      reject(new Error('Something went wrong'));
    } else {
      resolve(val);
    }
  });
}

async function main() {
  const [error, result] = await safePromise(iRejectSometimes(50));
  // error === undefined
  // result === 50

  if (error) {
    // handle error as a value or ignore
  }

  const [error2, result2] = await safePromise(iRejectSometimes(50, true));
  // error2 === Error('Something went wrong');
  // result2 === undefined

  if (error2) {
    // handle error as a value or ignore
  }
}
```
