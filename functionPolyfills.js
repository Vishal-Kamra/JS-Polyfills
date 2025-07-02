Function.prototype.CustomBind = function (obj) {
  obj.fnToCall = this;
  return function (...args) {
    return obj.fnToCall(...args);
  };
};

function fn() {
  return this;
}

console.log(fn.CustomBind({ a: 1 })());
