Object.prototype.CustomAssign = function (target, ...sourceArgs) {
  let output = target;
  for (let i = 0; i < sourceArgs.length; i++) {
    for (let k in sourceArgs[i]) {
      output[k] = sourceArgs[i][k];
    }
  }
  return output;
};

const target = { a: 1, b: 2 };
const returnedTarget = Object.CustomAssign(
  target,
  { b: 4, c: 3 },
  { d: 5, e: 6 }
);

console.log(returnedTarget);
console.log(returnedTarget === target);

Object.prototype.CustomEnteries = function (obj) {
  let output = [];
  const keys = Object.keys(obj);
  let temp = undefined;
  for (let i = 0; i < keys.length; i++) {
    temp = keys[i];
    output.push([temp, obj[temp]]);
  }
  return output;
};

console.log(Object.CustomEnteries({ a: 1, b: 2 }));

Object.prototype.CustomFromEnteries = function (arr) {
  let output = {};
  for (let i = 0; i < arr.length; i++) {
    output[arr[i][0]] = arr[i][1];
  }
  return output;
};

console.log(
  Object.CustomFromEnteries([
    [1, 2],
    [3, 4],
  ])
);

Object.prototype.CustomValues = function (obj) {
  let output = [];
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    output.push(obj[keys[i]]);
  }
  return output;
};

console.log(Object.CustomValues({ a: 1, b: 2, c: 3, d: 4 }));
