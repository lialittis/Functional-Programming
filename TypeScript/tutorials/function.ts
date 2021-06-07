function test() {   // 函数定义
    console.log("调用函数") 
} 
test()              // 调用函数

// with return type

// 函数定义
function greet():string { // 返回一个字符串
    return "Hello World" 
} 
 
function caller() { 
    var msg = greet() // 调用 greet() 函数 
    console.log(msg) 
} 
 
// 调用函数
caller()


// with parameters
function add(x: number, y: number): number {
    return x + y;
}
console.log(add(1,2))


// with optional parameters
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

// with default values
function calculate_discount(price:number,rate:number = 0.50) { 
    var discount = price * rate; 
    console.log("计算结果: ",discount); 
} 
calculate_discount(1000) 
calculate_discount(1000,0.30)

// rest parameters
function buildName2(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
  
let employeeName = buildName2("Joseph", "Samuel", "Lucas", "MacKinzie");
// 函数的最后一个命名参数 restOfName 以 ... 为前缀，它将成为一个由剩余参数组成的数组，索引值从0（包括）到 restOfName.length（不包括）。

// 匿名函数
var msg = function() { 
    return "hello world";  
} 
console.log(msg())

// recursive function
function factorial2(number) {
    if (number <= 0) {         // 停止执行
        return 1; 
    } else {     
        return (number * factorial2(number - 1));     // 调用自身
    } 
}; 
console.log(factorial2(6));      // 输出 720

// Lambda function
var foo = (x:number)=>10 + x 
console.log(foo(100))      //输出结果为 110

var foo2 = (x:number)=> {    
    x = 10 + x 
    console.log(x)  
} 
foo2(100)

// 我们可以不指定函数的参数类型，通过函数内来推断参数类型:
var func = (x)=> { 
    if(typeof x=="number") { 
        console.log(x+" 是一个数字") 
    } else if(typeof x=="string") { 
        console.log(x+" 是一个字符串") 
    }  
} 
func(12) 
func("Tom")

// 单个参数 () 是可选的
var display = x => { 
    console.log("输出为 "+x) 
} 
display(12)

// 无参数
var display2 =()=> { 
    console.log("Function invoked"); 
} 
display2();

// 函数重载 ： 一定要声明

function disp(s1:string):void; 
function disp(n1:number,s1:string):void; 

function disp(x:any,y?:any):void { 
    console.log(x); 
    console.log(y); 
} 
disp("abc") 
disp(1,"xyz");

