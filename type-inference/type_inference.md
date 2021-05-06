# Type Inference 类型推论

## Types, Type Inference and Unification - by Mooly Sagiv, Cornell CS 6110

### What is a type

A type of a collection of computable values that share some structural property.

Examples : int, string, int -> bool, (int -> int) -> bool.

**Advantages of Types**:

- Program organization and documentation
	- separate types for separate concepts
	- Document intended use of declared identifiers
- Identify and prevent errors
	- Compile-time or run-time checking prevent meaningless computations
- Support optimization

### Type Safety

- Type safe programming languages protect its own abstractions
- Type safe programs cannot go wrong
- No run-time errors
- But exceptions are fine
- Type safety is proven at language design time

**Relative Type-Safety of Languages**

- Not safe: BCPL family, including C and C++
	- Casts, unions, pointer arithemetic
- Almost safe: Algol family, Pascal, Ada
- Safe: Lisp, ML, Haskell, Java, JS, OCaml

### Type Checking vs Type Inference

1. Standard type checking:

```
int f(int x) { return x+1; };
int g(int y) { return f(y+1)*2; };
```
- Examine body of each function
- Use declared types to check agreement

2. Type inference:

```
f (x) { return x+1; };
g (y) { return f(y+1)*2; };
```
- Examine code without type information
- Infer the most general types that could have been declared

Types and type checking are important for *modularity, reliability and compilation*, 
and type inference can reduce syntactic overhead of expressive types, it is guaranteed
to produce most general type.

### Algorithm



**Basic Idea**

Example: 
```
fun x -> 2 + x
-: int -> int = <fun>
```

What is the type of the expression ?

- + has type *int -> int -> int*
- 2 has type: int
- Since we are applying + to x, we need x : int
- So, fun x -> 2 + x => int -> int -> int
----------------------------------------------

%Imperative Example:
%```
%x:=b[z]
%a[b[y]]:=x
%```

----------------------------------------------

Example:
```
fun f -> f 3
-: (int -> a) -> a = <fun>
```

What is the type of the expression ?
- 3:int
- f: int -> a
- So fun f -> f 3 => ( int -> a) -> a

---------------------------------------------

Example:
```
fun f -> f (f 3)
-: (int -> int) -> int = <fun>
```


Example:
```
fun f -> f (f "hi")
-: (string -> string) -> string = <fun>
```

--------------------------------------------

Complex Example:

```
let square = lambdaz.z*z in
	lambdaf.lambdax.lambday.
if (f x y)
	then (f (square x) y)
	else (f x(f x y))
```

\* : int -> int -> int; 
z : int;
square: int -> int; 
f : a -> b -> bool, x:a, y: b; 
a: int; 
b: bool; 
(int -> bool -> bool) -> int -> bool -> bool

### Unification

- Unifies two terms
- Used for pattern matching and type inference
- Simple exmaples
	- int * x and y * (bool *bool) are unifiable for y = int and x = (bool * bool)
	- int * int and int * bool are not unifiable

#### Subustitution

```
Types:
<type>::= int | float | bool | ...
		| <type> -> <type>
		| <type>*<type>
		| variable
Terms:
<term>::=constant
		| variable
		| f(<term>,...,<term>)
```

**The essential task of unification is to find a substitution that makes the two**
**terms equal $f(x,h(x,y)) {x \to g(y), y \to z} = f(g(y),h(g(y),z))$**

The terms t1 and t2 are unifiable if there exists a substitution S such that t1 S = t2 S.

Example: $t81 = f(x,g(y)), t_2=f(g(z),w)$

#### Most General Unifiers (mgu)

- It is possible that no unifier for given two terms exist
- There may be several unifiers
- When a unifier exists, there is always a most general unifier (mgu) that is unique up
to renaming
- S is the most general unifier of t1 ant t2 if
	- it is a unifier of t1 and t2
	- for every other unifier S', there exists a refinement of S to give S'
- mguS can be efficiently computed

### Type Inference with mgu

Example:
```
fun f -> fun (f "hi")
(string -> string) -> string = <fun>
```

```
lambdaf:T1.
apply(f:T1,
	apply(f:T1,"hi";string):T2):T3

- mgu(T1,string->T2) = {T1 \to string -> T2} = S
- mgu(T1,T2->T3)(S)=
	{T1 \to string -> T2, T2 \to string, T3 \to string}

### Type Inference Algorithm

- Parse program to build parse tree
- Assign type variables to nodes in tree
- Generate constraints
	- From environment: literals, build-in operators, know functions
	- From form of parse tree: e.g., application and abstraction nodes
- Solve constraints using unification
- Determine types of top-level declarations

1. Step One : Parse Program

- Parse program text to construct parse tree

let f x  = 2 + x => 

```
			Fun
		  /  |  \
		 f   x   @
		        / \
			   @   x
			  / \
			 +   2
```

Infix operators are converted to Curied function application during parsing:(not necessary)
2 + x -> (+) 2 x

2. Step Two: Assign type varibales to nodes

f x  = 2 + x => 

```
			   Fun
		     /  |  \
			/   |   \
		   /    |    \
		  /     |     \
    f::t_0    x::t_1  (@)::t_6
		        	    /   \
					   /     \
			   	  (@)::t_4   x::t_1
			  	    /  \
			  (+)::t_2   2::t_3
```

3. Step Three: Add Constraints


t_0 = t_1 -> t_6;
t_4 = t_1 -> t_6;
t_2 = t_3 -> t_4;
t_2 = int -> int -> int;
t_3 = int


4. Step Four: Solve Constraints

5. Step Five: Determine type of declaration

t_0 = int -> int;
t_1 = int;
t_6 = int -> int;
t_4 = int -> int;
t_2 = int -> int -> int;
t_3 = int

#### Explaination

- Constraints from Application Nodes

- Constrains from Abstractions

- Inferring Polymorphic Types

[TO CONTINUE]


























