---
layout: page
title : tHAPIcs API
header : tHAPIcs API resources
group: navigation
---

{% include JB/setup %}

tHAPIcs has a little API where you can get the resource channels with the following actions:

## Search a youtube channel
Get a list of channels that match a query sting
{% highlight javascript %}
GET v1/channels/search?q='string'
{% endhighlight %}
{% highlight javascript %}
channels:[
	{
		id: "sdjkdfdf",
		name: "laperu.com",
		thumbnail: "url",
		...
	},
	{
		id: "sddf2jdf",
		name: "chocoreacciones",
		thumbnail: "url",
		...
	}
]
{% endhighlight %}

## Get channel details
Get detail information of a youtube channel
{% highlight javascript %}
GET v1/channels/:channelId
{% endhighlight %}

{% highlight javascript %}
channel:{
	id: "8sdjkdfdf",
	name: "laperu.com",
	thumbnail: "url",
	...
}
{% endhighlight %}

##Get all videos in a channel
Get all the videos without pagination of a channel

{% highlight javascript %}
GET v1/channels/:channelId/videos
{% endhighlight %}
###Sample response
{% highlight javascript %}
videos:[
	{
		id: "8sdjkdfdf",
		name: "Hello World"
	},
	{
		id: "789sdjdf",
		name: "hello tHAPIcs"
	}
]
{% endhighlight %}

##Get topics for a channel
{% highlight javascript %}
GET v1/channel/:channelId/topics
{% endhighlight %}
{% highlight javascript %}
topics: [
  {
	topicId: 'm34',
	...
	videos: [
		{
			id: "8sdjkdfdf",
			name: "laperu.com",
			thumbnail: "url",
			...
		},
		{
			id: "789sdjdf",
			name: "chocoreacciones",
			thumbnail: "url"
			...
		}
	]
  }
]
{% endhighlight %}