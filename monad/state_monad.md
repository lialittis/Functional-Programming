

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
So here the first runState takes the initial state s0 will return an a and s1. With the a, we construct a new runState, that can then process the state s1 further, and will return a b and the new state s2.
