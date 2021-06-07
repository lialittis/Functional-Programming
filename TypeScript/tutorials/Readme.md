# TypeScript Installation

In this section, we will learn how to install TypeScript, pre-requisites before installation of TypeScript, and in how many ways we can install TypeScript.

## Pre-requisite to install TypeScript

Text Editor or IDE
Node.js Package Manager (npm)
The TypeScript compiler
Ways to install TypeScript
There are two ways to install TypeScript:

## Install TypeScript using Node.js Package Manager (npm).

Install the TypeScript plug-in in your IDE (Integrated Development Environment).

# Intro

The process of converting from typescript to javascript is like :

TypeScript -> TypeScript Compiler -> JavaScript

## 基础语法

- 模块
- 函数
- 变量
- 语句和表达式
- 注释

## How to compile

$ tsc .ts

$ node .js

## 基础类型

- any
- number
- string
- boolean
- 数组
- 元组
- enum
- void
- null
- undefined
- never

### Some details

Any 类型
任意值是 TypeScript 针对编程时类型不明确的变量使用的一种数据类型，它常用于以下三种情况。

1、变量的值会动态改变时，比如来自用户的输入，任意值类型可以让这些变量跳过编译阶段的类型检查，示例代码如下：

let x: any = 1;    // 数字类型
x = 'I am who I am';    // 字符串类型
x = false;    // 布尔类型

2、改写现有代码时，任意值允许在编译时可选择地包含或移除类型检查，示例代码如下：

let x: any = 4;
x.ifItExists();    // 正确，ifItExists方法在运行时可能存在，但这里并不会检查
x.toFixed();    // 正确

3、定义存储各种类型数据的数组时，示例代码如下：

let arrayList: any[] = [1, false, 'fine'];
arrayList[1] = 100;

null
在 JavaScript 中 null 表示 "什么都没有"。

null是一个只有一个值的特殊类型。表示一个空对象引用。

用 typeof 检测 null 返回是 object。

undefined
在 JavaScript 中, undefined 是一个没有设置值的变量。

typeof 一个没有值的变量会返回 undefined。

Null 和 Undefined 是其他任何类型（包括 void）的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined。而在TypeScript中启用严格的空校验（--strictNullChecks）特性，就可以使得null 和 undefined 只能被赋值给 void 或本身对应的类型

示例代码如下：

// 启用 --strictNullChecks
let x: number;
x = 1; // 运行正确
x = undefined;    // 运行错误
x = null;    // 运行错误
上面的例子中变量 x 只能是数字类型。如果一个类型可能出现 null 或 undefined， 可以用 | 来支持多种类型，示例代码如下：

// 启用 --strictNullChecks
let x: number | null | undefined;
x = 1; // 运行正确
x = undefined;    // 运行正确
x = null;    // 运行正确

never 类型
never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环），示例代码如下：

let x: never;
let y: number;

// 运行错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (()=>{ throw new Error('exception')})();

// 运行正确，never 类型可以赋值给 数字类型
y = (()=>{ throw new Error('exception')})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}

