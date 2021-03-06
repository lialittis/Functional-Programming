

## The State Monad
The state monad is a built in monad in Haskell that allows for chaining of a state variable (which may be arbitrarily complex) through a series of function calls, to simulate stateful code. It is defined as:
```
newtype State s a = State { runState :: (s -> (a,s)) }
```
which, honestly, can be pretty bewildering at first. There are a few things going on here for starters. First, if you haven't seen it before, newtype is a lot like data, except for some details that don't matter right now; just think of it as data for the moment. So what's "in" our data type? It's a function! And we're implicitly defining a function to extract our inner function from the data type: that function is called runState.
Now let's think about that inner function. It's type is s -> (a,s). Essentially, it's a type for any function that takes some initial state and then returns a tuple of (regular return value, new state). That makes sense. And because of partial applications, currying, etc. we can actually write something like the following:
```
data ProgramState = PS [Int] -- this is what our state "is"
foo :: Int -> String -> State (Int, ProgramState)
foo = ...
```
So, since our function ends with State (Int, ProgramState), we can infer that the type of the state we would be passing around, if using this function, would be ProgramState. The really cool bit though is that it looks like we're using State as a regular data type, but since it's actually a function type, it's probably better to think of this as a shorthand way of adding " -> s -> (a,s) " to the end of our type declaration for foo. In other words, we could rewrite foo as this:
```
--foo :: Int -> String -> State (Int, ProgramState)
  foo :: Int -> String -> ProgramState -> (Int, ProgramState)
```
In other words, saying we're returning a State, is actually saying that we're returning a function. But, since the partial function will get automatically applied if we call foo with a third parameter (the initial state), we're really just saying that foo is a function that takes an int, a string, a previous state, and then returns a tuple of (return value, new state). Pretty cool. So, how do we use foo? Well, we have to use runState to extract the inner function so that we get it's return value! Observe:
```
initialState = PS []
doSomething = runState (foo 2 "blah") initialState
```
This is kind of confusing because Haskell collapses the partial applications for you, but it'll grow on you :) Essentially though, doState will return a tuple of type (Int, ProgramState).
The state monad defines a function get that retrieves the state, and put which lets you overwrite the current state that's being passing along. Thus, a (slightly) more realistic example might be the following:

```
doSomethingCooler = runState (do (PS currentStack) <- get
                                 let top = head a
                                 returnFromFoo <- foo top "myString"
                                 put (returnedFromFoo : currentStack)
                                 return top
                             ) initialState
```
The successive functions get chained together by the state monads definition of >>= to pass along the current state. Each line where we call a function "in the state monad" behaves as follows: the arguments we give it on that line are applied, yielding a partially applied function. This is because each of the state monad functions yields a State function (which still needs an argument of type s before it can yields it's result tuple. The definition of >>= makes it so that all the functions in the do loop get passed the current state as that final parameter, execute, and then, once they return, the next function in the chain gets called using the previously return state.
Lastly, we could write a state monad function as follows:

```
bar = do a <- get
         c <- someOtherFunctionWeCouldWrite
         put c
         return ()
Bar's type is:
bar :: State ((), s)
```
where s might depend on the definition of the function we're not writing, but otherwise could just be free.
The really cool thing though is what this is. Basically, this do loop gets collapsed into one function, of type State (e.g. of type s -> (a,s). So, it takes an initial state, and returns a tuple. To run it, we extract the "inner function" from it's State wrapping using runState, and call it on some initial state.

```
runState bar initialState
```

## Understanding the State Monad

**Question:**

I am learning about the State monad in the book "Learn You a Haskell for Great Good!" by Miran Lipovaca. For the following monad instance:
```
instance Monad (State s) where
   return x = State $ \s -> (x,s)
   (State h) >>= f = State $ \s -> let (a, newState) = h s
                                       (State g) = f a
                                   in g newState
```
I am having trouble understanding the definition for the >>= function. I am not sure whether h is the stateful computation (i.e. the function that takes a state and returns a result with an updated state) or whether it is a state. I am guessing that it must be a stateful computation since it is applied to the state (of type s) in the lambda function to produce the result (a, newState).

But from the type declaration of State s a:
```
newtype State s a = State { runState :: s -> (a,s) }
```
The state is of type s and the result is of type a. So for the monad instance, is the s in instance Monad (State s) the type of the state or is it actually the stateful computation? Any insights are appreciated.

**Answer:**

A State object does not store a state. It stores a "change of state". Indeed it stores a function runState :: s -> (a, s). Here s is the type of the state, and a is the type of the "output" so to speak.

The function thus takes the state as input, and returns a 2-tuple (a, s). Here the first item is the "output", and the second item is the "new state". The new state might be the same as the old state, but one thus has the opportunity to make changes to the state (otherwise it is not very useful to use a State anyway).

We can bind State-changing object and a "factory" of a state changing object (a -> State s b) together in a new State-changing object. We thus construct a function that takes an initial state s0. We first run that to the runState of the State object, and thus retrieve a 2-tuple (a, s1). We can then use this a to construct a State s b object, and then we run the (altered state) s1 through the runState of that State object.

A more verbose implementation is thus:
```
instance Monad (State s) where
   return x = State $ \s -> (x,s)
   (State h) >>= f = State g
       where g s0 = (b, s2) -- result of second runState
                 where (a, s1) = h s0 -- run through first runState
                       -- create second state with the output of the first
                       State f' = f a
                       (b, s2) = f' s1 -- run through second runState
```
Note that we here never actually have a state value. We only construct a new function that will work on that state value.

Schematically we could see the bind operator as follows:

```
  s0
\    /
 |  |
 |  |
 ||||
  |\_________
  |          '
  |           s1
  v         \    /
  a ----->   |  |
             |  |
             ||||
              |\_______
              |        '
              v        s2
              b
```
So here the first runState takes the initial state s1 will return an a and s1. With the a, we construct a new runState, that can then process the state s1 further, and will return a b and the new state s2.


## Working with Monads in OCaml

### Higher-kinded type constructor

```haskell
data MaybeT m a = MaybeT (m (Maybe a))
ghci> : k MaybeT
MaybeT :: (* -> *) -> * -> *
```

MaybeT is a type constructor that takes a type constructor as a type parameter.

### What about OCaml ?

```
type ('w,'a) optiontwriter = 'w * 'a option
(*ok*)

type ('m,'a) optiont = ('a option) 'm
(*Error: Syntax error*)
```



