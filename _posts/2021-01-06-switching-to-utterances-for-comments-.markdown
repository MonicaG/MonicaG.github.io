---
title: Switching to Utterances For Comments 
layout: post
category: webdev
desc: Using GitHub issues to add comments to a jekyll blog
---

I removed [disqus](https://disqus.com) as the comments provider on my website because I do not like its privacy policy. I'm trying [utterances](https://utteranc.es/) as the comment provider now. From the website, it's: *A lightweight comments widget built on GitHub issues. Use GitHub issues for blog comments, wiki pages and more!* 


It was easy to install and only required two steps:

1. Install the App into my GitHub repo via [https://github.com/apps/utterances](https://github.com/apps/utterances). 
1. Added the following script to my blog

```js
<script src="https://utteranc.es/client.js"
        repo="MonicaG/MonicaG.github.io"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
```

See [https://utteranc.es/](https://utteranc.es/) for more information on the settings available.