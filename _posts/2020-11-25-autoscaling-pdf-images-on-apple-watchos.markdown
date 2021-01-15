---
title: Autoscaling PDF Images On Apple watchOS
layout: post
category: swift
desc: How to add autoscaling PDF images for a watchOS project
excerpt_separator: <!--more-->
---

In this post, I will discuss autoscaling PDF images and how to add one to a watchOS project.  

The PDF format allows an image to scale without looking fuzzy at different sizes. This format is best used with vector artwork; think icons. Programs like [Inkscape](https://inkscape.org/), [Adobe Illustrator](https://www.adobe.com/products/illustrator.html) and, [Vectornator](https://www.vectornator.io/) can export PDF images.


For more details on designing a PDF image see the [Image Optimization](https://developer.apple.com/design/human-interface-guidelines/watchos/visual/image-optimization/autoscaling-pdf-images) page in the [Human Interface Guidelines for watchOS](https://developer.apple.com/design/human-interface-guidelines/watchos/overview/getting-started/). It includes the scales used for the different screen sizes.

Setting certain flags in XCode will tell WatchKit to scale the image based on screen size. And so, you have an autoscaling PDF image. This means the project only needs one image for all screen sizes. Otherwise, the project would need multiple scaled image files.

<!--more-->

Once you have a PDF image, add it to the Asset Catalog in an XCode project.  

In an XCode project:

* Go to Assets.xcassets
* Right-click anywhere in the Asset Catalog Editor (the white area). This will bring up a pop-up menu.
* Choose Image Set. This will create an empty Image Set. 


<img src="/images/autoscalingPDFImage/createImageSet.png" class="img-fluid mx-auto d-block" alt="Image showing Assets.xcassets pop-up menu">


The next step is to change some settings in the Attribute Inspector. If the Inspectors editor is not displayed, open it using the button in the top right corner of XCode.
<img src="/images/autoscalingPDFImage/inspectorToggle.png" class="img-fluid mx-auto d-block" alt="Image showing the inspector toggle.">


Next, mark the image for use on an Apple Watch. In the 'Devices' section of the Attribute Inspector:
* uncheck the 'Universal' option
* check the 'Apple Watch' option
* This will result in one 2x square for the Apple Watch.  

<img src="/images/autoscalingPDFImage/appleWatchImageSet.png" class="img-fluid mx-auto d-block" alt="Image showing the settings for an Apple Watch Image Set">

Now add the pdf image to XCode. I'm using this [happy face image](/images/autoscalingPDFImage/happy.pdf).

* Drag and drop the image onto the 2x Apple Watch Square.
* Give the Image Set a name in the Attribute Inspector. I chose 'Happy'.

<img src="/images/autoscalingPDFImage/happyImageAdded2.png" class="img-fluid mx-auto d-block" alt="Image showing the happy face pdf image added to Image Set">


Next set the scaling options in the Attribute Inspector:
* Set the 'Scales' option to 'Single Scale'

<img src="/images/autoscalingPDFImage/singleScale.png" class="img-fluid mx-auto d-block" alt="Image showing the scaling options">

* Further down the menu, in the 'Apple Watch' section, change 'Auto Scaling' to 'Automatic'

<img src="/images/autoscalingPDFImage/autoScale.png" class="img-fluid mx-auto d-block" width="524" height="160" alt="Image showing the Apple Watch options">

Now, the image will scale based on the Apple Watch's screen size!

An aside about the ‘Preserve Vector Data’ box in the Attribute Inspector. This appears to be for iOS apps and not watchOS apps. Checking the box means the vector data is included with an iOS app. This will allow the  image to scale automatically. The option is discussed in the [What's New in Cocoa Touch](https://developer.apple.com/videos/play/wwdc2017/201/?time=2034) video around the 33:50 mark.

I experimented with both checking and unchecking  the box. It did not seem to make a difference for a watchOS project. I created a [StackOverflow Question](https://stackoverflow.com/q/64668198/4704303) about it, but as of this writing, it has not received a response.  I have left the ‘Preserve Vector Data' box unchecked.


Below is code demonstrating the use of the autoscaling PDF image. The result shown is from the preview canvas for 44mm and 38mm screens.

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
      VStack {
          Image("Happy")
          Text("Hello, World!")
            .padding()
        }
    }
  }

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
      return Group {
        ContentView()
        .previewDevice("Apple Watch Series 6 - 44mm")
        ContentView()
          .previewDevice("Apple Watch Series 3 - 38mm")
      }
    }
}

```

<img src="/images/autoscalingPDFImage/scaledImages2.png" class="img-fluid mx-auto d-block" alt="Image showing the scaled Happy Face Image in the Preview Canvas on a 44mm and a 38mm screens.">



