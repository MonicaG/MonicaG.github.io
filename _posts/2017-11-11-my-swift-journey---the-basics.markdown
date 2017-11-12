---
title: My Swift Journey - The Basics
layout: post
description: My notes on learning Swift. This post covers basic syntax&#44; ranges and tuples.
category: swift
---
I am currently learning Swift to expand my programming knowledge. I looked at Swift a few years ago, but am now ready to dive into it.

I have programmed for many years with Java, and have some familiarity with Python.  So, my approach to learning a new language is influenced by that previous knowledge. For example, I already know what a loop is. With Swift, I want to know the available control flow statements and their syntax. This is different from when I first learned to program and I had to learn the concept of a loop besides the syntax.

I am hoping to learn concepts that are not present in Java. I also want to see how another language approaches typical programming concepts.

This post contains my notes on Swift's basic syntax, ranges and tuples. These notes are not an exhaustive resource. I plan to create posts on other concepts as I continue on my learning path.


## Syntax Basics

{:.table .table-striped}
|Syntax/Concept| Swift |
|------|-------|
| semicolons |Semicolons can be used to separate lines, but it is recommend not too. Semicolons are required if there are multiple statements on one line.|
| comments | Same as Java.|
| parentheses | Are not needed around conditional statements. This is different from Java where they are needed.|
| curly braces | Are required after conditional or loop statements. In Java they are not required. This can lead to bugs because code thought to be in a conditional/loop block is not. Swift avoids this potential error by requiring the curly braces.|
| type inference | Swift can infer type. Integer and Double are the default type vs Unsigned Integer or Float.  Float or Unsigned Integer must be explicitly declared if those types are needed. |
| constant declaration | <code>let</code> keyword.  Swift prefers the use of constants over variables.|
| variable declaration | <code>var</code> keyword.|
| logical operators (NOT, AND, OR)| Same as Java |
| string interpolation | `\(variable)` in a String |


Examples:

```swift
//constant declaration, with type inference
let x = 3
//constant declaration, with type annotation
let tax : Float = 0.7

//variable declaration, with type inference
var y = "Apple"

//variable declaration, with type annotation
var title : String = "Harry Potter And The Half Blood Prince"

//conditionals do not need parentheses, but do need curly braces
let a = true
let b = false
let c = false
if a == b {
    print("They are the same!")
}else {
    print("They are different")
}

//logical operators
if a && b || !c {
    print("in code block")
}

//string interpolation
let name = "Snoopy"
print("Hello \(name)")

```


## Ranges

I like the range operators in Swift.  They are intuitive and concise to work with. 

{:.table .table-striped}
|Swift|Notes|
|------|-----|
| a...b | a and b are inclusive. Called the "Closed Range Operator" |
| a..<b | includes a, but excludes b. Called the "Half Open Range Operator" |
| [2...] | One sided range. In this example get all array items starting at index 2.  |
| [..<2] | One sided range. In this example get all array items up to but excluding index 2. |


Examples:

```swift
//Closed Range Operator. 
for x in 1...3 {
    print(x)
}

//Half Open Range Operator
for x in 1..<3 {
    print(x)
}

//One sided ranges
let fruits = ["apple", "banana", "peach", "grape"]

for fruit in fruits[1...] {
    print(fruit)
}

for fruit in fruits[..<2] {
    print(fruit)
}


```

## Tuples

- Hurray! Swift has Tuples! I liked using them in Python and am glad Swift includes them. :)
- Swift also supports named tuples. Tuple values can be accessed by name rather than by index value.

Example:

```swift
//Named tuple
let t = (currencyName: "CAD", exchangeRate: 1.2, id: 4)

print(t.currencyName)
```    

## First Impressions

So far, I like Swift!  The syntax is easy to read and concise to write. I also like it is a type-safe language. I am looking forward to learning more!


Thank you for reading! If you notice anything I missed or got wrong, please let me know!  :)

## References


[Mastering Swift 4](https://www.packtpub.com/application-development/mastering-swift-4-fourth-edition)

[The Swift Programming Language Guides And Sample Code](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/index.html)

[Swift Wikipedia Entry](https://en.wikipedia.org/wiki/Swift_(programming_language))
