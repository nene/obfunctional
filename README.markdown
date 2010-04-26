obfunctional JavaScript library
===============================

Building on the [Functional][] library by Oliver Steele, which allows
the creation of string lambdas, this library makes the use of those
lambdas more object-oriented.

For example, using Functional you would write:

    map(select([1,2,3,4,5], ">3"), "*2");

But using obfunctional you would write:

    [1,2,3,4,5].filter(">3").map("*2");

The latter is IMHO more readable, as it makes clear the order of
operations performed.

Currently this all is very alpha.

[Functional]: http://osteele.com/sources/javascript/functional/
