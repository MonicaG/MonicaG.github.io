---
layout: post
title: Debugging npm - "Error&#58; Cannot find module xxx" 
category: webdev
desc: Things to check when debugging a process that uses npm and it throws the error "Error&#58; Cannot find module"
---

I recently had an issue where a CoffeeScript unit test I had written started throwing "Error: Cannot find module".  Here are the steps I used to resolve the issue.

## TL;DR

Steps to try to resolve the issue:

1. Ensure the module is installed.
1. Clean the cache.
1. Remove the <code>node_modules</code> directory and reinstall.
1. Check the package version number. Is it what you expected? Does a previous version of the package work?

## Detailed steps

1. Ensure the module is installed using the command: <code>npm list package_name</code>.  This will need to be run in the project's directory, which should have a <code>node_modules</code> directory and <code>package.json</code> file in it.
1. Try cleaning the cache by using the command <code>npm cache clean</code>.  Aside: you can see where your cache is located with the command <code>npm config get cache</code>.
1. If that does not resolve the issue, npm may have gotten in a funk so try reinstalling the modules.  In your project directory do the following:
	* <code>rm -rf node_modules</code> - this deletes the <code>node_modules</code> directory and all its content.
	* <code>npm cache clean</code> - deletes the contents of the npm cache directory.
	* <code>npm install</code> - reinstall all the packages for your project from it's <code>package.json</code> file.

1. If that does not resolve the issue, check if the package has recently been updated.  If the versioning in the <code>package.json</code> file uses [version ranges](https://docs.npmjs.com/misc/semver) then a new version of the package may have been pulled recently. Check to see if that new version is actually valid.  Does the process work if you use a previous version?  

The final step is what resolved my issue for me.  I was using [version ranges](https://docs.npmjs.com/misc/semver) in my <code>package.json</code> and had inadvertently obtained a new version of the package, which was broken.  



