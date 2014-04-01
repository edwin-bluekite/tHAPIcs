---
layout: page
title : Lesson 1
header : Hello youtube application
---

#Create the nodejs server

{% highlight javascript %}
var Hapi = require("hapi");

var internals = {};

internals.main = function(){
	 var server = new Hapi.Server("0.0.0.0", 4000);
	 server.start(
		  console.log('tHAPICs Server started at: ' + server.info.uri);
	);
}
{% endhighlight %}
