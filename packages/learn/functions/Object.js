function objAssign(target) {
  const to = Object(target);
  for (let i = 1; i < arguments.length; i++) {
    const tmp = arguments[i];
    for (let key in tmp) {
      if (hasOwnProperty.call(tmp, key)) {
        to[key] = tmp[key];
      }
    }
  }

  return to;
}

(function () {
  // assign 测试
  // const obj = Object.assign({}, {a: 1});
  const obj = objAssign();
  console.log("obj", obj);
})();
