// to define variables
var uname = "tianchi";
var undefinedvalue; // the value is set to undefined
var anytype = "tianchi"; // the type is string
console.log("name:" + uname);
console.log("undefinedvalue:" + undefinedvalue);
console.log("anytype:" + anytype);
// Type Assertion
var str = 'str';
var str2 = str;
console.log(str2); // 但是运行js文件时， typeof(str2) = string
// 变量作用域
var global_num = 12; // 全局变量
var Numbers = /** @class */ (function () {
    function Numbers() {
        this.num_val = 13; // 实例变量
    }
    Numbers.prototype.storeNum = function () {
        var local_num = 14; // 局部变量
    };
    Numbers.sval = 10; // 静态变量
    return Numbers;
}());
console.log("全局变量为: " + global_num);
console.log(Numbers.sval); // 静态变量
var obj = new Numbers();
console.log("实例变量: " + obj.num_val);
