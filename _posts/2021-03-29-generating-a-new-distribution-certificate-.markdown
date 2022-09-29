---
title: Generating A New Apple Distribution Certificate 
layout: post
category: xcode
desc: How to generate A New Apple Distribution Certificate 
redirect_from:
  - /blog/swift/generating-a-new-distribution-certificate/
excerpt_separator: <!--more-->
---

This post is a note to my future self about generating Apple Distribution Certificates. I received an email stating:

> Your Distribution Certificate will no longer be valid in 30 days. To generate a new certificate, sign in and visit [Certificates, Identifiers & Profiles](https://developer.apple.com/account).

<!--more-->

After signing in, the Certificates, Identifiers & Profiles page will list two certificates:
1. Apple Distribution certificate
	* Used to distribute apps to TestFlight and the App Store. 
	* An expired certificate does not affect my apps on the App Store. However, I cannot update my apps or upload new apps with the expired certificate. 
1. Apple Development certificate
	* Used to run apps on devices and use app services.  
	* It will have my computer's name appended to the certificate name.

To generate a new certificate I followed the [steps from this StackOverflow answer](https://stackoverflow.com/a/59850970/4704303):

> * Open Xcode
> * Open Xcode Preferences (Xcode->Preferences or Cmd-,)
> * Click on Accounts
> * At the left, click on your developer ID
> * At the bottom right, click on Manage Certificates...
> * In the lower left corner, click the arrow to the right of the + (plus)
> * Select Apple Distribution from the menu


I also revoked the old certificate on the [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/certificates/list) page. I did this by clicking on the distribution certificate and then clicking the revoke button.

XCode manages my provisioning profile, so I did not need to manually update it.

References:
* [https://stackoverflow.com/a/59850970/4704303](https://stackoverflow.com/a/59850970/4704303)
* [https://developer.apple.com/support/certificates/](https://developer.apple.com/support/certificates/)
* [https://help.apple.com/xcode/mac/current/#/dev3a05256b8](https://help.apple.com/xcode/mac/current/#/dev3a05256b8)
