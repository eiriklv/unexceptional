/**
 * Wrap an "unsafe" promise
 */
var safePromise = module.exports.safePromise = function safePromise(promise) {
  return promise
  .then(function(result) {
    return [undefined, result];
  })
  .catch(function(error) {
    return [error, undefined];
  });
}

/**
 * Wrap an "unsafe" function that might throw
 * upon execution in a function that returns
 * a promise (which is handled "safely" with safePromise)
 *
 * NOTE: This will only handle throws that
 * are done within the same execution tick,
 * and not errors that are thrown "later"
 * within the same context (no way to do that..)
 */
var safeFunction = module.exports.safeFunction = function safeFunction(fn) {
  return function() {
    var error = undefined;
    var result = undefined;

    try {
      result = fn.apply(this, arguments);
    } catch (e) {
      error = e;
    }

    return safePromise(error ? Promise.reject(error) : Promise.resolve(result));
  }
}
