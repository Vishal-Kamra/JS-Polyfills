// Custom Promise
function MyPromise(executor) {
  let state = "pending"; // 'fulfilled' or 'rejected'
  let value;
  let onFulfilledCallbacks = [];
  let onRejectedCallbacks = [];

  function resolve(val) {
    if (state !== "pending") return;
    queueMicrotask(() => {
      state = "fulfilled";
      value = val;
      onFulfilledCallbacks.forEach((cb) => cb(value));
    });
  }

  function reject(err) {
    if (state !== "pending") return;
    queueMicrotask(() => {
      state = "rejected";
      value = err;
      onRejectedCallbacks.forEach((cb) => cb(value));
    });
  }

  this.then = function (onFulfilled, onRejected) {
    return new MyPromise((resolveNext, rejectNext) => {
      function handleFulfilled(val) {
        try {
          if (typeof onFulfilled === "function") {
            const result = onFulfilled(val);
            result instanceof MyPromise
              ? result.then(resolveNext, rejectNext)
              : resolveNext(result);
          } else {
            resolveNext(val);
          }
        } catch (e) {
          rejectNext(e);
        }
      }

      function handleRejected(err) {
        try {
          if (typeof onRejected === "function") {
            const result = onRejected(err);
            result instanceof MyPromise
              ? result.then(resolveNext, rejectNext)
              : resolveNext(result);
          } else {
            rejectNext(err);
          }
        } catch (e) {
          rejectNext(e);
        }
      }

      if (state === "fulfilled") {
        queueMicrotask(() => handleFulfilled(value));
      } else if (state === "rejected") {
        queueMicrotask(() => handleRejected(value));
      } else {
        onFulfilledCallbacks.push(handleFulfilled);
        onRejectedCallbacks.push(handleRejected);
      }
    });
  };

  this.catch = function (onRejected) {
    return this.then(null, onRejected);
  };

  this.finally = function (callback) {
    return this.then(
      (val) => MyPromise.resolve(callback()).then(() => val),
      (err) =>
        MyPromise.resolve(callback()).then(() => {
          throw err;
        })
    );
  };

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// Static methods
MyPromise.resolve = function (val) {
  return new MyPromise((resolve) => resolve(val));
};

MyPromise.reject = function (err) {
  return new MyPromise((_, reject) => reject(err));
};

// Custom promise.all
Promise.customAll = function (promises) {
  if (!Array.isArray(promises))
    throw new Error("customAll only accepts array of promises");

  return new Promise(async (resolve, reject) => {
    const output = [];
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((res) => {
          output[i] = res;
          if (output.length === promises.length) resolve(output);
        })
        .catch(reject);
    }
  });
};

Promise.customRace = function (promises) {
  if (!Array.isArray(promises))
    throw new Error("customAll only accepts array of promises");

  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(resolve).catch(reject);
    }
  });
};

const customPromise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

const customPromise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 1000);
});

const customPromise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});

async function PromiseAll() {
  const res = await Promise.customAll([
    customPromise1,
    customPromise2,
    customPromise3,
  ]);
  console.log("promise all", res);
}

async function PromiseRace() {
  const res = await Promise.customRace([
    customPromise1,
    customPromise2,
    customPromise3,
  ]);
  console.log("promise race", res);
}

async function testMyPromise() {
  const myPromise = await new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 3000);
  });
  console.log("my promise", myPromise);
}

testMyPromise();
PromiseAll();
PromiseRace();
