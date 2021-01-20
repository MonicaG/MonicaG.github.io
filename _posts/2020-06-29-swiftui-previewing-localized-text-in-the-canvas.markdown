---
title: SwiftUI&#58; Previewing localized text in the canvas
layout: post
category: swift
desc: How to view localized text in XCode Canvas
---

Last week I watched the [Swift packages: Resources and localization](https://developer.apple.com/videos/play/wwdc2020/10169/) video from [WWDC20](https://developer.apple.com/wwdc20/). One thing I learned was that the Canvas can preview localized values. This is done by adding a locale to a View via the [environment](https://developer.apple.com/documentation/swiftui/environment).

Example:



```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
       Text("greeting")
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView().environment(\.locale, Locale.init(identifier: "fr"))
    }
}

```

The above code assumes that a French `Localizable.strings` file exist with a `greeting` key.  For example:

```
"greeting" = "Bonjour le monde!";
```

The [EnvironmentValues](https://developer.apple.com/documentation/swiftui/environmentvalues) documentation lists all the values that can be set.  

<img src="/images/localization.gif" class="img-fluid mx-auto d-block" alt="Gif showing the Canvas preview switching greeting text between english, french and german.">