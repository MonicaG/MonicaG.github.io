---
title:  Rejection, Acceptance, And Crashes. My TestFlight Journey
layout: post
category: swift
desc: My story of submitting my app to FlightTest
---


I hit a small milestone recently, I submitted my first app to TestFlight.  I thought this process would be quick.  Maybe a day or two.  A week later I finally had a working app on TestFlight.  During that time I learned much about crash logs and debugging. Here is my story.

I’ve been working on a stand-alone	 Apple Watch app.  It is a weight plate calculator for the gym.  The idea is you enter the amount you want to lift along with the barbell you are using. The app will then tell you which weight plates to use. 

I started this project before the pandemic quarantines.  When the quarantines started I thought about abandoning the project.  Gyms are closed. Who is going to use this app?  But I decided to carry on.  I liked working on it. Plus, one day the gyms will reopen.

So, on the evening of April 22nd, I submitted my app to App Store Connect. Only to be immediately rejected in the upload process because my app icons had an alpha channel in them.  It was bedtime, so I left it for the morning.

The next morning I fixed my icon errors. I did this by opening the icons in the “Preview” app and then exporting them with the “Alpha” option unchecked.  A quick and easy fix. This time the app upload worked.  

Looking through the TestFlight requirements I saw a privacy policy was needed.  I looked at some online policy generators. But these tools were for apps that used user data. My app doesn’t use third-party APIs and it stores everything locally to the device. So, I wrote a very simple privacy policy and uploaded it to my blog website.  It will have a more permanent home later, I just wanted to get the app up on TestFlight.  I submitted my app.

The next morning, April 24th, I received an email from App Store Connect. My app was “not approved for beta testing”.  The reviewers wanted to see a video of my app in action. It had to be a video of the app running on an actual Apple Watch, I could not use the simulator.

On the weekend I found some quiet time to video my app. The kids were quietly watching a cartoon, so I could record without being disturbed. It was a bit awkward videoing my wrist, but I got it done. I uploaded the video to YouTube as an unlisted video and sent the link.  

I heard back from App Store Connect two days later, on Tuesday, April 28th. My app was approved for TestFlight! Hurray!

My husband and I installed it on our watches. The app immediately crashed for both of us.  Cry!

I spent the next two days figuring out why my app crashed when installed from TestFlight.  It worked fine when I installed it via XCode. It was a lot of learning about crash reports, looking at crash reports, and googling. I will write about what I learned in another blog post.

I [posted a question to StackOverflow](https://stackoverflow.com/q/61529502/4704303) about my issue.  This helped me gather my thoughts and clarify my issue.  I had some more ideas, which lead me to this question: [ios - TestFlight installed app crash with Swift Package Manager dependencies - Stack Overflow](https://stackoverflow.com/questions/58801669/testflight-installed-app-crash-with-swift-package-manager-dependencies). It solved my problem!  I had to set the ‘DEAD_CODE_STRIPPING = NO’ property in the building settings.

It was such a good feeling to finally see my app working! I did not expect it to take a week to get my beta test working. But I am happy I solved my issues and got it launched.  

If you are interested in trying out the beta, I would appreciate the feedback! I’ve created a public test link: [Join the Barbell Helper beta - TestFlight - Apple](https://testflight.apple.com/join/s0jqslOG)

Thank you for reading.  Now onto the next step: launch my app!





