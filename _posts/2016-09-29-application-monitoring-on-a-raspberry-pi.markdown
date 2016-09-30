---
title: Application Monitoring On A Raspberry Pi
layout: post
category: raspberrypi
desc: Monitoring an application with Papertrail and Dead Man's Snitch on a Raspberry Pi
---

One of the things I use my Raspberry Pi for is to run a twitter bot.  I want this bot to run without much manual intervention.  So, I want to be notified if it encounters any errors or is not running. To do this I use [Papertrail](https://papertrailapp.com/) and [Dead Man's Snitch](https://deadmanssnitch.com/).  I use the free tier plan for both services.

Some background on the bot: It is a python script that is cron'd to run every half hour. The process reads from an API and then tweets (or not) based on the results from the call to the API. It uses the python logging module and logs any errors it may have encountered. 



## Papertrail ##

[Papertrail](https://papertrailapp.com/) provides hosted log management. I use it to notify me of any errors the bot logs. This is done by sending the log entries to Papertrail using their [remote_syslog2](https://github.com/papertrail/remote_syslog2) daemon. I then setup an alert to email me if any new log entries contain the word 'error'.  I found the [daemon setup instructions](http://help.papertrailapp.com/kb/configuration/configuring-centralized-logging-from-text-log-files-in-unix/) to be straight forward and easy to follow.  There are also [alerting options other than email](http://help.papertrailapp.com/kb/how-it-works/alerts/).

## Dead Man's Snitch ##

[Dead Man's Snitch](https://deadmanssnitch.com/) is a monitoring tool for cron jobs. It will send an alert if the cron job has not run in a given time frame.  This is accomplished by 'pinging' the Dead Man's Snitch service at a given URL.  If it does not receive that 'ping' then an alert is created.

There are other similar services available such as:

* [https://healthchecks.io/](https://healthchecks.io/)
* [https://wdt.io/](https://wdt.io/)


## Conclusion ##

I am happy with both Papertrail and Dead Man's Snitch.  The two services make monitoring an application easy.