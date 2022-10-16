---
title: "/"
---

<ul>
  {% for post in site.posts %}
    <li>
      <a href="/stochastictalk/{{ post.url }}">{{ post.date | date: "%Y %B %-d" }}: {{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
