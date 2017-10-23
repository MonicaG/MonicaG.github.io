---
title: 3 things&#58; Swift functions
layout: post
category: three-things
desc: Three things I learned this week about Swift functions
---

This week's post is all about Swift functions.  

## internal and external argument labels

Swift allows for both internal and external labels on the arguments.  The external label provides a descriptive name for the calling code.  The internal label allows for brevity within the function.  Example:


```swift
func calculateDistance(speed s: Double, time t: Double) -> Double {
    return s * t
}

let distance = calculateDistance(speed: 2.0, time: 40.0)
```

In the above example, both an internal and external label are not needed as 'speed' and 'time' are quite short. Stylistic issues aside, the example shows how external and internal labels work.


The argument's external label can also be omitted by using the underscore character.  Omitting the external label is useful when it makes the calling code more readable.  For example:

```swift
func doubleIt(_ a: Int) -> Int {
    return a * 2
}

let x = doubleIt(3)
```

The above code is more concise then doing the following:

```swift
func doubleIt(value: Int) -> Int {
    return value * 2
}

let x = doubleIt(value: 3)
```


## inout arguments

Swift allows for 'pass by reference' to a function using the 'inout' keyword. 

Example:

```swift
func doubleIt(_ a: inout Int) {
    a = a * 2
}

var value : Int = 4
print(value)  // Value is 4
doubleIt(&value)
print(value) //the value is now 8
```

## default argument values

Swift allows an argument to have a default value. Example:

```swift
func calculatePrice(price: Double, tax: Double = 0.7) {
    //code to calculate the price
}

calculatePrice(price: 23.50)
calculatePrice(price: 23.50, tax: 0.5)

```

In this case the first call to the <code>calculatePrice</code> method will use the default tax value of 0.7.  The second call to the <code>calculatePrice</code> method will use the value of 0.5


