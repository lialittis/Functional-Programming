var num = 5;
if (num > 0) {
    console.log("positive");
}
else {
    console.log("negative");
}
switch (num) {
    case 3:
        console.log(3);
        break;
    case 5:
        console.log(5);
        break;
    default:
        console.log(0);
        break;
}
var grade = "A";
switch (grade) {
    case "A": {
        console.log("优");
        break;
    }
    case "B": {
        console.log("良");
        break;
    }
    case "C": {
        console.log("及格");
        break;
    }
    case "D": {
        console.log("不及格");
        break;
    }
    default: {
        console.log("非法输入");
        break;
    }
}
var i;
var factorial = 1;
for (i = num; i >= 1; i--) {
    factorial *= i;
}
console.log("the factorial of num is " + factorial);
