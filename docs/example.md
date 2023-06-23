# 多个包相互依赖开发

examples 目录为多模块相互依赖 Demo

## 添加相互依赖

为 module1 添加依赖 module2

```shell
cd 根目录
yarn workspace module1 add module2
```

## 多模块构建

- 因为 module1 依赖 module2，所以需要对 module2 做构建；
- 若 module1 依赖多个模块，分别构建依赖的模块比较麻烦，可以直接通过 lerna build 进行，如下：

```shell
cd 根目录
npm run build
```

## 模块测试

```shell
cd 根目录
yarn workspace module1 run test
```

## 依赖模块 alias

往往在开发节点，通过 webpack 等构建工具引用其他模块时，会遇到 `can't find xxx module` 的错误，可通过配置 alias。

```javascript
// webpack-chain
webpack..resolve.alias.set('module2', path.join(__dirname, '../module2/dist'));
```
