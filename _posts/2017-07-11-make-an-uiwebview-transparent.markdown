---
title: Make An UIWebView Transparent
layout: post
category: swift
desc: Two ways to make a UIWebView Transparent
---
I've been playing around with iOS. One challenge I came across was how to make a Web View transparent. I found two ways to do this: using the Interface Builder in Xcode or using Swift.

# XCode
In XCode, go to the Attributes Inspector menu for the Web View and:
* select "Clear Color" in the "Background" option
* uncheck the "Opaque" option in the "Drawing" section


<img src="/images/transparent-webview.png" class="img-responsive" alt="Attributes Inspector Menu Options">

# Swift

```swift
webView.isOpaque = false
webView.backgroundColor = UIColor.clear
```

Either way, the Web View will be transparent.


Note: I am using Xcode 8.3.3 and iOS 10.3



