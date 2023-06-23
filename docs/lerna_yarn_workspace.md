# lerna + yarn + workspace 实践

## 初始化 lerna 项目

```shell
npx lerna init
```

## 添加子工程

```shell
npx lerna create <子工程name> [目录名，默认workspaces第一个配置]
```

## 配置

- package.json

```json
{
  "private": true,
  "workspaces": ["packages/*", "examples/*"],
  "scripts": {
    "bootstrap": "yarn install --ignore-engines", // 等价于 lerna bootstrap --hoist --npm-client yarn --use-workspaces
    "clean": "lerna clean && rm -rf node_modules package-lock.json yarn.lock **/package-lock.json **/yarn.lock", // lerna clean 会清除子工程 node_modules
    "build": "lerna run build --stream --sort" // lerna --sort参数可以控制以拓扑排序规则执行构建
  }
}
```

- lerna.json

```json
{
  "lerna": "6.6.2",
  "packages": ["packages/*", "examples/*"],
  "version": "0.1.0",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

## 安装依赖

- 初始化整个依赖，含根目录及子工程

```shell
npm run bootstrap
```

- 为每个 package 添加依赖

```shell
# dependencies
yarn workspaces add react react-dom --ignore-engines
# devDependencies
yarn workspaces add react react-dom -D--ignore-engines
```

- 为指定包添加依赖

```shell
yarn workspace package1 add react react-dom --ignore-engines
yarn workspace package1 add react react-dom -D --ignore-engines
```

- 添加依赖到根目录

```shell
cd 根目录
yarn add [依赖包] -W --ignore-engines
yarn add [依赖包] -W -D --ignore-engines
```

- 手动建立 package 之间的关系

```shell
yarn workspace package1 add package2 --ignore-engines
yarn workspace package1 add package2 -D --ignore-engines
```

> 注意，当 package2 没有发布在 npmjs 上时，此时会报错：package2 not found；解决办法：显示指定 package2 的版本： yarn workspace package1 add package2@^1.0.0

## 查看包之间的关系

```shell
yarn workspaces info
```

## 执行命令

- 所有包构建

```shell
npm run build
```

- 执行指定包中的 scripts 命令

```shell
cd 根目录

# 遍历每个包执行command
yarn workspaces run <command>

# 指定包执行command
yarn workspace package1 run <command>
```

## 参考

- https://juejin.cn/post/7097820725301477406
- https://juejin.cn/post/6844903918279852046
- https://juejin.cn/post/6927472790438150152
- https://juejin.cn/post/7011024137707585544
