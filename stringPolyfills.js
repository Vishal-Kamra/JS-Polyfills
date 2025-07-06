// Custom Includes
String.prototype.customIncludes = function (search, start = 0) {
  if (!search || typeof search !== "string" || this.length < search.length)
    throw new Error("customIncludes expect a valid string to search");

  for (let i = start; i <= this.length - search.length; i++) {
    let match = true;
    for (let j = 0; j < search.length; j++) {
      if (this[i + j] !== search[j]) {
        match = false;
        break;
      }
    }
    if (match) return true;
  }
  return match;
};

console.log("abc".customIncludes("bc"));

// Custom Trim
String.prototype.customTrim = function () {
  let newString = "";
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== " ") newString += this[i];
  }
  return newString;
};

console.log("  abc   ".customTrim());

// Custom Repeat
String.prototype.customRepeat = function (count) {
  if (count < 0 || !Number.isFinite(count))
    throw new Error("customRepeat expects a valid count input");

  let newStr = "";
  for (let i = 0; i < Math.floor(count); i++) {
    newStr += this;
  }

  return newStr;
};

console.log("abc".customRepeat(3));

// Custom padStart
String.prototype.customPadStart = function (targetLength, padString) {
  const length = Number.isFinite(targetLength) ? Math.floor(targetLength) : -1;
  if (length < 0)
    throw new Error("customPadStart expects a valid target length");
  if (typeof padString !== "string")
    throw new Error("please pass a valid padding string");

  if (this.length > length || padString.length === 0) {
    return this;
  }

  let newStr = "";
  for (let i = 0; i < length; i++) {
    newStr += padString ? padString : "";
  }

  return newStr + this;
};

console.log("abc".customPadStart(3, "v"));

// Custom padEnd
String.prototype.customPadEnd = function (targetLength, padString) {
  const length = Number.isFinite(targetLength) ? Math.floor(targetLength) : -1;
  if (length < 0)
    throw new Error("customPadStart expects a valid target length");
  if (typeof padString !== "string")
    throw new Error("please pass a valid padding string");

  if (this.length > length || padString.length === 0) {
    return this;
  }

  let newStr = "";
  for (let i = 0; i < length; i++) {
    newStr += padString ? padString : "";
  }

  return this + newStr;
};

console.log("abc".customPadEnd(3, "v"));
