---
title: Using Hubot with slack
layout: post
category: bots
desc: How to create a Hubot that uses the slack adapter and deploy it to Heroku
---

I have been playing around with [hubot](https://hubot.github.com/) and [slack](https://slack.com/).  This post describes the steps I used to setup a hubot that uses the [slack adapter](https://github.com/slackhq/hubot-slack).

At a high-level, the following steps are needed to create the bot:

1. Add the hubot app integration to the slack team 
1. Create a hubot 
1. Deploy the hubot

# Add the hubot app integration to the slack team

I added the hubot integration by doing the following:

* In the slack team I went to -> Apps & integrations -> searched for 'hubot' -> and clicked the install button  (Note: administrators can set who is allowed to install apps, so you may or may not have permission to do this.) 

* I followed the prompts, giving my hubot a name.  I chose 'hugo'.  At the end of the process a page is displayed that gives the <code>HUBOT_SLACK_TOKEN</code>. This token is needed in the next step.

* Additional details like the bot's icon can also be set on that page.

# Create a hubot 

I followed the instructions from the [hubot documentation](https://hubot.github.com/docs/) to create my hubot.  One thing to note: ensure you specify <code>slack</code> as the adapter when you go through the generator process OR provide slack as the adapter option on the command line.  Example:

```Shell
yo hubot --adapter=slack
```

Specifying <code>slack</code> as the adapter will do the following:

* install the hubot slack module 
* set the contents of the [Procfile](https://devcenter.heroku.com/articles/procfile) file to contain: <code>web: bin/hubot -a slack</code> 

At the end of this process I had a basic hubot which I could run locally.  The command to run it is:

```Shell
HUBOT_SLACK_TOKEN=XXXXXXX ./bin/hubot --adapter slack
```

Next, in my slack team, I invited 'hugo' to the channel I wanted it to join: <code>/invite @hugo</code>

I could now interact with 'hugo'.  Yay!

![Chat example](/images/hubot_slack_ping.png)


While getting the basic bot up and running was satisfying, playing ping/pong with hugo gets boring quickly.  Fortunately, there are [many hubot plugins](https://www.npmjs.com/search?q=hubot-scripts) that can be installed and you can also [write your own](https://hubot.github.com/docs/scripting/).

# Deploy to Heroku

Running the bot locally is fine for development, but it will need a better place to live longterm. [Heroku](https://www.heroku.com/) seems to be the de facto place to deploy hubot and is what I used.  

I followed the [instructions](https://hubot.github.com/docs/deploying/heroku/) on how to deploy to Heroku.  There are a couple of slack specific environment variables I needed to set:

* HUBOT_SLACK_TOKEN: this is from the above step 
* HEROKU_URL: I got this from heroku -> apps -> settings -> scrolled down to Domains. Note: It is possible to add a custom domain or use the Heroku domain. I used the Heroku domain .i.e. jupiter-marine-12345.herokuapp.com (and no, this isn't hugo's actual Heroku URL)

At the command line, I set the variables using the following:

```Shell
heroku config:add HUBOT_SLACK_TOKEN=xxxx
heroku config:add HEROKU_URL=https://jupiter-marine-12345.herokuapp.com
```

NOTE: If you did NOT specify <code>slack</code> as the adapter when you created your hubot but rather installed it afterwards, then you will need to modify the [Procfile](https://devcenter.heroku.com/articles/procfile) to contain: <code>web: bin/hubot -a slack</code>. This change will need to be git committed and pushed to heroku (<code>git push heroku master</code>).

After following the instructions, I git committed and pushed my bot to heroku which started it automatically.  I stopped it by running the following command:

```Shell
heroku ps:scale web=0
```

It can be started again by running the command:

```Shell
heroku ps:scale web=1
```

And that's it! If you notice anything wrong in this blog post or have another way to do it, please let me know! Happy botting!  

# References:

* [Hubot documentation](https://hubot.github.com/docs/)
* [Heroku Procfile](https://devcenter.heroku.com/articles/procfile)
* [Slack - Inviting team members to a channel](https://get.slack.help/hc/en-us/articles/201980108-Inviting-team-members-to-a-channel)
