---
title: "/jeromewynne/posts.txt"
layout: home
permalink: /posts
permalink_name: posts
---


<ul class="post-index">
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.date | date: "%-d %B %Y" }}: {{ post.name }}</a>
      <br>
      {{ post.content | strip_html | truncatewords: 50 }}
    </li>
  {% endfor %}
</ul>