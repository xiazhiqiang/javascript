# jsmodule-demo

本文通过 webpack@^5 构建理解 commonjs、ES6 模块的实现：

- commonjs/index.js 采用了commonjs写法的模块；
- es6/index.mjs 采用了es6写法的模块；
- dynamicImport/index.mjs 采用了es6动态加载模块写法；

>.mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，.js文件的加载取决于package.json里面type字段的设置。

## webpack 构建运行

***webpack 可以将 es6 语法和 commonjs 语法转换成浏览器环境能够执行的代码***

```bash
cnpm i webpack webpack-cli webpack-dev-server -D
```
webpack 配置：webpack.config.js

### __webpack_require__ 实现

```javascript
// modules define
var __webpack_modules__ = ({});

// The module cache
var __webpack_module_cache__ = {};

function __webpack_require__(moduleId) {
  // Check if module is in cache
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  // Create a new module (and put it into the cache)
  var module = __webpack_module_cache__[moduleId] = {
    // no module.id needed
    // no module.loaded needed
    exports: {}
  };

  // Execute the module function
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  // Return the exports of the module
  return module.exports;
}
```

### commonjs 模块定义

```javascript
var __webpack_modules__ = ({
  /** ./src/commonjs/counter.js */
  "./src/commonjs/counter.js": ((module) => {
    let num = 1;

    function increase() {
      return num++;
    }

    module.exports = { num, increase };
  })
});

var __webpack_exports__ = {};

(() => {
  /** ./src/commonjs/index.js */
  const { num, increase } = __webpack_require__("./src/commonjs/counter.js");
  console.log(num);
  increase();
  console.log(num);
})();

```

### es6 __webpack_require__ 额外定义

```javascript
/* webpack/runtime/define property getters */
(() => {
	// define getter functions for harmony exports
	__webpack_require__.d = (exports, definition) => {
		for(var key in definition) {
			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
			}
		}
	};
})();

/* webpack/runtime/hasOwnProperty shorthand */
(() => {
	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();

/* webpack/runtime/make namespace object */
(() => {
	// define __esModule on exports
	__webpack_require__.r = (exports) => {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};
})();
```

### es6 模块定义

通过 Object.defineProperty 方法定义模块导出的内容，详见 __webpack_require__.d 方法

```javascript
var __webpack_modules = ({
  /** ./src/es6/counter.mjs */
  "./src/es6/counter.mjs": ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      "increase": () => (increase),
      "num": () => (num)
    });
    let num = 1;

    function increase() {
      return num++;
    }
  })
});

var __webpack_exports__ = {};

(() => {
  /** ./src/es6/index.mjs */
  __webpack_require__.r(__webpack_exports__);
  var _counter_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/es6/counter.mjs");

  console.log(_counter_mjs__WEBPACK_IMPORTED_MODULE_0__.num);
  (0,_counter_mjs__WEBPACK_IMPORTED_MODULE_0__.increase)();
  console.log(_counter_mjs__WEBPACK_IMPORTED_MODULE_0__.num);

})();
```

## 结论

- commonjs模块对于基础类型导出的是值的拷贝，对于复杂类型导出的仍然是值的引用，详见commonjs/counter2.js；
- es6模块导出的是值的引用，包括基础类型和复杂类型；

## babel-node 构建运行

***babel-node 是将 es6 语法转换为 commonjs 语法，能够在 nodejs 环境中运行***

```bash
cnpm i @babel/core @babel/node -D
npx babel-node ./src/commonjs/index.cjs
npx babel-node ./src/es6/index.mjs
npx babel-node ./src/dynamicImport/index.mjs
```

## webpack 动态模块加载

【TODO】

## 参考

- [webpack5](https://webpack.js.org/guides/getting-started/)
- [利用 webpack 理解 CommonJS 和 ES Modules 的差异](https://www.baobangdong.cn/use-webpack-to-understand-the-difference-between-commonjs-and-esmodules/)
- [webpack模块化实现及动态模块加载原理](https://segmentfault.com/a/1190000022191241)
- [JS模块化](https://ost.51cto.com/posts/4489)
- [commonjs原理 & requirejs原理 & webpack简易版实现](https://codeleading.com/article/7094420186/)
  