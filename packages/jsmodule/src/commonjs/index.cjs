const { num, increase } = require("./counter.cjs");
console.log(num);
increase();
console.log(num);

const { obj, increase: increase2, getNum } = require("./counter2.cjs");
console.log(obj.num);
increase2();
console.log(obj.num, getNum());
