// Custom Assign
Object.customAssign = function (target, ...sourceArgs) {
  if (target == null)
    throw new TypeError("Cannot convert undefined or null to object");
  const output = target;
  for (let i = 0; i < sourceArgs.length; i++) {
    for (let k in sourceArgs[i]) {
      if (Object.prototype.hasOwnProperty.call(sourceArgs[i], k)) {
        output[k] = sourceArgs[i][k];
      }
    }
  }
  return output;
};

const target = { a: 1, b: 2 };
const returnedTarget = Object.customAssign(
  target,
  { b: 4, c: 3 },
  { d: 5, e: 6 }
);

console.log(returnedTarget);

// Custom Entries
Object.customEnteries = function (obj) {
  if (!Object(obj))
    throw new TypeError("Cannot convert undefined or null to object");

  let output = [];
  for (const k in obj) {
    output.push([k, obj[k]]);
  }
  return output;
};

console.log(Object.customEnteries({ a: 1, b: 2 }));

// Custom fromEnteries
Object.prototype.customFromEnteries = function (arr) {
  if (!Array.isArray(arr))
    throw new Error("customFromEnteries should be called with an array");

  const output = {};
  for (let i = 0; i < arr.length; i++) {
    output[arr[i][0]] = arr[i][1];
  }
  return output;
};

console.log(
  Object.customFromEnteries([
    [1, 2],
    [3, 4],
  ])
);

// Custom Values
Object.customValues = function (obj) {
  if (!Object(obj))
    throw new Error("customValues should be called with an object");

  let output = [];
  for (const k in obj) {
    output.push(obj[k]);
  }
  return output;
};

console.log(Object.customValues({ a: 1, b: 2, c: 3, d: 4 }));
