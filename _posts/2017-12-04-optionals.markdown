---
title: Swift Optionals
layout: post
description: My notes on learning Swift. This post covers optionals.
category: swift
---

In a [previous](/blog/swift/my-swift-journey-the-basics) post I kicked off my dive into Swift by covering the basics: syntax, ranges, and tuples.  I decided to tackle optionals next.  This lead to quite the investigation.  But, I now have a better understanding of what optionals are and where to use them. This post is about what I learned.  

## What is an optional?

An optional represents the scenario where a value may exist or not. An optional is represented by the `?` symbol. 

Example: 

```swift
var a: Int?
``` 

In the above example, the variable `a` has a type of Optional Integer. Any type can be made an optional type by adding a `?`. 

Here, `a` does not have a value; it is `nil`. Swift uses `nil` to represent the absence of a value. The `?` is an indicator for a developer to be careful. Any code using `a` will need to handle a possible `nil` value. 


## Why use optionals?
Why are optionals needed? To help explain I will use a mailbox and mail as an example. A mailbox may or may not have mail in it. In this case, the mail is the optional; it exists or it does not.  

Below, I have used Java to create MailBox and Mail classes that do not use optionals.  I made the following restrictions for simplicity:

- Mail uses `Strings` for the to and from addresses.  I did not include fields for street, city etc.
- A MailBox can only contain one Mail. (Yes, in real life a mailbox can contain many pieces of mail.  But for simplicity in this example, I've restricted it to one piece of mail.)


```java
public class Mail {

    private String from;
    private String to;

    public Mail(String from, String to) {
        this.from = from;
        this.to = to;
    }

    public String getFrom() {
        return from;
    }

    public String getTo() {
        return to;
    }
}
```

```java
public class MailBox {

    private Mail mail;

    /**
     *
     * @return - null if the MailBox does not have Mail
     */
    public Mail getMail() {
        return mail;
    }

    public void setMail(Mail mail) {
        this.mail = mail;
    }
}


```

Anyone using this code will need to be aware of the methods which may return `null`.  One possible solution is to document the code. However, there are two potential problems with relying on documentation:
1. The code is not documented.
1. The documentation is not correct: 
    1. It may have been correct at one time. But, the code changed and the documentation was not updated.
    1. The developer may not have considered all possible return cases.


Given the code above, someone may write a method like the following:

```java
void checkMail(MailBox mailBox) {
    if(mailBox != null) {
        Mail mail = mailBox.getMail();
        if (mail != null) {
            System.out.println("Mail from: " + mail.getFrom().trim());
        }
    }
}
```

At first glance, the `checkMail` code may look fine.  However, there is a bug in it.  The `mail.getFrom()` method can return a `null`.  So, the use of `trim()` causes a null pointer exception for that scenario. Oh, no!


Optionals prevent the above scenario because their usage state whether a value may be `nil` or not.  A type that is not an optional cannot have a `nil` value.  This means a developer does not need to rely on documentation or reading the code to figure out if a value can be `nil`.  The type states whether a `nil` value is possible.

Both Swift and Java (as of version 1.8) support optionals.  Below, the mailbox analogy is rewritten in Swift using optionals.


```swift
class Mail {
    let to: String
    let from: String
    
    init(to: String, from: String) {
        self.to = to
        self.from = from
    }
}
```

In this version of the Mail class, the `to` and `from` fields are not optional.  This means setting the value to `nil` will cause a compiler error.


```swift
class MailBox {
    var mail: Mail?
    
}
```

In this version of the MailBox class, the `mail` property is a type of optional Mail.  It may be `nil`. We do not need to rely on the documentation to convey this fact.

```swift
import Foundation
func checkMail(mailBox: MailBox) {
    if mailBox.mail != nil {
        print("Mail from: \(mailBox.mail!.from.trimmingCharacters(in: .whitespacesAndNewlines))")
    }
}
```

In this version, a `nil` check is not performed on the mailBox parameter because it is not an optional.  It must exist.  The `mail` property is checked for a `nil` value because it is an optional. 

## Swift and optionals

Now that we know what optionals are and why we would use them, let's look at how Swift uses optionals. 

### Forced Unwrapping

Think of an optional as a wrapper around a type.  We have to unwrap the type from the optional to use it. For example, unwrapping Mail from Optional Mail.  Forced unwrapping means retrieving the value without checking for `nil` .  Adding the `!` symbol to the end of a value forcibly unwraps it. 

In the `checkMail` function above, `mailBox.mail!` forcibly unwraps the Optional Mail type to the Mail type. The `from` field can then be used. Since the `from` field is not an optional, it cannot be `nil`. Therefore, the `trimmingCharacters` function is safe to use.

Forced unwrapping can be dangerous because it does not check for `nil` values. The `checkMail` function above performs a `nil` check (`mailBox.mail != nil`) before using the `mail` property.  So, it is safe to force unwrap it. However, if the code did not and `mail` was `nil`, the `mailBox.mail!.from` code would cause a crash.

### Implicitly unwrapped optionals

In some cases, it may be certain an optional will never be `nil` after initialization.  Having to check and unwrap this value each time can be cumbersome. Implicitly unwrapping such an optional makes it easier to work with.  Placing a `!` after the type creates an implicitly unwrapped optional.  It has the form:

```swift

let name: Type! 
```

In the example below, `myMailBox` has a Mail item. Assigning `myMailImplicitlyUnwrapped` to `myMailBox.mail` makes `myMailImplicitlyUnwrapped` an optional.  But, we know it will never be `nil`.  Having to unwrap it every time would be annoying.  Declaring `myMailImplicitlyUnwrapped` as an implicitly unwrapped optional makes it like a non-optional value. Although, it is still an optional behind the scenes.  A `!` or `?` is not needed to access the value throughout the code.

```swift
let myMailBox = MailBox()
myMailBox.mail = Mail(to: "Alice", from: "Bob")

let myMailImplicitlyUnwrapped: Mail! = myMailBox.mail

print(myMailImplicitlyUnwrapped.to) // the ! is not needed
print(myMailImplicitlyUnwrapped.from)

```

In contrast, the example below uses the `!` each time the `myMailOptional` is used.

```swift
let myMailBox = MailBox()
myMailBox.mail = Mail(to: "Alice", from: "Bob")

let myMailOptional: Mail? = myMailBox.mail

print(myMailOptional!.from) // The ! is needed each time the value is used.
print(myMailOptional!.to)
```

### Dangers of using !

Using `!` is risky. If the optional is `nil`, using its value can lead to the program crashing!
However, there are some use cases for using `!`:
- Convenience
- Compatibility when working with Objective-C platforms
- Fail Fast. For example, if a resource is missing then fail immediately rather than continuing. 

The best practice is to avoid them whenever possible.


### Optional binding 

Optional binding is an alternative to using a `nil` check.   It checks if an optional has a non-nil value and assigns that value to a temporary constant or variable. That temporary constant/variable's scope is within the if/while block. Optional binding has the form:

```swift
if let temp = optional {
    //temp is only available within this code block
    //code to execute
}
//temp is not available here.
```

Below, the `checkMail` function is rewritten to use optional binding:

```swift
import Foundation
func checkMail(mailBox: MailBox) {
    if let mail = mailBox.mail {
        print("Mail from: \(mail.from.trimmingCharacters(in: .whitespacesAndNewlines))")
    }
}
```

If the `mailBox.mail` value is not `nil` then its value is assigned to the temporary `mail` constant.  The constant's scope is only available within the if block. The `!` is not needed within the if block because mail's type is Mail, not optional Mail. If the `mailBox.mail` value was `nil` then the if block is not executed.


### Optional Chaining

Optional chaining allows access to optionals within other structures. It provides a safe way of accessing optionals which may contain a `nil` valued. To use optional binding, place a `?` symbol after the value.  This is like using the `!` symbol when force unwrapping a value.  But, optional chaining will not crash a program on a `nil` value.

Looking at the `checkMail` function again, it can be rewritten using optional chaining:

```swift
import Foundation
func checkMail(mailBox: MailBox) {
    if let from = mailBox.mail?.from {
        print("Mail from: \(from.trimmingCharacters(in: .whitespacesAndNewlines))")
    }
}
```

Here, I have modified the optional binding part to retrieve the `from` property from the `Mail` class. Optional chaining provides a fail-safe way of accessing the optional Mail type. If `mail` exists then Swift will get the value of the `from` property. Since `mail` may be `nil`, then the result of accessing `mailBox.mail?.from` will return a `String?` rather than a `String`.  Optional binding is then used to get the `from` value.

Optional chaining will make a non-optional value an optional.  But, this process does not wrap optionals again. For example, a `String?` will not become a `String??` through optional chaining.  

I've modified the `Mail` class to include a `stamp` property with a type of `Float?`. (Junk mail flyers do not have stamps). In this example,  I've rounded the stamp value (for some contrived reason for this example):

```swift
class Mail {
    let to: String
    let from: String
    var stamp: Float?
    
    init(to: String, from: String) {
        self.to = to
        self.from = from
    }
    

}


let mailBox = MailBox()
mailBox.mail = Mail(to: "Alice", from: "Bob")

let rounded = mailBox.mail?.stamp?.rounded()

```

Some notes about this code:
- access to the `stamp` property is by `mailBox.mail?.stamp?.rounded()` and NOT `mailBox.mail?.stamp??.rounded()`  
- the `rounded()` function returns a Float. But, the return value will be `Float?` because of the optional chaining. So, the `rounded` constant is an optional!

All of my examples used properties. But, optional chaining applies to methods and subscripts too.


### Nil coalescing

Nil coalescing unwraps an optional and return its value or a default value in the case of `nil`.  The nil coalescing symbol is `??` and has the form:

```swift
optional ?? defaultValue
```

Below is an example using nil coalescing with the `stamp` property. 

```swift
let stampAmount = mailBox.mail?.stamp ?? 0.0
```

Here, `stampAmount` will be either the value of `stamp` or the default value, 0.0.  Its type is `Float`.


### map and flatmap

The Optional Type implements the  `map` and `flatmap` functions. One use of these functions is as an alternative to `nil` checks.  

For example, suppose we have an `openMail` function.  This function takes a `Mail` parameter and returns the contents of it as a `String`.  Note that the `Mail` parameter is a non-optional type. For this example, I've hardcoded the function to return a `String`. Please imagine that a real implementation would actually do something.

```swift
func openMail(_ mail: Mail) -> String {
    //do processing
    return "mail contents"
}
```

To use this function we might write code like the following:

```swift
if let mail = mailBox.mail {
    let content = openMail(mail)
    //do stuff with content
    print(content)
}
```
Here, optional binding gets the non-nil value of the mail property.  That value is then passed to the `openMail` function.  This code can be rewritten using the `map` function. 

The map function allows us to use an optional with a function that has a non-optional parameter. Map unwraps the optional and, if the value is not `nil`, passes that value to the function. Example:

```swift
if let mailContent = mailBox.mail.map(openMail) {
    //do stuff with mailContent
    print(mailContent)
}
```

This code is a little bit more concise.  But what is wrong with the `nil` check? Well, suppose we changed the `openMail` function to return a `String?`:

```swift
func openMail(_ mail: Mail) -> String? {
    //do processing
    let contents: String? = "mail contents"
    return contents
}
```

We could write code like the following. 
```swift
if let mail = mailBox.mail {
    if let openMail = openMail(mail) {
        print(openMail)
    }
}

```

Now the code has nested if blocks.  This structure can be hard to maintain and can be bug-prone.  Rewriting with flatMap gets rid of the nested if statements.

```swift
if let mailContent = mailBox.mail.flatMap(openMail) {
    print(mailContent)
}

```


### More on the optional type

Behind the scenes, the optional type is an enumeration with two values, `none` and `some<Wrapped>`.  

Swift is open sourced, so we can look at the code on [GitHub](https://github.com/). The following is from the [Optional.swift](https://github.com/apple/swift/blob/28b471c135af9401942697928702a5adb1b26960/stdlib/public/core/Optional.swift#L122-L134) file:


```swift
public enum Optional<Wrapped> : ExpressibleByNilLiteral {
  // The compiler has special knowledge of Optional<Wrapped>, including the fact
  // that it is an `enum` with cases named `none` and `some`.

  /// The absence of a value.
  ///
  /// In code, the absence of a value is typically written using the `nil`
  /// literal rather than the explicit `.none` enumeration case.
  case none

  /// The presence of a value, stored as `Wrapped`.
  case some(Wrapped)

```

It is possible to use the enumeration form of an optional.  But, it is a verbose style of coding as demonstrated below:

```swift
let number: Optional<Int> = .some(5)
let empty: Optional<Int> = .none

switch number {
case .some(let n):
    //n is of type Int, it is the unwrapped value of the number optional
    var z = n * 7
case .none:
    print("none")
}
```

The `?` operator is syntatical sugar for accessing optionals.  The following are equivalent:

```swift
let number: Optional<Int> = .some(5)
let empty: Optional<Int> = .none

let sugarNumber: Int? = 5
let sugarEmpty: Int?
```

## Summary

In summary:

* Optionals provide safety for programmers by eliminating null pointer type errors.  
* Swift provides both safe and unsafe ways to access an optional's value.  
    * Optional binding provides a safe and convenient method to work with an optional. 
    * Optional chaining safely unwraps an optional using the `?` operator.   
    * Forced unwrapping uses the `!` operator.  It does not provide any safety as a `nil` value can cause the program to crash.  
    * An implicitly unwrapped optional is an optional but used like a non-optional type. It is a convenience style used when the value will never be `nil` after initialization. 
* Nil coalescing unwraps an optional and return its value or a default value in the case of `nil`.
* `map` and `flatmap` functions provide a way to transform the optional's value. 
* Behind the scenes an optional is an enum with two cases `none` and `some<Wrapped>`.   

Thank you for reading! Please let me know if anything is wrong in this post, as I am still learning Swift.

## References

* [Swift Language Guide: The Basics: Optionals](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID309)
* [Swift Language Reference: Optional Type](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/optional-type)
* [Apple Documentation: Optional](https://developer.apple.com/documentation/swift/optional)
* [Mastering Swift 4 - Fourth Edition](https://www.packtpub.com/application-development/mastering-swift-4-fourth-edition)
* [The Complete Guide to Understanding Swift Optionals](http://matteomanferdini.com/complete-guide-to-swift-optionals/)
* [Java 8 In Action](https://www.manning.com/books/java-8-in-action)
* [Total programming in Swift](https://medium.com/@andre_videla/total-programming-in-swift-526508c12a74)
* [GitHub: Optional.swift](https://github.com/apple/swift/blob/master/stdlib/public/core/Optional.swift)


