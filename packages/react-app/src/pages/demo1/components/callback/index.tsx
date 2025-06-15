import React, { useState, useCallback } from "react";
import styles from "../../index.module.scss";

const PureComp = React.memo(({ handleClick }: any) => {
  console.log("PureComponent rending");
  return (
    <p>
      <button onClick={handleClick}>PureComponent</button>
    </p>
  );
});

export const Normal = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("handleClick");
  };

  const handleParentClick = () => {
    console.log("handleParentClick");
    setCount(count + 1);
  };

  return (
    <div>
      <h3>不好的例子：（未使用useCallback）</h3>
      <p className={styles["tip"]}>点击Parent，会触发 PureComponent 重新渲染</p>
      <button onClick={handleParentClick}>点击Parent</button>
      <PureComp handleClick={handleClick} />
    </div>
  );
};

export const Optimize = () => {
  const [count, setCount] = useState(0);

  const handleParentClick = () => {
    console.log("handleParentClick");
    setCount(count + 1);
  };

  const _handleClick = () => {
    console.log("handleClick");
  };

  const handleClick = useCallback(() => {
    _handleClick();
  }, []);

  return (
    <div>
      <h3>好的例子：（使用useCallback）</h3>
      <p className={styles["tip"]}>
        点击Parent，不会触发 PureComponent 重新渲染
      </p>
      <button onClick={handleParentClick}>点击Parent</button>
      <PureComp handleClick={handleClick} />
    </div>
  );
};
