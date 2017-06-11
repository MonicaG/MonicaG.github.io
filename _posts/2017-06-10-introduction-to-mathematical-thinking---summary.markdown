---
title: 3 Things I learned from the Introduction to Mathematical Thinking class
layout: post
category: mathematical-thinking
desc: 3 Things I learned From the Introduction to Mathematical Thinking class. Including pattern recognition and proofs by induction.
excerpt_separator: <!--more-->
---

I took the [Introduction to Mathematical Thinking](https://www.coursera.org/learn/mathematical-thinking) class to improve my logical thinking. I found the class difficult, but I enjoyed it. The class covered many topics including truth tables, number theory and real analysis. The following are three things I learned that I can apply to programming or every day life.  

## 1 - Understanding versus solving a problem
When faced with a problem it is natural to want to dive in and solve it. However, it is important stop and examine the problem.  Is there a pattern? Does everyone have the same context for the problem? Is there ambiguity about the requirements?

Mathematical thinking focuses on understanding a problem rather than rushing to solve it.  This is because finding the answer solves that one problem. But, understanding means the solution can be applied to many problems.

One example from the class was to find the double meaning in the following statement:

<!--more-->

>No head injury is too trivial to ignore.

On first read, I understood this statement to mean: don't ignore head injuries.  However, there is a second way to read this statement.  It took me awhile to discover it and I needed to read the class forums for help.  The path to the answer was to recognize the sentence follows a pattern:

> No A is too B to C

Setting other terms for A, B and C can give statements like the following:

> No one is too old to learn

> No mountain is too high to climb

Seeing the statement like this leads to the second meaning: it's ok to ignore head injuries. The opposite of what the sign intended to convey!

This approach of understanding versus solving a problem reminded me of [design patterns](https://en.wikipedia.org/wiki/Software_design_pattern).  For example, a method that contains many <code>if else </code> blocks will get the job done. But that structure can be hard to maintain. Using design patterns means thinking about the code's structure. It is slowing down to examine the code to see if a pattern exists.  It is understanding if (or if not) a design pattern is applicable.

Also, working with precise language was good practice. It reinforced the importance of asking questions and clarifying statements.  I may think I know what the user wants, but do I actually know? Do we have the same shared context? Could there be other ways to interpret the requirements?

## 2 - Proofs by induction and recursion

 Induction proofs reminded me of recursion. I was curious, so I did some further reading after the class finished. I learned induction is used to:

 * prove the correctness of recursive algorithms
 * approach certain kinds of problems

So, what is induction? Induction is used to prove statements of the form $$ \forall n \in \mathbb{N} \thinspace A(n) $$. (For all n in the set of natural numbers, A(n), where A(n) is some function).  A proof by induction involves two steps:

1. Showing that A(1) is true (this is the base case)
1. $$ (\forall n) [A(n) \implies A(n+1)]$$ (this is the induction step)

The above gives $$ (\forall n)A(n) $$ as follows: By Step1, A(1). By step 2, $$ A(1) \implies A(2) $$. So from A(1) we can conclude A(2). By A(2) and the induction step, we can conclude A(3) etc.

An induction proof can be thought of as an infinitely long line of dominoes.  The base step pushes over the first domino. The inductive step says that one domino falling will cause the next one to fall over, and then the next one etc... And so the dominos fall down the line.

The following is an induction proof from the class.

Theorem: $$ \sum\limits_{i=1}^n i = \frac{1}{2}n(n+1) $$

Proof: By mathematical induction

Step 1: Prove the initial case n = 1

\$$
\begin{align}
1 & =\frac{1}{2}1(1+1) \\
1 &= \frac{1}{2}2 \\
1 & = 1
\end{align}
$$


Step 2: Give an algebraic argument to establish the conditional $$ A(n) \implies A(n + 1) $$. Reduce $$ A(n + 1) $$ to a form where you can use $$ A(n) $$.

Assume the identity holds for n: $$ \sum\limits_{i=1}^n i = \frac{1}{2}n(n+1) $$

We want to deduce: $$\sum\limits_{i=1}^{n+1} i = \frac{1}{2}(n+1)[(n+1)+1]$$ (We've added $$ n + 1 $$ to both sides of the identity)


\$$
\begin{align}
1 + 2 + 3 ... + n + (n + 1) & = \frac{1}{2}n(n+1) + (n + 1) \\
& =  \frac{1}{2}[n(n+1)+2(n+1)] \\
& = \frac{1}{2}[n^2 + n + 2n + 2] \\
&= \frac{1}{2}[n^2 + 3n + 2] \\
&=\frac{1}{2}[(n+1)(n+2)] \\
&=\frac{1}{2}(n+1)[(n+1)+1]
\end{align}
$$

Which is the identity with n+1 in place of n.  Hence, by the principle of mathematical induction, the identity holds for all n.


This process reminded me of recursion because of the base case and the domino effect of one 'n' leading to the next 'n'.


For example, the following is a recursive program that calculates factorials.

```Python
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)
```

This algorithm can be proved correct using induction.


Theorem: The algorithm <code>factorial(n)</code> correctly computes $$ n! $$ $$ \forall n \geq 0 $$

Base: factorial(0) = 1 (from lines 2 & 3 of the program). 0! = 1 by definition, so the base case is correct

Induction hypothesis: Assume factorial(n-1) is correct.  (This <code>factorial(n-1)</code> is the call on line 4)

Induction Step: We need to show that factorial(n) is computed correctly:

\$$
\begin{align}
&= n * factorial(n - 1) &&\text{(line 4 of the program)} \\
&= n * (n - 1)! &&\text{(by the induction hypothesis)} \\
&= n! &&\text{(by definition)} \\ 
\end{align}
$$


So, the program computes factorial(n) correctly for all natural numbers.

Another use of induction proofs is as a method to approach certain kinds of problems.  A common example seemed to be the "postage stamp" problem:

Theorem: Every amount of postage that is at least 12 cents can be made from 4 and 5 cent stamps.

Proof: By induction

Base: 

12 cents postage = 3 * 4 cents postage stamps

13 cents postage = 2 * 4 cents + 1 * 5 cents postage stamps

14 cents postage = 1 * 4 cents + 2 * 5 cents postage stamps

15 cents postage = 3 * 5 cents postage stamps

Induction:
We need to show how to construct $$ k + 1 $$ cents of postage where $$ k + 1 \ge 16 $$ (In the base case we already showed how to compose the postage for k in the range of 12 - 15 cents).
So, $$ k + 1 \ge 16 $$, and $$ (k + 1) - 4 \ge 12 $$.  The inductive hypothesis says we can make $$ (k + 1) - 4 $$ cents in postage. So, by adding one more 4 cent stamp we get us k + 1 cents in postage. So, we can make k + 1 cents in postage!

An example algorithm of this:

```Python
def postage(n):
    if n == 12:
        print("4 + 4 + 4")
    elif n == 13:
        print("4 + 4 + 5")
    elif n == 14:
        print("4 + 5 + 5")
    elif n == 15:
        print("5 + 5 + 5")
    else:
        postage(n - 4)
        print(" + 4")

print("22 cent postage:")
postage(22)

print("39 cent postage:")
postage(39)

```

Output from the algorithm:

```
22 cent postage:
4 + 5 + 5
 + 4
 + 4
39 cent postage:
5 + 5 + 5
 + 4
 + 4
 + 4
 + 4
 + 4
 + 4
```

In my day to day programming I do not use recursion very often. But it is a good technique for solving a certain type of problem.  My hope is that I will recall that induction is a technique available to me should I encounter such a problem.  I may not remember the details, but at least I have a starting point to research an answer.


## 3 - Struggling with a concept is part of the learning process
I found the class hard and I struggled through it. But Professor Devlin would reiterate that it was hard material. Struggling with the material was part of the learning process. Hard problems take time, patience and grunt work to solve.  Persistence is a good skill to have when tackling programming problems.


## Final Thoughts
I found the class difficult but I enjoyed it!  It was nice to stretch my brain in a direction it finds difficult.  I need to take it again (or multiple times) to fully understand it! The additional research outside of class on induction and recursion was interesting. I am glad I did it. I plan to take further classes on logic and critical thinking.  However, for the time being I am looking forward to focusing on coding again!

Resources:

[Introduction to Mathematical Thinking](https://www.coursera.org/learn/mathematical-thinking)

[http://jeffe.cs.illinois.edu/teaching/algorithms/notes/98-induction.pdf](http://jeffe.cs.illinois.edu/teaching/algorithms/notes/98-induction.pdf)

[https://courses.engr.illinois.edu/cs173/sp2011/Lectures/induction.pdf](https://courses.engr.illinois.edu/cs173/sp2011/Lectures/induction.pdf)

[http://condor.depaul.edu/ntomuro/courses/415/notes/lecture4.html](http://condor.depaul.edu/ntomuro/courses/415/notes/lecture4.html)

