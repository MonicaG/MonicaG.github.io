---
title: Swift Programming Language Questions - The Basics
layout: post
category: swift
desc: Questions derived from the first chapter of Apple's Swift Book
---
I've been playing around with Swift and going through Apple's [Language Guide for Swift](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID309"). I created some quiz questions for myself based on the first chapter.  All of these questions can be done using a XCode Playground.  My answers are below the list of questions.


##Questions

<ol>
<li> Delcare a variable named 'x' and set it to 3</li>
<li> Declare a constant named 'y' and set it to 5</li>
<li> Delcare a variable named 'name' of type String</li>
<li> Set the 'name' variable to your name</li>
<li> Print "hello" and your name</li>
<li> Add 5 and 0.25</li>
<li> Create a tuple containing a birthdate (year, month and day) and then print those values</li>
<li> Using the birthdate tuple created above get only the year and month and ignore the day</li>
<li> Given: var userNumber =  </li>
</ol>	

##Answers

<ol>
	<li>{% highlight swift %}var x = 3 //don't need to declare a type as it is inferred from the value (In this case an Int){% endhighlight %}</li>
	<li>{% highlight swift %}let y = 5{% endhighlight %}</li> 
	<li>{% highlight swift %}var name : String{% endhighlight %}</li>
	<li>{% highlight swift %}name = "Monica"{% endhighlight %}</li>
	<li>{% highlight swift %}println("hello, \(name)"){% endhighlight %}</li>
	<li>
{% highlight swift %}
let integerPart = 5
let fractionalPart = 0.25
let pi = Double(integerPart) + fractionalPart
{% endhighlight %}
	</li>
	<li>
{% highlight swift %}
let integerPart = 5
let fractionalPart = 0.25
let pi = Double(integerPart) + fractionalPart
{% endhighlight %}
	</li>
	<li>
There are multiple ways to do this. 

In this solution the tuple elements are accessed via index.
{% highlight swift %}
let birthday = (2015, "January", 23)
println("\(birthday.1) \(birthday.2), \(birthday.0)")
{% endhighlight %}

In this solution the elements are named and accessed via their name
{% highlight swift %}
let birthday = (year: 2015, month: "January", day: 23)
println("\(birthday.month) \(birthday.day), \(birthday.year)")
{% endhighlight %}

In this solution variables are assigned to the elements
{% highlight swift %}
let birthday = (2015, "January", 23)
var (birthYear, birthMonth, birthDay) = birthday
println("\(birthMonth) \(birthDay), \(birthYear)")
{% endhighlight %}			
	</li>
	<li>
{% highlight swift %}
let birthday = (2015, "January", 23)
var (birthYear, birthMonth, _) = birthday
println("\(birthMonth) \(birthYear)")
{% endhighlight %}
	</li>
</ol>





