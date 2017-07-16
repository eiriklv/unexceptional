const test = require('tape');

const { safeFunction, safePromise } = require('./index');

function iThrowThingsSometimes(val, shouldThrow) {
  if (shouldThrow) {
    throw new Error('Something went wrong');
  } else {
    return val;
  }
}

function iRejectSometimes(val, shouldReject) {
  return new Promise(function(resolve, reject) {
    if (shouldReject) {
      reject(new Error('Something went wrong'));
    } else {
      resolve(val);
    }
  });
}

test('safeFunction - should return result as part of a tuple', async function(t) {
  t.plan(2);

  const [error, result] = await safeFunction(iThrowThingsSometimes)(50);

  t.equal(error, undefined);
  t.equal(result, 50);
});

test('safeFunction - should return error as part of a tuple', async function(t) {
  t.plan(2);

  const [error, result] = await safeFunction(iThrowThingsSometimes)(50, true);

  t.equal(error.message, 'Something went wrong');
  t.equal(result, undefined);
});

test('safePromise - should return result as part of a tuple', async function(t) {
  t.plan(2);

  const [error, result] = await safePromise(iRejectSometimes(50));

  t.equal(error, undefined);
  t.equal(result, 50);
});

test('safePromise - should return error as part of a tuple', async function(t) {
  t.plan(2);

  const [error, result] = await safePromise(iRejectSometimes(50, true));

  t.equal(error.message, 'Something went wrong');
  t.equal(result, undefined);
});
