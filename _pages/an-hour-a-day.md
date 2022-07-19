---
layout: page
title: An Hour A Day 
permalink: /an-hour-a-day/
---
<style>
    table {
        width:100%;
        border:0px;
        border-collapse: separate;
        font-weight : 400;
    }
    table th {
        width: 20%;
        font-size:1rem;
        border: 0px;
        padding : 0px;
    }
    table.table-sm th, table.table-sm td {
        padding-top : 0rem;
        font-size:1rem;
    }
    thead {
        border: 0px;
    }
</style>
This project is inspired by [Side project time](https://en.wikipedia.org/wiki/Side_project_time), popularised by Google.

Basically, companies such as Google have shown remarkable success on allowing their employees to work on their side project for about 20% of work time, designing and developing something creative and learning new skills. 

Similarly, I aim to study something new and improve my skills using about an hour a day. While this time will be used on topics that are not directly related to my ongoing project, I hope these topics I study aside can help widening my knowledge and understanding.

Example of what I might do on this time : 
- Competitive Programming Contests
- Attending seminars and talks 
- ...
  
-------

<div class="table-responsive">
    <table class="table table-sm table-borderless">
    {% assign had = site.HAD | reverse %}
    {% for item in had %}
    <tr>
        <th scope="row">{{ item._date }}</th>
        <td>
        <a href="{{ site.baseurl | prepend: site.url }}{{ item.permalink }}">{{ item.title }}</a>
        </td>
    </tr>
    {% endfor %}
    </table>
</div>
