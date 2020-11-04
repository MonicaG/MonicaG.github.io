---
title: How I replaced a nested for loop with flatMap
layout: post
category: swift
desc: How I transformed an array of arrays using flatMap instead of nested for loops.
excerpt_separator: <!--more-->
---

This is a short post about how I refactored a nested for loop using flatMap. I had a struct that defined name and quantity properties as shown below: 

```swift
struct Item {
  let name: String
  let quantity: Int
}
```


The actual code used a custom type rather than a String, but I've used String here to simplify the example. 

<!--more-->

I also had an array of Items. However, I wanted to create a new array that contained each Item's name for a count of its quantity. So, given the following: 


```swift
let myList = [
  Item(name: "Apple", quantity: 2),
  Item(name: "Banana", quantity: 1),
  Item(name: "Carrot", quantity: 3),
  Item(name: "Doughnut", quantity: 1)
]
```

I wanted a new String array containing the following:

 
> ["Apple", "Apple", "Banana", "Carrot", "Carrot", "Carrot", "Doughnut"]


My first attempt was using for loops:

```swift
var nameList: [String] = []
for item in myList {
  for _ in 0..<item.quantity {
    nameList.append(item.name)
  }
}

print(nameList)
```

However, I did not like the nested for loops.  It seemed verbose; I wanted to condense the code. Fortunately, Swift provides two things that make this refactoring possible:

1. An Array initializer that takes repeating and count parameters: [Array(repeating:count:)](https://developer.apple.com/documentation/swift/array/1641692-init)
1. The [flatMap](https://developer.apple.com/documentation/swift/array/3126947-flatmap) function

I thought of using [map](https://developer.apple.com/documentation/swift/array/3017522-map), but map would result in an array of arrays. For example:

```swift
let nameListMap = myList.map { Array(repeating: $0.name, count: $0.quantity) }
print(nameListMap)
```


> [["Apple", "Apple"], ["Banana"], ["Carrot", "Carrot", "Carrot"], ["Doughnut"]]


Not what I wanted. Fortunately, there is flatMap. FlatMap works like the map function, but it flattens an array of arrays. Just what I needed! So, the for loop could be replaced with the following:

```swift
let nameList2 = myList.flatMap{Array(repeating: $0.name, count: $0.quantity)}
print(nameList2)
```

> ["Apple", "Apple", "Banana", "Carrot", "Carrot", "Carrot", "Doughnut"]

The above code is doing the following:
1. For each Item in myList a new Array is created. It is populated with the Item's name for a count specified by the Item's quantity.
1. It then joins the arrays, resulting in a single, flat, array


Hurray! 


