---
layout: page
permalink: /about-me/
title: About me
description: My resume. Here you can find what activity I do now, what I did before, my education and more. CSS style inspired by José M. Requena Plens
---

<!-- Place PDF download link at the top right. -->
<!--<div class="row" style="margin-top: -3.5em;">
	<a class="ml-auto mr-2" href="/assets/pdf/vitae.pdf" target="_blank">
	  <img height="60px" src="/assets/img/pdf_icon.svg">
	</a>
</div>-->
<style>
    h1.cv, h2.cv, h3.cv, h4.cv, h5.cv, h6 {
        margin-top:0em
    }
    table {
        width:60%;
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
<div class="cv">
	{% for entry in site.data.cv %}
		<div class="cardcv mt-3 p-3">
            {% if entry.type != "table-publications" %}
			<h3 class="cv">{{ entry.title }}</h3>
            {% endif %}
			<div>
			{% if entry.type == "list" %}
				<ul class="list-group list-group-flush">
				{% for content in entry.contents %}
					<li class="cardcv list-group-item list-group-item-cv list_cv">{{ content }}</li>
				{% endfor %}
				</ul>
			{% elsif entry.type == "map" %}
				<table class="table-sm table-borderless">
					{% for content in entry.contents %}
						<tr>
							<td class="cv p-0 pr-2 font-weight-bold text-left"><b>{{ content.name }}</b></td>
							<td class="cv p-0 pl-2 text-left">{{ content.value }}</td>
						</tr>
					{% endfor %}
				</table>
			{% elsif entry.type == "nested_list" %}
				<ul class="list-group list-group-flush">
				{% for content in entry.contents %}
					<li class="cardcv list-group-item list-group-item-cv">
					<h5 class="font-italic">{{ content.title }}</h5>
					{% if content.items %}
						<ul class="subitems">
								{% for subitem in content.items %}
									<li><span class="subitem">{{ subitem }}</span></li>
								{% endfor %}
								</ul>
							{% endif %}
					</li>
				{% endfor %}
				</ul>
			{% elsif entry.type == "table" %}
				<ul class="list-group list-group-flush">
				{% for content in entry.contents %}
					<li class="cardcv list-group-item list-group-item-cv">
						<div class="row">
                            <div class="col-xs-2 cl-sm-2 col-md-auto text-center colcv" style="width: 100px;">
                                {% if content.badge %}
                                <span class="badge abbr abbrcv">
                                    {{ content.badge }}
                                </span>
                                {% endif %}
                                {% if content.location %}
                                <span class="cvlocation">
                                    <i class="fas fa-map-marker-alt iconlocation"></i> {{ content.location }}
                                </span>
                                {% endif %}
                                {% if content.subtype %}
                                <b>{{ content.subtype }}</b>
                                {% endif %}
                            </div>
							<div class="col-xs-10 cl-sm-10 col-md mt-2 mt-md-0">
								{% if content.title %}
								<h6 class="title font-weight-bold ml-1 ml-md-4">{{content.title}}</h6>
								{% endif %}
								{% if content.description %}
									<ul class="items">
										{% for item in content.description %}
										    <li>
												{% if item.contents %}
													<span class="item-title">{{ item.title }}</span>
													<ul class="subitems">
													{% for subitem in item.contents %}
														<li><span class="subitem">{{ subitem }}</span></li>
													{% endfor %}
													</ul>
												{% else %}
													<span class="item">{{ item }}</span>
												{% endif %}
											</li>
										{% endfor %}
									</ul>
								{% endif %}
								{% if content.items %}
									<ul class="items">
										{% for item in content.items %}
											<li>
												{% if item.contents %}
													<span class="item-title">{{ item.title }}</span>
													<ul class="subitems">
													{% for subitem in item.contents %}
														<li><span class="subitem">{{ subitem }}</span></li>
													{% endfor %}
													</ul>
												{% else %}
													<span class="item">{{ item }}</span>
												{% endif %}
											</li>
										{% endfor %}
									</ul>
								{% endif %}
							</div>
						</div>
					</li>
				{% endfor %}
				</ul>
            {% elsif entry.type == "table-no-bullets" %}
                <ul class="cardcv-text font-weight-light list-group list-group-flush">
                {% for content in entry.contents %}
                    <li class="cardcv list-group-item list-group-item-cv">
                        <div class="row">
                            {% if content.year %}
                                <div class="col-xs-2 cl-sm-2 col-md-auto text-left" style="width: 75px;">
                                    <span class="badge abbr abbrcv">
                                        {{ content.year }}
                                    </span>
                                </div>
                            {% endif %}
                            <div class="col-xs-10 cl-sm-10 col-md mt-2 mt-md-0">
                                {% if content.title %}
                                <h6 class="title font-weight-bold ml-1 ml-md-4">{{content.title}}</h6>
                                {% endif %}
                                {% if content.description %}
                                    <ul class="items list_no_bullet">
                                        {% for item in content.description %}
                                            <li style="list-style-type: none;">
                                                {% if item.contents %}
                                                    <span class="item-title">{{ item.title }}</span>
                                                    <ul class="subitems list_no_bullet">
                                                    {% for subitem in item.contents %}
                                                        <li><span class="subitem">{{ subitem }}</span></li>
                                                    {% endfor %}
                                                    </ul>
                                                {% else %}
                                                    <span class="item">{{ item }}</span>
                                                {% endif %}
                                            </li>
                                        {% endfor %}
                                    </ul>
                                {% endif %}
                                {% if content.items %}
                                    <ul class="items list_no_bullet">
                                        {% for item in content.items %}
                                            <li>
                                                {% if item.contents %}
                                                    <span class="item-title">{{ item.title }}</span>
                                                    <ul class="subitems list_no_bullet">
                                                    {% for subitem in item.contents %}
                                                        <li><span class="subitem">{{ subitem }}</span></li>
                                                    {% endfor %}
                                                    </ul>
                                                {% else %}
                                                    <span class="item">{{ item }}</span>
                                                {% endif %}
                                            </li>
                                        {% endfor %}
                                    </ul>
                                {% endif %}
                            </div>
                        </div>
                    </li>
                {% endfor %}
                </ul>
            {% elsif entry.type == "table-courses" %}
				<ul class="list-group list-group-flush">
				{% for content in entry.contents %}
					<li class="cardcv list-group-item list-group-item-cv">
						<div class="row">
							{% if content.school %}
								<div class="col-xs-2 cl-sm-2 col-md-auto text-left" style="width: 100px;">
									<span class="badge abbr abbrcv">
									{% if site.data.venues[content.school] %}
										<a href="{{site.data.venues[content.school].url}}">{{ content.school }}</a>
									{% else %}
										{{ content.school }}
									{% endif %}
									</span>
								</div>
							{% endif %}
							<div class="col-xs-10 cl-sm-10 col-md mt-2 mt-md-0">
								{% if content.items %}
									<ul class="items">
										<div class="tgcv-wrap">
										<table class="table-sm table-borderless tgcv">
										{% for item in content.items %}
													<tr class="cvcourses">
														<td class="cv cvcourses pr-2 text-left" style="display: list-item;list-style-type: disc;">
															<span class="item">{{ item.name }}</span>
														</td>
														{% if item.link %}
															<td class="cv cvcourses pl-2 text-left">
																{% if item.linkname %}
																	<a href="{{ item.link }}" class="btncv z-depth-0">{{ item.linkname}}</a>
																{% else %}
																	<a href="{{ item.link }}" class="btncv z-depth-0">doc</a>
																{% endif %}
															</td>
														{% endif %}
													</tr>
										{% endfor %}
									</table>
								</div>
									</ul>
								{% endif %}
							</div>
						</div>
					</li>
				{% endfor %}
				</ul>
            {% elsif entry.type == "table-publications" %}
                <style> 
                a {
                    color : #B509AC;
                } 
                </style>
			    <h3 class="cv"><a href="/publications/">List of publications (Link) </a></h3>
            {% endif %}
            {% if entry.note %}
                <span class="cardcv font-weight-light">{{ entry.note }}</span>
            {% endif %}
			</div>
		</div>
	{% endfor %}
</div>