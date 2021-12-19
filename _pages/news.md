---
layout: page
title: Recent updates
permalink: /news/
---
<style>
    table {
        width:100%;
        border:0px;
        border-collapse: separate;
        font-weight : 400;
    }
    table th {
        font-size:1rem;
        border: 0px;
        padding : 0px;
    }
    thead {
        border: 0px;
    }
</style>
<div class="table-responsive">
    <table class="table table-sm table-borderless">
    {% assign news = site.news | reverse %}
    {% for item in news%}
    <tr>
        <th scope="row">{{ item.date | date: "%b %-d, %Y" }}</th>
        <td>
        {% if item.inline %}
            {{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
        {% else %}
            <a class="news-title" href="{{ item.url | relative_url }}">{{ item.title }}</a>
        {% endif %}
        </td>
    </tr>
    {% endfor %}
    </table>
</div>