let num = 1;
let obj = { num };

function increase() {
  num++;
  obj.num = num;
  return num;
}

function getNum() {
  return num;
}

module.exports = { num, obj, increase, getNum };
