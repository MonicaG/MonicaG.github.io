---
title: generator-hubot unmet peer dependency
layout: post
category: bots
desc: Solving UNMET PEER DEPENDENCY warnings when doing npm installs
---

When I installed generator-hubot I got a warning message that it required a peer of yo@>=1.0.0.  Here is what I did to resolve the warning.

I initially installed generator-hubot using:
{% highlight bash %}
npm install -g generator-hubot
{% endhighlight %}

Which gave me the following warning:

{% highlight bash %}
UNMET PEER DEPENDENCY yo@>=1.0.0
npm WARN generator-hubot@0.3.1 requires a peer of yo@>=1.0.0 but none was installed.
{% endhighlight %}

I fixed this warning by doing the following:
{% highlight bash %}
npm install -g yo generator-hubot
{% endhighlight %}

Why did this happen?
I am using npm version 3.7.5. As of version 3, npm will no longer install a peer dependency for you.  If the peer dependecy does not exist on your machine, then you must install it.  So, intalling yo, which generator-hubot has a peerDependency on, fixed the issue.

For reference see:

* [https://docs.npmjs.com/files/package.json#peerdependencies](https://docs.npmjs.com/files/package.json#peerdependencies)
* [https://github.com/npm/npm/issues/6565#issuecomment-74971689](https://github.com/npm/npm/issues/6565#issuecomment-74971689)