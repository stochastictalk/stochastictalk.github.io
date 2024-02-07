---
title: "/jeromewynne/posts.txt"
layout: home
permalink: /posts
permalink_name: posts
---

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.date | date: "%Y %B %-d" }}: {{ post.post-title }}</a>
    </li>
  {% endfor %}
</ul>
