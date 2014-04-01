---
layout: page
title : Requirements and User stories
header : tHAPIcs Requirements
group: navigation
---

{% include JB/setup %}

## Story
**In order to** analyse a youtube channel semantic content
**As a** tHAPIcs user
**I want** to get a list of videos published by a youtube channel groped by subjects with relevant statistical information.

## Scenarios List
1. Query youtube channel video list with pagination **(Nipple)**
2. Cache video data on redis database **(cache Catbox)**
3. Get the  Knowledge Graph tags for videos on channel
4. Cache  Knowledge Graph tags information on redis database **(cache Catbox)**
5. Get topic types and properties from  Knowledge Graph API
6. Analice  Knowledge Graph topic information and structure the Json data response with: 
   * Group videos by topic property
   * Use the most relevant video (by visits) as thumbnail
   * Display 1,2...n video thumbnail depending of the number of videos in the type
7. Stream the Json data information for each property
8. Show a youtube channel videos list grouped by topic properties
