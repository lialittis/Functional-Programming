(From Wikiwand and youtube)

# Monad(functional programming)

## what is a monad ?

what we are going to start with, is by defining a simple data type 
for the kind of expressions that we're going to evaluating.

data Expr = Val Int | Div Expr Expr

We declare a new date type called Expr, and it's got two new constructors - 
one called Val, which takes an integer parameter, and one called Div,
which takes two sub-expressions as parameters as well.

### Example

Maths			Haskell
1				Val 1
6 / 2			Div (Val 6) (Val 2)
6 / (3 / 1)		Div (Val 6) (Div (Val 3) (Val 1))

The basic idea is that we've got simple expressions built up from integers 
using division, and we want to think about how to write a program to 
evaluate these expressions?

```
eval:: Expr -> Int
eval (Val n) -> n
eval (Div x y) -> eval x / eval y
```

However, this evaluation could crash <- zero cannot be divided.
We need to define a safe version of Div.

safediv  :: Int -> Int -> Maybe Int

safediv n m = if m == 0 then Nothing
			  else Just (n / m)


Then the new evaluator is :

```
eval:: Expr -> Maybe Int

eval (Val n) -> Just n
eval (Div x y) -> case eval x of
					Nothing -> Nothing
					Just n -> case eval y of
						Nothing -> Nothing
						Just m -> safediv n m
```

This program is good but still has some problem. It's a bit too long,
and it's a bit too verbose, there is quite a lot of noise in here,
I can hardly see what's going on anymore.

The idea comes when we see a common pattern, we see the same things 
multiple times, we can abstract them out, and has them as a definition.

The common pattern is :

```
case XXX of
	Nothing -> Nothing
	Just x -> XXX x
```
```
m (A Maybe Value) >>= f(some function) = case m of
							Nothing -> Nothing
							Just x -> f x
```
Then let's rewrite our evaluator:

```
eval :: Expr -> Maybe Int

eval (Val n) -> return n
eval (Div x y) -> eval x >>= (lambdan ->
				  eval y >>= (lambdam ->
				  safediv n m))
```

Not perfect, so we go onto do notation

```
eval :: Expr -> Maybe Int

eval (Val n) -> return n
eval (Div x y) -> = do n <- eval x
					   m <- eval y
					   safediv n m
```

SO, 

**The Maybe Monad**

return :: a -> Maybe a  (*A bridge from pure to impure*)

>>= :: maybe a -> (a -> maybe b) -> maybe b (*bind*)

## What is the point ?

- Same idea works for other effects
- Supports pure programming with effects
- Use of effects explicit in types
- Functions that work for any effect

## WikiWand

在函数式编程中，单子（monad）是一种抽象，它允许以泛型方式构造程序。
支持它的语言可以使用单子来抽象出程序逻辑需要的样板代码（英语：boilerplate code）。
为了达成这个目标，单子提供它们自己的数据类型（每种类型的单子都有特定的类型），
它表示一种特殊形式计算，与之在一起的有两个过程，一个过程用来包装单子内“任何”基本
类型的值（产生单子值），另一个过程用来复合（英语：function composition 
(computer science)）那些输出单子值的函数（叫做单子函数）

单子可以通过定义一个类型构造子m和两个运算即return和bind来建立。C. A. McCann解释说：“对于单子m，类型m a的值表示对在这个单子上下文内的类型a的访问。”

return（也叫做unit），接受一个类型a的值，把它们包装成使用这个类型构造子建造的类型m a的“单子值”。bind（典型的表示为>>=），接受一个在类型a上的函数f，并应用f于去包装的值a，转变单体值m a。在后面的导出自函子章节有可作为替代的等价构造，使用join函数替代了bind算子。

通过这些元素，编程者可以复合出一个函数调用的序列（管道），在一个表达式中通过一些bind算子把它们链接起来。每个函数调用转变它的输入普通类型值，而bind算子处理返回的单子值，它被填入到序列中下一个步骤。

在每对复合的函数调用之间，bind算子>>=可以向单子值m a注入在函数f内不可访问的额外信息，并沿着管道传递下去。它还可进行细致的执行流控制，比如只在特定条件下调用函数，或以特定次序执行函数调用。

### 例子：Maybe单子

下面的快捷伪代码例子展示编程者使用单子的动机。
未定义值或运算是健壮的软件应当准备和优雅处理的一个特殊问题。

完成这个目标的第一步是建立一个可选类型，它标记一个值要么承载某个类型T
（T可以是任何类型）的值要么没有承载值。新的类型将叫做Maybe T，
而这个类型的值可以包含要么类型T的值，要么空值Nothing。类型T的值x，
若定义并用于Maybe上下文则叫做Just x。这么做是通过区分一个变量承载有定
义的值的情况和未定义的情况来避免混淆。

data Maybe T = Just T | Nothing

Maybe T可以被理解为一种“包装”类型，把类型T包装成具有内建异常处理的一种新类型，
尽管不承载关于异常成因的信息。

在下列的伪代码中，前缀着m的变量有针对某种类型T的类型Maybe T。例如，
如果变量mx包含一个值，它是Just x，这里的变量x有类型T。λx -> ...是匿名函数，
它的形式参数x的类型是推论而来，而∘是函数复合算子。

另一个改进是，函数通过Maybe类型能管理简单的检查异常，一旦某个步骤失败就短路并
返回Nothing，如果计算成功则返回正确的值而无需再评论。

加法函数add，在做二个Maybe值mx和my的加法时就实现了上述改进，它可以如下这样定义：

 add :: Maybe Number -> Maybe Number -> Maybe Number
 add mx my  = ...
     if mx is Nothing then
         ... Nothing
     else if my is Nothing then
         ... Nothing
     else
         ... Just (x + y)
书写函数来逐一处理Maybe值的各种情况可能相当枯燥，并且随着定义更多函数而变得更甚。将多个步骤链接起来的运算是减轻这种状况的一种方式，通过使用中缀算子如x >>= y，甚至可以直观的表示将每个步骤得出的（可能未定义的）结果填入下一步骤之中。因为每个结果在技术上被插入到另一个函数之中，这个算子转而接受一个函数作为一个形式参数。由于add已经指定了它的输出类型，保持这个算子的灵活性而接受输出与其输入不同类型的函数应当没有什么伤害：

 >>= :: Maybe T -> (T -> Maybe U) -> Maybe U
 (mx >>= f) = ...
     if mx is (Just x) then
         ... f(x)    -- f返回类型Maybe U的定义值
     else
         ... Nothing -- f不返回值
具有>>=可用，add可以被精制为更紧凑的表述：

 add mx my  =  mx >>= λx -> (my >>= λy -> Just (x + y))
这更加简洁，而一点额外的分析就能揭示出它的强大之处。首先，Just在add中扮演的唯一角色就是标记（tag）一个低层值为也是Maybe值。为了强调Just通过包装低层值而在其上施加作用，它也可以被精制为函数，比如叫做eta：

 eta :: T -> Maybe T
 eta x  =  Just x
整体情况是这两个函数>>=和eta被设计用来简化add，但是他们明显的不以任何方式依赖于add的细节，只是有关于Maybe类型。这些函数事实上可以应用于Maybe类型的任何值和函数，不管底层的值的类型。例如，下面是来自Kleene三值逻辑的一个简洁的NOT算子，也使用了相同的函数来自动化未定义值：

trinot :: Maybe Boolean -> Maybe Boolean
trinot mp  =  mp >>= λp -> (eta ∘ not) p
可以看出来Maybe类型，和与之一起的>>=和eta，形成了单子。尽管其他单子会具体化不同的逻辑过程，而且一些单子可能有额外的属性，它们都有三个类似的构件（直接或间接的）服从这个例子的纲要[1][7]。

定义
对函数式编程中的单子的更常用的定义，比如上例中用到的，实际上基于了Kleisli三元组（英语：Kleisli category）而非范畴论的标准定义。两个构造可以证明在数学上是等价的，任何定义都能产生有效的单子。给定任何良好定义的基本类型T、U，单子构成自三个部份：

类型构造子 M，建造一个单子类型M T[b]
类型转换子，经常叫做unit或return，将一个对象x嵌入到单子中：
unit(x) :: T -> M T[c]
组合子，典型的叫做bind（约束变量的那个bind），并表示为中缀算子>>=，去包装一个单体变量，接着把它插入到一个单体函数/表达式之中，结果为一个新的单体值：
(mx >>= f) :: (M T, T -> M U) -> M U[d]
但要完全具备单子资格，这三部份还必须遵守一些定律：

unit是bind的左单位元：
unit(a) >>= λx -> f(x) ↔ f(a)
unit也是bind的右单位元:
ma >>= λx -> unit(x) ↔ ma
bind本质上符合结合律：[e]
ma >>= λx -> (f(x) >>= λy -> g(y)) ↔ (ma >>= λx -> f(x)) >>= λy -> g(y)[1]
在代数上，这意味任何单子都引起一个范畴（叫做Kleisli范畴（英语：Kleisli category））和在函子（从值到计算）的范畴上的幺半群，具有单子复合作为二元算子和unit作为单位元。



























