import React, { useEffect } from "react";
import * as Memo from "./components/memo";
import * as Callback from "./components/callback";
import styles from "./index.module.scss";

export default function Demo1() {
  useEffect(() => {
    document.title = "useMemo和useCallback用法";
    console.clear();
  }, []);

  return (
    <>
      <h2>useMemo优化</h2>
      <div className={styles["flex-container"]}>
        <Memo.Normal />
        <Memo.Optimize />
      </div>
      <h2>useCallback优化</h2>
      <div className={styles["flex-container"]}>
        <Callback.Normal />
        <Callback.Optimize />
      </div>
    </>
  );
}
