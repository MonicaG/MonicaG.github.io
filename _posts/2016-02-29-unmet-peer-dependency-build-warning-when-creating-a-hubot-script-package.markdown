---
title: unmet peer dependency build warning when creating a hubot script package
layout: post
category: bots
desc: Solving UNMET PEER DEPENDENCY warnings when doing npm installs
---

I created a [script package for hubot](https://hubot.github.com/docs/scripting/#creating-a-script-package) and followed the [developer guide for publishing a package](https://docs.npmjs.com/misc/developers#before-publishing-make-sure-your-package-installs-and-works).  I received an unmet peer dependency build warning when I did the install.  This post describes what I did to resolve the warning.

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

I solved this by using the following:

{% highlight bash %}
npm install -g hubot .
{% endhighlight %}


Why did this happen?
I am using npm version 3.7.5. As of version 3, npm will no longer install a peer dependency for you.  If the peer dependecy does not exist on your machine, then you must install it.  So, intalling hubot, which my package has a peer dependency on, fixed the issue.  When doing a peer dependency install you will also need to do the install of the packages as a one liner, rather than installing them seperately.  

For reference see:

* [https://docs.npmjs.com/files/package.json#peerdependencies](https://docs.npmjs.com/files/package.json#peerdependencies)
* [https://github.com/npm/npm/issues/6565#issuecomment-74971689](https://github.com/npm/npm/issues/6565#issuecomment-74971689)
* [https://github.com/yeoman/generator-angular/issues/1192](https://github.com/yeoman/generator-angular/issues/1192)