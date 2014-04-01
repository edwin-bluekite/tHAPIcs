---
layout: page
title : Lesson 0 (Install nodejs and npm)
header : Install nodejs and npm
---

#Install nodejs on ubuntu (debian)
I use ubuntu as my OS and I the following method to install NodeJS and NPM in the latest versions

{% highlight sh %}
    $ sudo apt-get update
    $ sudo apt-get install python-software-properties
    $ sudo add-apt-repository ppa:chris-lea/node.js
    $ sudo apt-get update
    $ sudo apt-get install nodejs
    $ sudo apt-get install npm
    $ sudo npm update npm -g
    $ sudo npm install
{% endhighlight %}

After this you can verify your installation with
{% highlight sh %}
    $ node -v
	v0.10.26 
{% endhighlight %}

and

{% highlight sh %}
    $ npm -v
	1.4.6
{% endhighlight %}

In my case I have Nodejs 0.10.26 and npm 1.4.6

You can check other installation options depending your OS in the official nodejs wiki

[https://github.com/joyent/node/wiki/installation](https://github.com/joyent/node/wiki/installation)
