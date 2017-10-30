---
title: Formatting Jekyll HTML output&#44; third party JavaScript and the async attribute
layout: post
category: three-things
desc: Three things I learned this week
---

Three things I learned this week were: styling HTML output with Jekyll, checking third party APIs and the <code>async</code> attribute.


## Formatting HTML

[Jekyll Tip: Adding Styling To Html Output](http://digitaldrummerj.me/styling-jekyll-markdown/). This blog post showed me how to include CSS when using Jekyll and Markdown.  I use Bootstrap with my blog and wanted a way to include the <code>.table</code> and <code>.table-striped</code> Bootstrap CSS classes.  My first approach was to use the JQuery [addClass](https://api.jquery.com/addclass/) method. This method worked and I was happy with it.  But, then I found that post which was even easier! 

To add a class use the <code>{:.ClassName}</code> syntax.

Example: 

```
{:.table .table-striped}
|Header 1|Header 2|
|--------|--------|
|data 1  |data 2  |
|data 3  |data 4  |
```


{:.table .table-striped}
|Header 1|Header 2|
|--------|--------|
|data 1  |data 2  |
|data 3  |data 4  |


## Remember to monitor third party JavaScript packages

While using the Chrome Developer Tools during the above investigation, I noticed I had a warning the [MathJax CDN had shut down](https://www.mathjax.org/cdn-shutting-down/).  My posts that used MathJax still rendered properly, as the MathJax CDN was redirecting to Cloudflare.  I had not looked at my third party JavaScript providers in many months. 

When I use my blog, I write posts and do not look at the underlying code. This was a good reminder to myself to look at the code periodically to see if any of it has been deprecated.  I need to investigate if there is a way to automatically detect these types of issues.

## The async attribute

Updating MathJax led me to another discovery this week.  The documentation gave the following example of how to update the CDN:

```
<script type="text/JavaScript" async
  src="https://cdn.mathjax.org/mathjax/2.7-latest/MathJax.js?...">
</script>
```

The <code>async</code> attribute was new to me. I did a little investigation to learn more.  The <code>async</code> attribute tells the browser to download the script and execute it while the page is parsed.  If multiple scripts use the <code>async</code> attribute, then they are downloaded in parallel.  The order the scripts are executed in is not guaranteed. So, if one script depends on another an error could occur if the dependent JavaScript is downloaded first.

After reading [Deep dive into the murky waters of script loading](https://www.html5rocks.com/en/tutorials/speed/script-loading/) and [Async Attribute and Scripts At The Bottom](https://css-tricks.com/async-attribute-scripts-bottom/) I decided to not use the <code>async</code> attribute, as my JavaScript is at the bottom of the page. It seems safe to leave my JavaScript loading as is.

## Final Thoughts

Updating my blog distracted me from Swift this past week.  I look forward to learning more Swift this upcoming week!


