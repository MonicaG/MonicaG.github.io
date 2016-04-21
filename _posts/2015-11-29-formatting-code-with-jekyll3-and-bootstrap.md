---
layout: post
title: formatting code with jekyll 3 and bootstrap
category: webdev
desc: How to format code snippets using Bootstrap and Jekyll version 3.
---

The release of [Jekyll](http://jekyllrb.com) version 3 changed the default syntax highlighter from [Pygments](http://pygments.org) to [Rouge](http://rouge.jneen.net/). In a [previous blog entry](/blog/webdev/formatting-code-with-pygments-and-jekyll/) I described how I formatted code snippets for this blog which uses [Jekyll](http://jekyllrb.com) version 2, [Pygments](http://pygments.org) and [Bootstrap](http://getbootstrap.com/). That code does not work with the new version of [Jekyll](http://jekyllrb.com).  This blog post will describe what I did to format code snippets when using [Jekyll](http://jekyllrb.com) version 3 and [Bootstrap](http://getbootstrap.com/) version 3. 

[Jekyll](http://jekyllrb.com) now wraps code snippets in a <code>figure</code> HTML tag. If linenumbers are used, a table is generated with the following (simplified) structure:

{% highlight html %}
<figure class="highlight">
 <pre>
  <code class="language-xxx" data-lang="xxx">
   <table style="border-spacing: 0">
    <tbody>
     <tr>
      <td class="gutter gl" style="text-align: right"><pre class="lineno">1 ...snipped numbers...</pre></td>
      <td class="code"><pre>...snipped code...</pre></td>
     </tr>
    </tbody>
   </table>
  </code>
 </pre>
</figure>


{% endhighlight %}

I did the following to format code blocks:

1. Created a stylesheet for syntax hightlighting. I used the [github syntax stylesheet](https://github.com/mojombo/tpw/blob/master/css/syntax.css)
1. Added the following to the stylesheet

{% highlight css %}
.highlight .lineno { border: none; border-radius: 0; border-right: solid 1px; color: #aaa; }
.highlight .code pre { border: none; white-space: pre; overflow-x: auto; word-wrap: normal; }
.highlight code { display: block; white-space: pre; overflow-x: auto; word-wrap: normal; }
{% endhighlight %}

The good news is, this code is much simpler than what I used for formatting the code snippets with [Jekyll](http://jekyllrb.com) version 2 and [Bootstrap](http://getbootstrap.com/)! Unfortunately, it is not yet available with [Github Pages](https://pages.github.com/).  Hopefully, it will be soon!

You can see the full CSS file on Github:
[syntax.css](https://gist.github.com/MonicaG/3308cc1a383b7b47d45d)

If you have any questions or suggestions on how I can improve this code, please let me know!







