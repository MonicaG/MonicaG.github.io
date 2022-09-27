---
title: Resolving "cannot upload bitcode because bitcode is imbalanced" error when uploading to App Store Connect
layout: post
category: xcode
desc: Fastlane gave the error "cannot upload bitcode because bitcode is imbalanced" when uploading to App Store Connect.
excerpt_separator: <!--more-->
---

I received the following error from [fastlane](https://fastlane.tools/) when uploading to App Store Connect:

>  exportArchive: exportOptionsPlist error for key 'uploadBitcode': cannot upload bitcode because bitcode is imbalanced

This error occurred because, as stated in the [XCode 14 deprecation notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes#Deprecations):

> Starting with Xcode 14, bitcode is no longer required for watchOS and tvOS applications, and the App Store no longer accepts bitcode submissions from Xcode 14.
> 
> Xcode no longer builds bitcode by default and generates a warning message if a project explicitly enables bitcode: “Building with bitcode is deprecated. Please update your project and/or target settings to disable bitcode.” The capability to build with bitcode will be removed in a future Xcode release. IPAs that contain bitcode will have the bitcode stripped before being submitted to the App Store. Debug symbols for past bitcode submissions remain available for download. 
 <!--more-->

My [app](https://barbellhelper.com/) is a watchOS app. So, I had previously enabled bitcode upload in the Fastfile:


```ruby
lane :build do
  build_app(scheme: "MyApp",
            include_bitcode: true)
end
```

I resolved the upload error by removing the <code>include_bitcode</code> parameter:

```ruby
lane :build do
  build_app(scheme: "MyApp")
end
```

Sharing this in case it helps someone else.




