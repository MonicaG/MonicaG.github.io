---
title: How to free up disk space for XCode Beta install
layout: post
category: xcode
desc: Extracting XCodeBeta.xip gives the error "not enough disk space available"
redirect_from:
  - /blog/swift/how-to-free-up-disk-space-for-xcode-beta-install/
excerpt_separator: <!--more-->
---

TL;DR - delete Time Machine local snapshots to free up space.

Does anyone else find installing XCode frustrating? I always need more free disk space, especially when installing a beta. This was the case when I downloaded XCode 13 Beta 5 from the Apple Developer Downloads page. When I tried to extract the xip file I got an error stating:

> "The archive XCode_13_beta_5.xip can't be expanded because the current volume doesn't have enough free space."

<!--more-->

I deleted XCode simulators and cache files to free up space with the following steps:

* Go to Apple icon -> About This Mac 
* Click on 'Storage' tab
* Click 'Manage' Button
* In the Developer menu delete:
  * the XCode Cache file
  * old iOS and watchOS Device support files


I also delete unused applications, log files, and music to clear up space. After much pruning, I had over 100GB free. Still, the Archive Utility app complained there was not enough free space!


<blockquote class="twitter-tweet"><p lang="en" dir="ltr">😭😭😭 Why does XCode need so much space?! <a href="https://t.co/cowtceXF3h">pic.twitter.com/cowtceXF3h</a></p>&mdash; Monica Granbois (@mgranbois) <a href="https://twitter.com/mgranbois/status/1435299567583600645?ref_src=twsrc%5Etfw">September 7, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 


 This seemed odd. I tried the solution proposed in this blog post: [Installing Xcode with “not enough disk space available”](https://medium.com/geekculture/installing-xcode-with-not-enough-disk-space-available-b96c8f17115b). It didn't work for me. But I suggest trying it out.

However, the blog post did lead me to check my disk space using the Disk Utility app (Applications -> Utilities -> Disk Utility). It reported I only had ~25GB free when the "About This Mac" storage screen reported I had ~100GB.

 After some googling I found this question on StackExchange: [macOS not showing the actual free space](https://apple.stackexchange.com/q/324440).  The answers said to delete Time Machine local snapshots. I did so, and *boom*, the Disk Utility app reported I had 100GB free. I tried the Archive Utility app again. This time it expanded the xip file and installed XCode Beta! Yay!

The commands I used to list and delete the time machine files were (from [this answer](https://apple.stackexchange.com/a/352511/432763)):

```bash
$ tmutil listlocalsnapshots /
com.apple.TimeMachine.2021-08-20-195949.local
com.apple.TimeMachine.2021-09-08-114353.local

 $ tmutil deletelocalsnapshots 2021-08-20-195949
 $ tmutil listlocalsnapshots /
 com.apple.TimeMachine.2021-09-08-114353.local
 ```

Why is there a discrepancy between the free space reported by the About This Mac and the Disk Utility apps? Because [macOS will automatically delete snapshots when space is needed](https://support.apple.com/en-us/HT204015). So, About This Mac considers the space used by local snapshots as available. Therefore, it reported ~100GB free space. However, the Disk Utility does **not** consider snapshots as free space. The snapshots are using space so Disk Utility reports that space as used. So, it reported there was only ~25GB of free space.

The Archive Utility also does **not** consider the storage used by snapshot as free space. It checks for disk space before extracting the file and, in my case, detected that only ~25GB was free. By deleting the local snapshot, it was able to expand the xip file and install XCode Beta. 

**References:**
* [macOS not showing the actual free space](https://apple.stackexchange.com/q/324440)
* [Installing Xcode with “not enough disk space available”](https://medium.com/geekculture/installing-xcode-with-not-enough-disk-space-available-b96c8f17115b)
* [About Time Machine local snapshots](https://support.apple.com/en-us/HT204015)
* [Disk Utility showing less available space than the Finder in OS X](https://www.cnet.com/tech/computing/disk-utility-showing-less-available-space-than-the-finder-in-os-x/)
