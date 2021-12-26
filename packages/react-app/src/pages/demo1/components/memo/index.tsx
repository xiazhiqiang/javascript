import React, { useState, useMemo } from "react";
import styles from "../../index.module.scss";

export const Normal = () => {
  const [count, setCount] = useState(1000);
  const [num, setNum] = useState(2000);

  const computeNum = (number) => {
    console.log("compute num");
    return number * 2;
  };

  const computeRet = computeNum(num);

  return (
    <div>
      <h3>不好的例子：（未使用useMemo）</h3>
      <p className={styles["tip"]}>点击Count，会触发更新计算</p>
      <button onClick={() => setCount(count + 1)}>Count+: {count}</button>
      <button onClick={() => setNum(num + 100)}>Compute: {computeRet}</button>
    </div>
  );
};

export const Optimize = () => {
  const [count, setCount] = useState(1000);
  const [num, setNum] = useState(2000);

  const computeNum = (number) => {
    console.log("compute num");
    return number * 2;
  };

  const computeRet = useMemo(() => computeNum(num), [num]);

  return (
    <div>
      <h3>好的例子：（使用useMemo）</h3>
      <p className={styles["tip"]}>
        点击Count，不更新计算，更新num才更新compute
      </p>
      <button onClick={() => setCount(count + 1)}>Count+: {count}</button>
      <button onClick={() => setNum(num + 100)}>Compute: {computeRet}</button>
    </div>
  );
};
