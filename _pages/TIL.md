---
layout: page
title: Daily Retrospectives
permalink: /TIL/
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
<div class="table-responsive">
    <table class="table table-sm table-borderless">
    {% assign til = site.TIL | reverse %}
    {% for item in til %}
    <tr>
        <th scope="row">{{ item._date }}</th>
        <td>
        <a href="{{ site.baseurl | prepend: site.url }}{{ item.permalink }}">{{ item.comment }}</a>
        </td>
    </tr>
    {% endfor %}
    </table>
</div>
