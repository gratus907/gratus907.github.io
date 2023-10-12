---
layout: page
title: Data Mining
permalink : /data-mining/
description: Data Mining. Especially interested on efficient methods for analysis of graph structured data.
img: /assets/img/algorithm-1.png
importance: 1
category: Computer Science
---

<style>
    /* Table styles */
table {
    width: auto;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 1rem;
}

/* Table header styles */
thead {
    background-color: #f7f7f7;
}

table th {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 2px solid #ddd;
    font-weight: bold;
    font-size: 1rem;
}

/* Table body styles */
tbody tr {
    border-bottom: 1px solid #ddd;
}
table td {
    font-weight: normal;
    font-size: 1rem;
}

tbody tr:hover {
    background-color: #f5f5f5;
}

td {
    padding: 12px 15px;
    vertical-align: top;
}

/* Link styles */
td a {
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s ease;
}

td a:hover {
    color: #2c3e50;
}
</style>


<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
        {% for post in site.posts %}
            {% if post.tag contains 'data-mining' %}
                <tr>
                    <td><a href="{{ post.url }}">{{ post.short_title }}</a></td>
                    <td>{{ post.brief }}</td>
                    <td>{{ post.date | date: "%B %d, %Y" }}</td>
                </tr>
            {% endif %}
        {% endfor %}
    </tbody>
</table>