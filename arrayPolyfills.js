Array.prototype.CustomMap = function (callback) {
  let output = [];
  for (let i = 0; i < this.length; i++) {
    output.push(callback(this[i], i));
  }

  return output;
};

Array.prototype.CustomFilter = function (callback) {
  let output = [];
  let temp = false;
  for (let i = 0; i < this.length; i++) {
    temp = callback(this[i], i);
    if (!!temp) {
      output.push(this[i]);
    }
  }
  return output;
};

Array.prototype.CustomReduce = function (callback, initialVal = 0) {
  let temp = initialVal;
  for (let i = 0; i < this.length; i++) {
    temp = callback(temp, this[i], i);
  }
  return temp;
};

Array.prototype.CustomForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i);
  }
  return undefined;
};

Array.prototype.CustomIncludes = function (val) {
  let output = false;
  for (let i = 0; i < this.length; i++) {
    if (this[i] === val) {
      output = true;
      break;
    }
  }
  return output;
};

Array.prototype.CustomSome = function (callback, thisArg) {
  let output = false;
  for (let i = 0; i < (thisArg || this).length; i++) {
    if (!!callback((thisArg || this)[i])) {
      output = true;
      break;
    }
  }
  return output;
};

Array.prototype.CustomFind = function (callback) {
  let output = undefined;
  for (let i = 0; i < this.length; i++) {
    if (!!callback(this[i])) {
      output = this[i];
      break;
    }
  }
  return output;
};

Array.prototype.CustomEvery = function (callback, thisArg) {
  const givenArray = thisArg || this;
  for (let i = 0; i < givenArray.length; i++) {
    if (!callback(givenArray[i], i, givenArray)) {
      return false;
    }
  }
  return true;
};

Array.prototype.CustomIsArray = function () {
  if (typeof this === "object" && this?.length >= 0) {
    return true;
  }

  return false;
};

console.log([1, 2, 3, 4].CustomMap((x) => x + 1));
console.log([1, 2, 3, 4, 5, 6, 7].CustomFilter((x) => x % 2 === 0));
console.log([1, 2, 3, 4, 5].CustomReduce((accum, val) => accum + val, 2));
["a", "b", "c", "d", "e"].CustomForEach((x, i) => console.log(i, x));
console.log([1, 2, 3, 4, 5, 6].CustomIncludes(9));
console.log([1, 2, 3, 4].CustomSome((x) => x > 2, [0, 1]));
console.log([1, 2, 3, 4].CustomFind((x) => x > 2));
console.log([1, 2, 3, 4].CustomEvery((x) => x > 0));
console.log([].CustomIsArray());
