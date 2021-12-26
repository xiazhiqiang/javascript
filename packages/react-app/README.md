# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

---

# 实践 Log

## 初始化

```shell
npx create-react-app react-app --template typescript
```

## 增加路由及页面支持

- 安装 react-router-dom
- 创建 pages 目录及页面
- 修改 App.tsx

## 修改构建

- 安装 react-app-rewired 依赖
- 修改 scripts，将 react-scripts 改为 react-app-rewired

```text
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
```

- 自定义构建，新建 plugins/webpack.js，在 package.json 中增加路径

```json
/* package.json */
{
  "config-overrides-path": "plugins/webpack" // 默认 config-overrides.js
}
```

- 定义 webpack 配置

```
module.exports = function override(config, env) {
  // 参数中的 config 就是默认的 webpack config

  // 对 config 进行任意修改
  config.mode = 'development';

  // 一定要把新的 config 返回
  return config;
}
```

## 增加 sass 及 css module 支持

- 安装依赖 sass

```shell
npm i sass -D
```

- 修改 css 命名及引用

```jsx
import styles from "./index.module.scss";
```
