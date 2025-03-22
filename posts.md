---
title: "/jeromewynne/posts/"
layout: home
permalink: /posts
permalink_name: posts
---


<ul class="post-index">
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}"> {{ post.name }}</a> {{ post.date | date: "%-d %B %Y" }}
      <br>
    </li>
  {% endfor %}
</ul>