// to define variables

var uname:string = "tianchi";

var undefinedvalue:string; // the value is set to undefined

var anytype = "tianchi"; // the type is string

console.log("name:"+uname)
console.log("undefinedvalue:"+undefinedvalue)
console.log("anytype:"+anytype)

// Type Assertion

var str = 'str'

var str2 : number =  <number> <any> str;

console.log(str2) // 但是运行js文件时， typeof(str2) = string

// 变量作用域

var global_num = 12          // 全局变量
class Numbers { 
   num_val = 13;             // 实例变量
   static sval = 10;         // 静态变量
   
   storeNum():void { 
      var local_num = 14;    // 局部变量
   } 
} 
console.log("全局变量为: "+global_num)  
console.log(Numbers.sval)   // 静态变量
var obj = new Numbers(); 
console.log("实例变量: "+obj.num_val)

