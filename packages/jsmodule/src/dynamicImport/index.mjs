import("./counter.mjs")
  .then((res) => {
    const { increase, num } = res;
    console.log(num);
    increase();
    console.log(num);
  })
  .catch((err) => {
    console.error(err);
  });
