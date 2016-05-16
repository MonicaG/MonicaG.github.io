---
title: Get twitter t.co URL length using Tweepy
layout: post
category: python
desc: How to get twitter short_url_length and short_url_length_https for t.co URL lengths using Tweepy
---

The twitter documentation indicates that [t.co](https://dev.twitter.com/overview/t.co) lengths can be obtained from the [help/configuration API](https://dev.twitter.com/rest/reference/get/help/configuration).  This post gives an example of how to use the [Tweepy](http://www.tweepy.org/) Python library to obtain those values.

It is straight forward to obtain the configuration using tweepy.  After creating a tweepy.API instance the configuration can be retrieved by calling the <code>tweepy.API.configuration()</code> method.  However, the configuration will need to be stored since [twitter recommends obtaining it only once a day](https://dev.twitter.com/rest/reference/get/help/configuration). If you have a long running process then the configuration could be stored in memory.  However, if the process runs periodically the data will need to be persisted.  In the example below, I chose to store the data in a [pickle](https://docs.python.org/3/library/pickle.html) file. I saved the entire configuration  because it is simpler to store everything rather than picking out the t.co length values.


```python
import pickle
import tweepy

consumer_key = 'XXX'
consumer_secret = 'XXX'
access_token = 'XXX'
access_token_secret = 'XXX'

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)
config = api.configuration()

with open('config.pickle', 'wb') as f:
    pickle.dump(config, f)

```


To get the t.co lengths, it is just a matter of reading the pickle file and accessing the t.co length keys.

```python
import pickle

with open('config.pickle', 'rb') as f:
    data = pickle.load(f)
    print("short url length: ", data['short_url_length'])
    print("https url length: ",  data['short_url_length_https'])

```

