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
