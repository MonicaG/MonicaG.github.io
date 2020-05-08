---
title: How I debugged a crashing watchOS app with crash reports and log files
layout: post
category: swift
desc: How I debugged my watchOS app using crash reports and log files.
---

In a [previous blog post]({% post_url 2020-05-03-Rejection, Acceptance, And Crashes. My TestFlight Journey %}), I wrote about my app crashing when it was installed via TestFlight.  In this blog post, I will go into more detail about how I debugged the problem using logs and crash reports.

First, a quick recap of the problem.  I wrote a stand-alone watchOS app.  The app worked when installed via Xcode to my Apple Watch.  However, it crashed when installed via TestFlight.  This happened on both my and my husband’s watches. 

My first step was to get the logs.  In my case, there were two log files I wanted to look at.  One was the log messages my app created using the [unified logging system](https://developer.apple.com/documentation/os/logging).  The other was the crash report.

I installed [sysdiagnose](https://developer.apple.com/bug-reporting/profiles-and-logs/?platform=watchos&name=sysdiagnose) on my watch to see the unified logging messages. I followed [these instructions](https://download.developer.apple.com/iOS/watchOS_Logs/sysdiagnose_Logging_Instructions.pdf) (you will need to be logged into your apple developer account to view these instructions) to create a `co-sysdiagnose` file and copy it to my computer.  The co-sysdiagnose tar file contains two tar.gz files, one for the iPhone and one for the watch. The watch file will have a name like:

 
 ```
 sysdiagnose_YEAR.MONTH.DAY_HH-MM-SS-xxxx_Watch-OS_Watch_watchOSBuildNumber.tar
 ```

  

 For example: 
 
 ```
  sysdiagnose_2020.04.30_09-06-08-0700_Watch-OS_Watch_17T530.tar.gz
 ```
 

The [extracted archive](https://www.howtogeek.com/362203/what-is-a-tar.gz-file-and-how-do-i-open-it/) contains many files and directories.  The file that contains the log messages is `system_logs.logarchive` located at:

```
sysdiagnose_YEAR.MONTH.DAY_HH-MM-SS-xxxx_Watch-OS_Watch_watchOSBuildNumber/system_logs.logarchive
```

 This file can be opened in the Console app (located on your computer in Applications -> Utilities).  

All info and debug messages will be shown automatically.  Usually, when using the Console app you would need to select these options under the Action menu. There were a lot of log messages displayed. These are from various systems on the Apple Watch. To filter the log messages so I could see just mine, I entered the [subsystem](https://developer.apple.com/documentation/os/logging/logging_a_message) my log messages used.

The crash report is also located in the extracted archive at:

 ```
 sysdiagnose_YEAR.MONTH.DAY_HH-MM-SS-xxxx_Watch-OS_Watch_watchOSBuildNumber/crashes_and_spins/app_name.ips.beta
 ```

Crash reports are also available when an app is distributed through TestFlight.  This is not the case when an app is released on the App Store. In that case, the user needs to opt in to sending crash reports and statistics to the developer.  To download a crash report go to Xcode -> Windows -> Organizer and click on the crashes tab. However, [it can take up to a day for the reports to be available.](https://help.apple.com/xcode/mac/current/#/dev861f46ea8)

Crash reports can also be copied from the device to your computer.  On the iPhone go to the Settings app -> Privacy -> Analytics & Improvements -> Analytics Data to see the files.

It can take a while for the files to sync from the watch to the phone.  If the crash report is not on the phone, then it is likely still on the watch.  Go to the Watch app on the iPhone and then General -> Diagnostic Logs to see the crash report.

In both locations, the crash report can be shared via the standard share icon.  I use AirDrop to transfer files to my computer.

Regardless of how the crash report was obtained, the debug symbols need to be downloaded.  In Xcode go to Window -> Organizer and click on the “Download Debug Symbols” button. It is on the right-hand side of the screen for each archive. Note: This is dependant upon the symbols having been submitted when uploading the app's archive to TestFlight. This is done by checking the "Upload your app's symbols to receive symbolication reports from Apple" option when submitting the Archive.

The debug symbols translate the hexadecimal
addresses of the thread backtraces into function names and line numbers.  This makes the crash report readable by humans.

Opening the crash report takes a few steps:
1. Rename the file to have a .crash extension. `app_name.ips.beta -> app_name.ips.beta.crash’
2.  Go to Window -> Devices and Simulators
3. Select the connected device and then click on the View Device Logs button. (The iPhone will need to be attached to the computer either by USB cable or [have wireless enabled](https://help.apple.com/xcode/mac/11.0/index.html?localePath=en.lproj#/devbc48d1bad))
4. Drag the `app_name.ips.beta.crash’ into the list of log files
5. See [Adding Identifiable Symbol Names to a Crash Report](https://developer.apple.com/documentation/xcode/diagnosing_issues_using_crash_reports_and_device_logs/adding_identifiable_symbol_names_to_a_crash_report) for more details.

I looked at the crash report and saw the app crashed when it decoded the contents of a plist file.  The log messages from my app showed the same thing.  The app logged it was about to decode the file and then no further messages.

Here is an excerpt of the relevant part of the crash report:

```
Exception Type:  EXC_BAD_ACCESS (SIGSEGV)
Exception Subtype: KERN_INVALID_ADDRESS at 0x00000000
VM Region Info: 0 is not in any region.  Bytes before following region: 3686400
      REGION TYPE              START - END     [ VSIZE] PRT/MAX SHRMOD  REGION DETAIL
      UNUSED SPACE AT START
--->  
      __TEXT                 00384000-0039c000 [   96K] r-x/r-x SM=COW  ...Kit Extension

Termination Signal: Segmentation fault: 11
Termination Reason: Namespace SIGNAL, Code 0xb
Terminating Process: exc handler [384]
Triggered by Thread:  0


Thread 0 name:  Dispatch queue: com.apple.main-thread
Thread 0 Crashed:
0   libswiftCore.dylib              0x659e0e06 swift_checkMetadataState + 14
1   libswiftCore.dylib              0x659b66a8 type metadata completion function for ClosedRange<>.Index + 14
2   libswiftCore.dylib              0x659dc504 swift_getGenericMetadata + 1112
3   libswiftCore.dylib              0x659b5644 __swift_instantiateGenericMetadata + 28
4   libswiftFoundation.dylib        0x65b80fb0 PropertyListDecoder.decode<A>+ 651184 (_:from:format:) + 310
5   libswiftFoundation.dylib        0x65b80e72 PropertyListDecoder.decode<A>+ 650866 (_:from:) + 40
6   libswiftFoundation.dylib        0x65bf9b2c dispatch thunk of PropertyListDecoder.decode<A>+ 1145644 (_:from:) + 28
7   ...llHelper WatchKit Extension  0x0038ddb6 specialized load<A>(_:) + 40374 (Data.swift:117)

```

The last line, Data.swift: 117 refers to the Data.swift file in my app.  It was crashing at line 117.

The code in question was the following:
```swift
let decoder = PropertyListDecoder()
return try decoder.decode(T.self, from: data) // <-- this is the line it crashed at

```

The [struct](https://docs.swift.org/swift-book/LanguageGuide/ClassesAndStructures.html) the app was trying to decode the plist file into lives in a [Swift Package](https://swift.org/package-manager/). It is in a Swift Package because unit testing is not available in watchOS projects.  However, unit testing is available in Swift Packages. So, my models and business logic are there. 

I wasn’t sure what was causing the error. Maybe it was something with my code; was I using the Codable protocol properly? Maybe the plist file permissions were different between Xcode and TestFlight? Maybe it had something to do with the Swift Package?  

I decided to move my struct from the Swift Package into the app project.  I figured this way I could rule out if the Swift Package was an issue.  If the app still crashed then there was something wrong with my code or file access.  If the app did not crash then there was something wrong with how I was using the Swift Package.

Before I changed or moved any code I created a git branch to work on.  I copied the struct to the app codebase.  I then removed the swift package from the app.  This, of course, caused many build errors.  To get around this I deleted files en masse. This left me with just the code that was causing the error.  

The code still worked in the simulator and on my device, so I uploaded it to TestFlight.  This time the app worked when I installed it from TestFlight.

This meant there was something wrong with how I was using the Swift Package.  I checked my code to ensure I used the proper [access levels](https://docs.swift.org/swift-book/LanguageGuide/AccessControl.html) with my struct. Code in a Swift Package requires a public access level, otherwise, the calling code cannot access it. But, my code was fine.

I was at a loss at this point. I did google searches but had no luck.  I created a [Stack Overflow question](https://stackoverflow.com/questions/61529502/swift-propertylistdecoder-not-working-on-type-from-swift-package). The process of writing down my problem helped clarify my thoughts. With these new ideas, I did more research and found this [Stack Overflow answer](https://stackoverflow.com/questions/58801669/testflight-installed-app-crash-with-swift-package-manager-dependencies/58948017#58948017) which solved my problem.  I had to set `DEAD_CODE_STRIPPING = NO` in the build settings of my app.

I delete the struct from the app code and imported the Swift Package again. This time when I installed the app from TestFlight it worked.  At this point, I switched back to my main git branch and changed the build settings.  I uploaded it to TestFlight and everything worked.

I am grateful that people post solutions online. I would never have found the `DEAD_CODE_STRIPPING = NO` workaround on my own.

Thank you for reading! I hope you found it helpful!  If you have some time I would appreciate feedback on my app, [Barbell Helper](https://barbellhelper.com/), available on [TestFlight](https://testflight.apple.com/join/s0jqslOG). Thank you!