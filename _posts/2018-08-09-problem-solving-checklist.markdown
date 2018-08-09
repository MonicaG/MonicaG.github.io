---
title: Problem Solving Checklist
layout: post
description: My notes on learning Swift. This post covers optionals.
category: programming
---

I  was recently working on a problem from a tutorial.  The problem was basic: write some code that will build a Google search URL.  It had the following requirements:
* take a string to use for the search term
* specify the google domain to search
* use the 'num' parameter to limit the number of search results
* use the 'as_qdr' parameter to limit the date range 

I only had a limited amount of time to work on the problem (real-life constraints, not a limit imposed by the tutorial).  So, I jumped in and created a function that took all the required parameters.  "This is an easy problem", I thought. "I can get this done quickly!"

At the end of my time, my code didn't compile.  I had parameters that were not used and I had made a mistake in my understanding of the as_qdr parameter.

Instead of jumping in and trying to solve the problem all at once, I should have broken it into steps.  I know this, but I got caught by my own ego. I thought the problem was simple and I could solve it quickly.

So, here is a reminder to myself on how to approach problems, no matter how easy they may seem:

* Is it possible to manually test the requirements/solution?
    * In this case, it would be to try an URL in the browser. Example: [https://www.google.co.uk/search?q=cat+pictures&num=50&as_qdr=y](https://www.google.co.uk/search?q=cat+pictures&num=50&as_qdr=y)
* Pick one feature to implement.
    * In this case, there were four features: search term, domain, num, and as_qdr
    * For this problem, the search term is the best place to start.  The other 3 requirements refine the results of the search term
* Investigate and question any constraints. 
* Once that feature is working repeat the steps for the remaining features.

The benefits of this approach are:
* It breaks the task into manageable pieces.  
* I always have something to show for my work.  So, even if I run out of time, I have hopefully implemented one of the features. 

It is better to have a working solution for some of the requirements rather than a partial implementation for all the requirements. Why? Because if this were a real-world task I would have a product that I could potentially release. It may not have all the features, but it has some and they work. This is in contrast to having a bit of everything implemented and nothing working.

Hopefully, I will remember next time!

