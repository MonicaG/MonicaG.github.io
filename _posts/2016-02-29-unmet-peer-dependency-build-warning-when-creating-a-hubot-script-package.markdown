---
title: unmet peer dependency build warning when creating a hubot script package
layout: post
category: bots
desc: Solving UNMET PEER DEPENDENCY warnings when doing npm installs
---

I created a [script package for hubot](https://hubot.github.com/docs/scripting/#creating-a-script-package) and followed the [developer guide for publishing a package](https://docs.npmjs.com/misc/developers#before-publishing-make-sure-your-package-installs-and-works).  I received an unmet peer dependency build warning when I did the install.  This post describes what that is.


The [docs](https://docs.npmjs.com/misc/developers#before-publishing-make-sure-your-package-installs-and-works) state:

> In the root of your package do this:
>
>npm install . -g


Which gave me the following warning message:

{% highlight bash %}
├── UNMET PEER DEPENDENCY hubot@2.x
└── hubot-lmgtfy@0.1.0

npm WARN hubot-lmgtfy@0.1.0 requires a peer of hubot@2.x but none was installed.
{% endhighlight %}

**Why did this happen?**

I am using npm version 3.7.5. As of version 3, npm will no longer install a peer dependency for you. In this case no action is needed and the warning can be ignore.  This is because the package is a plugin to hubot which already has the dependency listed in its package.json file.  Building and running hubot worked as expected with no warning or error messages.

However, if you do want to install the hubot peer dependency you can do so with the following:

{% highlight bash %}
npm install -g hubot .
{% endhighlight %}

Note: when doing a peer dependency install you will need to install the packages as a one liner, with the dependency listed first.  Installing them separately will not work.


For reference see:

* [https://docs.npmjs.com/files/package.json#peerdependencies](https://docs.npmjs.com/files/package.json#peerdependencies)
* [https://github.com/npm/npm/issues/6565#issuecomment-74971689](https://github.com/npm/npm/issues/6565#issuecomment-74971689)
* [https://github.com/yeoman/generator-angular/issues/1192](https://github.com/yeoman/generator-angular/issues/1192)