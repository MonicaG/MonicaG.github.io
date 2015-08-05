---
layout: post
title: Comparing integers using Integer.compare vs subtraction
category: java
desc: Why you should use Integer.compare rather than subtracting to integers when comparing values
---

TL;DR: Use Integer.compare to avoid overflow that can occur when subtracting two integers.

I took the [Oracle's Java 8 MOOC: Lamdbas And Streams](https://apexapps.oracle.com/pls/apex/f?p=44785:145:0::::P145_EVENT_ID,P145_PREV_PAGE:4887,143) class.  I had a question about using Integer.compare that arose from one of the homework questions.  I am recording the question and answer here so I can find it easily in the future, instead of having it buried in a thread about a homework assignment using the Streams API.  The original post is on the [Oracle community forums](https://community.oracle.com/message/13227819#13227819).

My question was:

> My answers were pretty similar to what has already been posted.  However, for the sort in question 7 I did:

{% highlight java %}
 .sorted((word1, word2) -> Integer.compare(word1.length(), word2.length()))
{% endhighlight %}

> whereas most implementations in this thread have done something like:

{% highlight java %}
 .sorted((word1, word2) -> word1.length() - word2.length())
{% endhighlight %}
>
> Is there any advantage to using subtraction vs using the Integer.compare method?  Or is just different ways of doing the same thing?

The reply from [Stuart Marks-Oracle](https://community.oracle.com/people/Stuart%20Marks-Oracle?customTheme=otn) was:

>For this particular problem, there is essentially no difference. However, there are cases when comparing integers, where writing a comparator that simply subtracts the two values can fail to produce the right answer. Consider the following:
>

{% highlight java %}
List<Integer> list = Arrays.asList(Integer.MAX_VALUE, -1, 0, 1, Integer.MIN_VALUE);  
list.sort((i1, i2) -> i1 - i2);  
System.out.println(list);  
  
// output  
[-1, 0, 1, 2147483647, -2147483648]  
{% endhighlight %}

>
> This is clearly wrong. Can you see why? Overflow, that's why! When comparing numbers of extreme magnitude, such as MAX_VALUE and -1, these are subtracted, giving a result with the wrong sign. That's why the sorting fails in the case. The correct way to compare integers is, as you note, using Integer.compare():
>

{% highlight java %}
List<Integer> list = Arrays.asList(Integer.MAX_VALUE, -1, 0, 1, Integer.MIN_VALUE);  
list.sort(Integer::compare);  
System.out.println(list);  
  
// output       
[-2147483648, -1, 0, 1, 2147483647]  
 {% endhighlight %} 

> There's nothing magical about Integer.compare(). It's basically a conditional expression that uses comparison operations instead of subtraction:
>
{% highlight java %}
	return (x < y) ? -1 : ((x == y) ? 0 : 1);  
{% endhighlight %}

>
> In the exercise, string lengths are always non-negative, so subtracting them cannot result in overflow. However, I always recommend using Integer.compare(), so that you don't have to prove that overflow cannot occur.




