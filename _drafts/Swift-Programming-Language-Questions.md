---
title: Swift Programming Language Questions - The Basics
layout: post
category: swift
desc: Questions derived from the first chapter of Apple's Swift Book
---
I've been playing around with Swift and going through Apple's [Language Guide for Swift](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID309"). I created some quiz questions for myself based on the first chapter.  All of these questions can be done using a XCode Playground.  My answers are below the list of questions.  These questions do not contain all the topics covered in the chapter.  For example, booleans are excluded as I am comfortable using.

##Questions

1. Declare a variable named 'x' and set it to 3

2. Declare a constant named 'y' and set it to 5

3. Declare a variable named 'name' of type String

4. Set the 'name' variable to your name

5. Print "hello" and your name

6. Represent the number 42 as a decimal, binary, octal and hexadecimal number. See [Conversion Table - Decimal, Hexadecimal, Octal, Binary](http://ascii.cl/conversion.htm) for conversion table.

7. Represent the number 1,500,000 as an exponential number

8. Sum these two variable: var a = 5 and var b = 0.25 

9. Create a tuple containing a birth date (year, month and day) and then print those values

10. Using the birth date tuple created above get only the year and month and ignore the day

11. Create an optional variable named userInput of type String and set it to have no value  

12. Set the userInput variable above to some value and use an if statement and forced unwrapping to print that value

13. Do the above step again but this time use optional binding instead of forced unwrapping

14. What is an implicitly unwrapped optional?  When is it used?

15. Write an assert statement to check that a variable named 'someVar' is greater than 0.

	

##Answers

1.
We don't need to declare a type as it is inferred from the value (In this case an Int)

{% highlight swift %}
var x = 3 
{% endhighlight %} 

2.
 {% highlight swift %}
 let y = 5
{% endhighlight %}

3.
{% highlight swift %}
var name : String
{% endhighlight %}

4.
{% highlight swift %}
name = "Monica"
{% endhighlight %}

5.
{% highlight swift %}
println("hello, \(name)")
{% endhighlight %}

6.
{% highlight swift %}
let decimalNum = 42
let binaryNum = 0b101010
let octNum = 0o052
let hexNum = 0x2A
{% endhighlight %}

7.
{% highlight swift %}
let num = 1.5e6
{% endhighlight %}

8.
{% highlight swift %}
var a = 5
var b = 0.25
let result = Double(a) + b
{% endhighlight %}

9.
{% highlight swift %}
//Possible solution 1
//In this solution the tuple elements are accessed via index.

let birthday = (2015, "January", 23)
println("\(birthday.1) \(birthday.2), \(birthday.0)")
{% endhighlight %}

{% highlight swift %}
//Possible solution 2
//In this solution the elements are named and accessed via their name

let birthday = (year: 2015, month: "January", day: 23)
println("\(birthday.month) \(birthday.day), \(birthday.year)")
{% endhighlight %}


{% highlight swift %}
//Possible solution 3
//In this solution variables are assigned to the elements

let birthday = (2015, "January", 23)
var (birthYear, birthMonth, birthDay) = birthday
println("\(birthMonth) \(birthDay), \(birthYear)")
{% endhighlight %}			

10.
{% highlight swift %}
let birthday = (2015, "January", 23)
var (birthYear, birthMonth, _) = birthday
println("\(birthMonth) \(birthYear)")
{% endhighlight %}

11.
An optional value says the variable has a value and it is X OR there is not a value.	
{% highlight swift %}	
var userInput : String?
{% endhighlight %}		

12.
{% highlight swift %}
var userInput : String?
userInput = "foo"
if userInput != nil {
	println("The user input was \(userInput!)")
}else {
	println("The user did not input a value")
}	
{% endhighlight %}

13.
{% highlight swift %}
var userInput : String?
userInput = "foo"
if let userInputHasValue = userInput {
	println("The user input was \(userInputHasValue)")
}else {
	println("The user did not input a value")
}
{% endhighlight %}

14.
Implicitly unwrapped optionals are written with an exclamation mark rather than a question mark (Double! vs Double?).  They are used when it is clear the optional will always have a value.  For example, the optional's value is set immediately after declaring it.  The following is an example.

{% highlight swift %}
var requiresExpeditedShipping = true  //hardcoded here but we can imagine it calls some function that determines this value
var shippingAmount : Double!  //the amount is set immediately below so we can use an "implicitly unwrapped optional"

if requiresExpeditedShipping {
	shippingAmount = 5.0
}else {
	shippingAmount = 2.5
}
println("Value is \(shippingAmount)")
{% endhighlight %}

15.
{% highlight swift %}
assert(someVar > 0, "someVar not greater than 0")
{% endhighlight %}
