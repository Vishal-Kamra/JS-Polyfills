// Custom bind
Function.prototype.customBind = function (obj) {
  obj.fnToCall = this;
  return function (...args) {
    return obj.fnToCall(...args);
  };
};

function fn() {
  return this;
}

console.log(fn());
console.log(fn.customBind({ a: 1 })());

// Custom call
Function.prototype.customCall = function (obj, ...args) {
  obj.fnToCall = this;
  return obj.fnToCall(...args);
};

console.log(fn.customCall({ a: 1 }));

// Custom apply
Function.prototype.customApply = function (obj, args) {
  obj.fnToCall = this;
  return obj.fnToCall(...args);
};

console.log(fn.customApply({ a: 1 }, [1, 2, 3]));
