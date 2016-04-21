---
title: Cron and Python virtualenv
layout: post
category: python
desc: Describes how to setup a cron job for a python process that uses virtualenv
---

I created a simple [twitter bot](https://twitter.com/bcdevexbot) that consumes data from a REST API and tweets on certain conditions.  The data from the REST API changes infrequently so the bot is set to run every half hour.  The bot is written in python and uses a [virtualenv](https://virtualenv.pypa.io/en/latest/) so the crontab entry needs to use that virtualenv as well.  This post describes what I did to achieve that.

To create a crontab entry:

1. Login as the user that will run the process.  
1. Use the command <code>crontab -e</code> to create/edit cron entries.

The command I used was:

```bash
0,30 * * * * cd /home/myuser/myproject && venv/bin/python bot.py config/config.ini > /dev/null 2>&1
```

This command does the following:

<code>0,30 * * * *</code>

* Run at 0 and 30 minutes of every hour of every day
* Aside: An alternative cron setting would be to run every 30 minutes which would be: <code>*/30 * * * *</code>.  However, this means it would run relative to when the crontab was created or when the machine was rebooted.  I wanted it to run at specific times so provided concrete times.

<code>cd /home/myuser/myproject</code>

* Change directory to where my bot is located

<code>&&</code>

* If the <code>cd</code> command completed successfully then run the following command

<code>venv/bin/python bot.py config/config.ini</code>

* venv is the location of my virtualenv relative to /home/myuser/myproject
	* So, the bot.py module is run with the virtualenv's version of python.
* config/config.ini is passed in as an argument to bot.py.

<code>> /dev/null 2>&1</code>

* Redirects both stderr and stdout to /dev/null
* For testing purposes you may want to see the output of cron so either:
	1. Remove the <code>> /dev/null 2>&1</code>
		* This will mail the user the result of the cron job
		* You will need to have the mail command installed on your system (<code>mailx</code> package on Centos/Redhat and <code>mailutils</code> package on Ubuntu/Debian)
	1. Redirect the output to a log file (ex: <code>> /tmp/cron.log 2>&1</code>)

To view existing crontab use:

<code>crontab -l</code>


References:

[http://stackoverflow.com/questions/3287038/cron-and-virtualenv](http://stackoverflow.com/questions/3287038/cron-and-virtualenv)

[http://alvinalexander.com/linux/unix-linux-crontab-every-minute-hour-day-syntax](http://alvinalexander.com/linux/unix-linux-crontab-every-minute-hour-day-syntax)

