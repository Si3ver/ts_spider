# typescript

**ts 优势**

1. 开发过程中编辑器能更好的提示错误
2. 编写代码中更好的自动提示
3. 语义更清晰易懂，可读性更好

## 基础语法

### 1. 基本概念

- **基本类型**: void、undefined、null、number、boolean、string、symbol
- **对象类型**: {}、`[]`、class、function、Date...
- **类型注解 type annotation**: 开发人员主动告诉程序，变量的类型
- **类型推断 type inference**: 程序自己推断变量的类型
- **类型别名 type alias**: type, 优先用 interface

## 2. 函数类型

```ts
// never 函数永远不能执行到最后
function errEmitter(): never {
  while (true) {
    xxx;
  }
}
```

## 3. 数组、元祖

```ts
// tuple 能更准确地约束数组类型
const teacherInfo: [string, string, number] = ["alwyn", "male", 25];
// csv
const teacherList: [string, string, number][] = [
  ["alwyn", "male", 25],
  ["bob", "male", 31],
  ["candy", "female", 23],
];
```

## 4. interface

```ts
interface Person {
  name: string;
  age?: number;
}
```

- 接口继承 extends
- 类实现接口 implements (接口约束类)

## 5. 类、继承、访问类型、构造器、getter、setter

- 子类通过调用 super 方法，调用父类的方法。
- 类 private、public、protected、get、set、static(实现单例) 支持
- 类的构造器 constructor 会自动执行

```ts
class Person {
  // 传统写法
  // public name: string;
  // constructor(name: string) {
  //   this.name = name;
  // }
  // 简化写法
  constructor(public name: string) {}
}

class Teacher extends Person {
  constructor(public age: number) {
    super("alwyn");
  }
}

const p = new Teacher(29);
console.log(p); // Teacher { name: 'alwyn', age: 29 }
```

## 6. 抽象类

- 抽象类只能被继承，不能被直接使用
- 子类继承抽象类后，抽象类有抽象方法的话子类必须实现具体的方法

```ts
abstract class Geom {
  width: number;
  getType() {
    return "Geom";
  }
  abstract getArea(): number;
}

class Circle extends Geom {
  getArea() {
    return 123;
  }
}
```

## tsconfig

- [tsconfig.js doc](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- include / exclude
- compilerOptions
  - removeComments 移除注释
  - noImplicitAny 不允许隐式的 any
  - strictNullChecks 严格检查 null
  - outDir 输出的 js 文件目录 / rootDir ts 文件根目录
  - outFile 打包成单个 js 文件 （需要 amd 规范）
  - incremental 增量编译
  - allowJS js 文件也编译
  - checkJs 语法检查 js
  - noUnusedLocals/noUnusedParameters 未使用的变量/参数

## 类型定义文件 xxx.d.ts

## 联合类型 & 类型保护

- 联合类型 |
- 通过类型保护的方式解决联合类型的语法检查报错
  - as、 in、 typeof、 instanceof 做类型保护

## 枚举类型 Enum

- 默认从 0 开始
- 方便反查

```ts
enum Status {
  OFFLINE,
  ONLINE = 9,
  DELETED,
}
```

## 泛型 generic

- 函数泛型
- 类泛型、泛型继承接口 or 基本类型（约束泛型可取的类型）

## 命名空间 namespace

- namespace、export
- 类似模块化的开发方式，对外提供统一暴露接口
- 命名空间相互引用 首行加 `///<refrence path='./xxx.ts' />`
