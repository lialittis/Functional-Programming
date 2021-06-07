var num:number = 5
if ( num > 0) {
    console.log("positive");
} else {
    console.log("negative");
}

switch(num){
    case 3 :
        console.log(3);
        break;
    case 5 :
        console.log(5);
        break;
    default :
        console.log(0);
        break;
}

var grade:string = "A"; 
switch(grade) { 
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

// For loop

// first case :
var i:number;

var factorial = 1;

for(i=num; i>=1;i--){
    factorial *= i;
}

console.log("the factorial of num is " + factorial)

// second case : for ... in
var j:any; 
var n:any = "a b c" 
 
for(j in n) {
    console.log(n[j])  
}


// third case : for ... of
let someArray = [1, "string", false];
 
for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}

// forEach and every




// while loop

var factorial:number = 1; 
 
while(num >=1) { 
    factorial = factorial * num; 
    num--; 
} 
console.log("5 的阶乘为："+factorial);


// do ... while

var n1:number = 10;
do { 
    console.log(n1); 
    n1--; 
} while(n1>=0);

// infinite loop
for(;;) { 
    console.log("这段代码会不停的执行") 
}

while(true) { 
   console.log("这段代码会不停的执行") 
}
