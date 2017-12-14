---
title: Thoughts on receiving my first pull request
layout: post
description: I received my first pull request.  These are my thoughts and reflections on the process.
category: programming
---

Last week I received my first pull request to a project on GitHub.  This post is about my thoughts on the experience.

The pull request was for [hubot-lmgtfy](https://github.com/MonicaG/hubot-lmgtfy); a [hubot](https://hubot.github.com/) [script](https://hubot.github.com/docs/scripting/). I wrote the script around 2 years ago, while I was contributing to the [Mozilla Web QA](https://quality.mozilla.org/teams/web-qa/) team. I published it to [GitHub](https://github.com/) and [npm](https://www.npmjs.com/package/hubot-lmgtfy) at the time. I have not touched it since then and have not kept track of its stats on npm. 

So, my first reaction was one of surprise. It is a rather silly script, so I did not expect anyone used it. Next, I felt happy that someone out there uses it and wants it updated for hubot version 3. My next thought was ‘oh-no!’. I need to review changes to code I have not looked at in a long time. Plus I have not worked with hubot/coffeescript/javascript since then.

Fortunately, I blogged at the time about hubot and scripting. I also had a unit test as well. So, I was able to refresh my knowledge quickly. It took about a week from the initial submission of the pull request to when I had the new version published on npm.  The week was not total time worked on it though.  The total time was a few hours spread over the week.

Some thoughts on the process:


* Contributing to open source leads to opportunities I would not have otherwise. In this case, it started with contributing to the Mozilla WebQA team.  I had the opportunity to work with hubot. That event led to this first pull request.  These may be small projects; but, the topics were new to me and were a good experience.

* I was glad I blogged about my work as it made catching up easier. Things have changed since I first wrote the blog posts, but it gave me a place to start from. I sometimes wonder if it is worthwhile blogging while I code as it does slow me down. I am not a fast writer, so it takes me several hours to put a blog post together. In this case, it definitely helped me. 

* Publishing blogs/projects/stackoverflow question&answers will lead to interactions years into the future. As another example, I have an answer on stackoverflow from 2015 that gets an upvote about once a quarter.  It is fun to see that my work has helped other people, even if it is in a minor way. 

* [Squashing commits](https://help.github.com/articles/about-pull-request-merges/) is easy to do on GitHub via the merge button on pull requests!

* I have since added a [contributing](https://github.com/MonicaG/hubot-lmgtfy/blob/master/CONTRIBUTING.md) file to the repository. It is not a large file. It points out the unit test and asks for unit tests for new functionality.  

My first pull request was a good experience! I will continue to publish code and articles. They may be small projects and thoughts, but they give me opportunities to learn new things.
