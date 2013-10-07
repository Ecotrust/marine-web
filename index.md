---
layout: geocarousel
title: Point 97
tagline: ocean tools
---
{% include JB/setup %}
<div id="carousel-wrapper">
  <div id="map"> </div>
  <div id="geocarousel" class="carousel">
    <!-- Indicators -->
    <!-- <ol class="carousel-indicators" style="display:none">
      <li data-target="#geocarousel" data-slide-to="0" class="active"></li>
      {% for post in site.tags.place reversed %}
      <li data-target="#geocarousel" data-slide-to="{{forloop.index + 1}}"></li>
      {% endfor %}
    </ol> -->
    <div class="carousel-inner">
      {% for post in site.tags.place reversed %}
      <div class="item{% if forloop.first %} active{% endif %}" data-lat="{{ post.lat }}" data-lng="{{ post.lng }}" data-zoom="{{ post.zoom }}" data-hash="{{ post.url }}">
        <div class="container">
          <div class="carousel-caption lens">
            <div class="lens-panel">
                <div class="lens-panel-contents">
                  <div class="lens-panel-text">
                    <h1>{{ post.title }}</h1>
                    <h2>{{ post.place }}</h2>  
                      <p>{{ post.blurb }}</p>
                      <p>{{ post.image }}</p>
                      <div class="product-icon">
                      {% case post.product %}
                      {% when 'digital-deck' %}
                      <img src="{{ ASSET_PATH }}/images/logos/DigitalDeckLOGO.svg"/>
                      {% else %}
                      {% endcase %}
                      </div>
                  </div>
                  <!-- <ul class="list-unstyled">
                    <li>partner</li>
                    <li>product</li>
                  </ul> -->
                 {% comment %} <div class="btn-group hidden-phone">
                  {% if post.embed %}
                    <a class="btn btn-default view-btn" data-embed="{{ post.embed|escape }}">View Data</a>
                  {% endif %}
                    <a class="btn btn-default" href="{{BASE_PATH}}{{ post.url }}">Read More</a>
                  </div>
                  {% endcomment %}
                </div>
            </div>
          </div>
        </div>
      </div>
      {% endfor %}
    </div>
    <a class="left carousel-control" href="#geocarousel" data-slide="prev">
      <i class="icon-chevron-left"> </i>
    </a>
    <a class="right carousel-control" href="#geocarousel" data-slide="next">
      <i class="icon-chevron-right"> </i>
    </a>
  </div>
</div>
