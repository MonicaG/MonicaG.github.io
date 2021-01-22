---
title: How to view a web page on a mobile device from a server running locally on my computer
layout: post
category: webdev
desc: Run a server using 0.0.0.0 in order to view it on a mobile device.
---

When developing a website, I like to run it locally on my computer. This allows me to quickly see the changes I have made. But running the web server locally means I cannot view it on my mobile. How do I solve this? By setting the web server to listen on 0.0.0.0 instead. Now I can see my work from my mobile! But what is 0.0.0.0? Let’s explore.

Running a web server locally means it is listening to the 127.0.0.1 IP Address. This is the loopback address and it does not pass any packets to the network interface card(s). This means the web server is only listening to requests that originate from the host computer. So, the web server needs to listen to another address. Enter the 0.0.0.0 IP Address. This IP Address means to listen to “all IPv4 addresses on the local machine”. My computer has an IP Address of 10.0.1.22, so the web server will listen for requests on that IP Address.  It will also still listen to 127.0.0.1. On my mobile I can go to http://10.0.1.22:port and see my site. Note: your mobile device will need to be on the same network as your host machine.

Some examples:

**Jekyll**

```shell
jekyll serve --watch --drafts --host 0.0.0.0
```

On my mobile device I would enter the url of: http://10.0.1.22:4000

**Flask**

```python
from flask import Flask
app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run(host='0.0.0.0')
```

On my mobile device I would enter the url of: http://10.0.1.22:5000

But, why use 0.0.0.0 instead of 10.0.1.22? You can use your IP Address instead.  But if your IP Address changes you will need to remember to change it in your web server. Also, using 0.0.0.0 allows you to still access your site via 127.0.0.1 on your host computer.  


# References

* [https://en.wikipedia.org/wiki/0.0.0.0](https://en.wikipedia.org/wiki/0.0.0.0)
* [https://en.wikipedia.org/wiki/Localhost](https://en.wikipedia.org/wiki/Localhost)
* [https://en.wikipedia.org/wiki/Loopback#Virtual_loopback_interface](https://en.wikipedia.org/wiki/Loopback#Virtual_loopback_interface)
* [https://jekyllrb.com/docs/configuration/](https://jekyllrb.com/docs/configuration/)
* [http://flask.pocoo.org/docs/0.11/api/](http://flask.pocoo.org/docs/0.11/api/)
* [https://tools.ietf.org/html/rfc5735#section-3](https://tools.ietf.org/html/rfc5735#section-3)
