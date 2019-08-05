---
title: iOS Constraint Issues 
layout: post
category: swift
desc: My UISearchController would animate off the top of the screen when it was in a UITableView. This post is how I solved that issue.
---

This post is about a problem I had with a UISearchController in an iOS app. The issue was the search bar would animate on top of the status bar. This made it hard to use as shown in the following video.


<!-- 16:9 aspect ratio -->
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="/media/constraints/wrong_constraints.mp4" type="video/mp4" alt="video of the search box animating over the status bar"></iframe>
</div>


<div></div>
This behaviour occurred because the constraints were not set correctly. The screen in question is a UIViewController that contains a UITableView.  In the head of the UITableView is a UISearchController.  I set the constraints for the UITableView to its superview. In this case, it's the UIViewController's view, which is the entire screen.  Here is what the constraints looked like:

<img src="/media/constraints/wrong_constraints.png" class="img-responsive center-block" alt="image showing the wrong constraints">


What I needed was to constrain the UITableView to the UIViewController's safe area.  The safe area is the area of the screen that is not obscured by other content.  In the image below, the screen on the left shows the view area. Notice it includes the status bar area.  The screen on the right shows the safe area.  Notice the status bar is outside of the safe area. So pinning my constraints to the view meant the search bar would animate over the status bar.  

<img src="/media/constraints/view_and_safe_area.png" class="img-responsive center-block" alt="image showing the view and safe area on an iOS screen">


I changed my constraints to be pinned to the safe area instead.  This means the search bar cannot animate to the top of the screen. Here is what the corrected constraints look like:

<img src="/media/constraints/correct_constraints.png" class="img-responsive center-block" alt="image showing the corrected constraints">

<!-- 16:9 aspect ratio -->
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="/media/constraints/corrected_constraints.mp4" type="video/mp4" alt="video of the search box working as expected"></iframe>
</div> 


An alternative solution is to place the search bar in the navigation bar. I did not use this solution as my screen does not have a navigation bar.  Plus, it allowed me to learn more about constraints!


