// Polyfills for Array methods

// Custom Map
Array.prototype.customMap = function (callback, thisArg) {
  if (!this) throw new Error("customMap should be called on an array");
  if (typeof callback !== "function")
    throw new Error("customMap should be called with a function");

  const output = [];
  for (let i = 0; i < this.length; i++) {
    output.push(callback.call(thisArg, this[i], i, this));
  }

  return output;
};

console.log([1, , 3, 4].customMap((x) => x + 1));

// Custom Filter
Array.prototype.customFilter = function (callback, thisArg) {
  if (!this) throw new Error("customFilter should be called on an array");
  if (typeof callback !== "function")
    throw new Error("customFilter should be called with a function");

  const output = [];
  let temp = false;
  for (let i = 0; i < this.length; i++) {
    temp = callback.call(thisArg, this[i], i, this);
    if (!!temp) {
      output.push(this[i]);
    }
  }
  return output;
};

console.log([1, 2, 3, 4, 5, 6, 7].customFilter((x) => x % 2 === 0));

// Custom Reduce
Array.prototype.customReduce = function (callback, initialVal) {
  if (!this) throw new Error("customReduce should be called on an array");
  if (typeof callback !== "function")
    throw new Error("customReduce should be called with a function");

  let accumulator = initialVal || this?.[0];
  for (let i = initialVal ? 0 : 1; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};

console.log([1, 2, 3, 4, 5].customReduce((accum, val) => accum + val, 2));

// Custom forEach
Array.prototype.customForEach = function (callback, thisArg) {
  if (!this) throw new Error("customForEach should be called on an array");
  if (typeof callback !== "function")
    throw new Error("customForEach should be called with a function");

  for (let i = 0; i < this.length; i++) {
    callback.call(thisArg, this[i], i, this);
  }
  return undefined;
};

["a", "b", "c", "d", "e"].customForEach((x, i) => console.log(i, x));

// Custom Includes
Array.prototype.customIncludes = function (val, fromIndex = 0) {
  if (!this) throw new Error("customIncludes should be called on an array");

  for (let i = fromIndex; i < this.length; i++) {
    if (this[i] === val) {
      return true;
    }
  }
  return false;
};

console.log([1, 2, 3, 4, 5, 6].customIncludes(9));

// Custom Some
Array.prototype.customSome = function (callback, thisArg) {
  if (!this) throw new Error("customSome should be called on an array");

  for (let i = 0; i < this.length; i++) {
    if (!!callback.call(thisArg, this[i], i, this)) {
      return true;
    }
  }
  return false;
};

console.log([1, 2, 3, 4].customSome((x) => x > 2, [0, 1]));

// Custom Find
Array.prototype.customFind = function (callback, thisArg) {
  if (!this) throw new Error("customFind should be called on an array");

  for (let i = 0; i < this.length; i++) {
    if (!!callback.call(thisArg, this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

console.log([1, 2, 3, 4].customFind((x) => x > 2));

// Custom Every
Array.prototype.customEvery = function (callback, thisArg) {
  if (!this) throw new Error("customEvery should be called on an array");

  for (let i = 0; i < this.length; i++) {
    if (!callback.call(thisArg, this[i], i, this)) {
      return false;
    }
  }
  return true;
};

console.log([1, 2, 3, 4].customEvery((x) => x > 0));

// Custom isArray
Array.customIsArray = function (arg) {
  if (!arg) throw new Error("customIsArray should be called with an argument");

  return Object.prototype.toString.call(arg) === "[object Array]";
};

console.log(Array.customIsArray('1'));
