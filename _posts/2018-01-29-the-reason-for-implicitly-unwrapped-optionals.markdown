---
title: The reason for implicitly unwrapped optionals
layout: post
category: swift
description: Where and why are implicitly unwrapped optionals used? 
---

In a [previous post](/blog/swift/optionals/), I wrote about implicitly unwrapped optionals.  However, I was not happy with the example I created; it felt contrived. The following is the example I used:

```swift
let myMailBox = MailBox()
myMailBox.mail = Mail(to: "Alice", from: "Bob")

let myMailImplicitlyUnwrapped: Mail! = myMailBox.mail

print(myMailImplicitlyUnwrapped.to) // the ! is not needed
print(myMailImplicitlyUnwrapped.from)
```

This code did not seem realistic. It left me with several questions. When would I create code like this? In what scenario would I create the <code>myMailImplicitlyUnwrapped</code> constant? Why wouldn’t I assign <code>Mail(to: "Alice", from: "Bob")</code> to the constant instead. Example:

```swift
let myMail: Mail =  Mail(to: "Alice", from: "Bob") 
print(myMail.to) 
print(myMail.from)
```

I wanted to understand more about implicitly unwrapped optionals. Where are they used and what is their purpose?


After some research I found two use case scenarios:
* declaring an <code>@IBOutlet</code>
* avoiding <em>reference cycles</em>

In both cases, their purpose is to create simpler code.

## @IBOutlet

Declaring an <code>@IBOutlet</code> appears to be the main use case.  From [Start Developing iOS Apps (Swift)](https://developer.apple.com/library/content/referencelibrary/GettingStarted/DevelopiOSAppsSwift/ConnectTheUIToCode.html):

> When a view controller is loaded from a storyboard, the system instantiates the view hierarchy and assigns the appropriate values to all the view controller’s outlets. By the time the view controller’s viewDidLoad() method is called, the system has assigned valid values to all of the controller’s outlets, and you can safely access their contents.

Since the outlet will be set after initialization we want to use it as a non-optional property. If the outlet were an optional, then any code using it would first need to unwrap it. Declaring the outlet as an implicitly unwrapped optional means any calling code can access it directly. This leads to simpler code.

## Avoiding reference cycles

A reference cycle is when two classes contain references to each other.  A memory leak can occur if the classes contain [strong references](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html#//apple_ref/doc/uid/TP40014097-CH20-ID51) to each other.  The leak occurs because ARC is unable to remove the classes from memory, even when they are no longer in use.  This is because each class has a property that references the other class.  

There are several ways to create reference cycles and each has their own solution.  One scenario to consider is where neither property can be `nil` after initialization. The [Swift documentation](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html) describes the situation:


> However, there is a third scenario, in which both properties should always have a value, and neither property should ever be nil once initialization is complete. In this scenario, it’s useful to combine an unowned property on one class with an implicitly unwrapped optional property on the other class.
>
> This enables both properties to be accessed directly (without optional unwrapping) once initialization is complete, while still avoiding a reference cycle. 

Example from Apple's documentation:

```swift
class Country {
    let name: String
    var capitalCity: City!
    init(name: String, capitalName: String) {
        self.name = name
        self.capitalCity = City(name: capitalName, country: self)
    }
}
 
class City {
    let name: String
    unowned let country: Country
    init(name: String, country: Country) {
        self.name = name
        self.country = country
    }
}

```

Declaring `capitalCity` as an implicitly unwrapped optional means it is initially `nil`. The `nil` value allows the `Country` class to initialize and pass `self` to the `City` initializer. After `Country` and `City` are initialized, `capitalCity` will have a non-`nil` value. Now, any code using `capitalCity` can access it directly.  If `capitalCity` were an optional, it would need to be unwrapped when used. But as an implicitly unwrapped optional, this is not needed. So, again the implicitly unwrapped optional makes the code simpler to work with.

Thank you for reading! If I missed a case for implicitly unwrapped optionals, please let me know!

## References
- [Why create “Implicitly Unwrapped Optionals”?](https://stackoverflow.com/questions/24006975/why-create-implicitly-unwrapped-optionals)
- [Start Developing iOS Apps (Swift) Section "Create Outlets for UI Elements", point #10](https://developer.apple.com/library/content/referencelibrary/GettingStarted/DevelopiOSAppsSwift/ConnectTheUIToCode.html)
- [Unowned References and Implicitly Unwrapped Optional Properties section in The Swift Programming Language (Swift 4) Guide](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html)

