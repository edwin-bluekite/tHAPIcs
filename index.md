---
layout: page
title: Hapi JS Tutorial
tagline: on Youtube Channel Semantic Freebase Quering
---
{% include JB/setup %}

#Welcome to tHAPIcs
A project that use Freebase.com to discover topic properties for a youtube.com channel, using youtube semantic topics API.


##Description
tHAPIcs is an Hapi Nodejs application that analyse all the Freebase knowledge graph topics for a youtube channel using the “Youtube Topics API” to get semantic video annotations..

##Usefull links
* Website http://edwin-bluekite.github.io/tHAPIcs/
* Demo App [Heroku](www.heroku.com)
* Github Description

##How it works
Type the name of a youtube channel and tHAPIcs will:
* Show all channels that match your search and let you select one
* Fetch all videos in the specified channel
* Query all the channel videos and store the  Knowledge Graph topics
* Walk over each topic and fetch their  Knowledge Graph types
* A set of pondered topics classified by types and domain are streamed
* Streamed data is rendered grouped by domain with the topic statistic information.

<h2>Tutorial Sections</h2>
<ul>
{% assign pages_list = site.pages %}
{% include JB/pages_list %}
</ul>
