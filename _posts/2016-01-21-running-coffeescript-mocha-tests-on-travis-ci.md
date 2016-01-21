---
layout: post
title: Running CoffeeScript Mocha tests on Travis CI
category: webdev
desc: How to run CoffeeScript unit tests that use the Mocha testing framework on Travis CI
---

[Travis CI](https://travis-ci.org/) will run <code>npm test</code> by default, so you will need to add the following to your <code>package.json</code> file:

{% highlight html %}
"scripts": {
    "test": "mocha --compilers coffee:coffee-script/register tests/my_test.coffee"
  }

  "devDependencies": {
    "coffee-script": "^1.10.0"
  }
{% endhighlight %}

Invoking the <code>npm test</code> command will run the <code>test</code> command in the <code>scripts</code> section.  

[Mocha](https://mochajs.org/) does not support CoffeeScript out of the box, so you will need to add the <code>compilers</code> option.  

For CoffeeScript 1.6 and under use:

{% highlight coffeescript %}
 mocha --compilers coffee:coffee-script
{% endhighlight %}

For CoffeeScript 1.7 and above use:

{% highlight coffeescript %}
mocha --compilers coffee:coffee-script/register
{% endhighlight %}

The <code>tests/my_test.coffee</code> is the test file to execute.  You can also set it to use a directory instead (i.e. <code>tests</code> directory in this case).

Now, you just need to setup your <code>.travis.yml</code> file.  I followed the instructions from the [Travis Docs](https://docs.travis-ci.com/user/languages/javascript-with-nodejs) which resulted in the following <code>.travis.yml</code> file:

{% highlight yaml %}
language: node_js
node_js:
 - "stable"
# following is from: https://docs.travis-ci.com/user/languages/javascript-with-nodejs#Node.js-v4-(or-io.js-v3)-compiler-requirements
env:
 - CXX=g++-4.8
addons:
 apt:
   sources:
     - ubuntu-toolchain-r-test
   packages:
     - g++-4.8

{% endhighlight %}


Next, turn the CI button on for your repository on the [Travis CI](https://travis-ci.org/) site and do a <code>git push</code>.  That's it! 
