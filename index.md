---
layout: page
title: point97
tagline: ocean tools
---
{% include JB/setup %}
<div id="carousel-wrapper">
  <div id="geocarousel" class="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#geocarousel" data-slide-to="0" class="active"></li>
      <li data-target="#geocarousel" data-slide-to="1"></li>
      <li data-target="#geocarousel" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="item active">
        <div class="container">
          <div class="carousel-caption lens">
            <div class="lens-panel">
                <div class="lens-panel-contents">
                    <h1>point Nine Seven</h1>
                    <p>Ocean Tools</p>
                    <!-- <p><a class="btn btn-large btn-primary" href="#">Read More</a></p> -->
                </div>
            </div>
          </div>
        </div>
      </div>
      {% for post in site.tags.place %}
      <div class="item" data-lat="{{ post.lat }}" data-lng="{{ post.lng }}">
        <div class="container">
          <div class="carousel-caption lens">
            <div class="lens-panel">
                <div class="lens-panel-contents">
                    <h1>{{ post.title }}</h1>
                    <p>{{ post.content }}</p>
                    <!-- <p><a class="btn btn-large btn-primary" href="#">Read More</a></p> -->
                </div>
            </div>
          </div>
        </div>
      </div>
      {% endfor %}
    </div>
    <a class="left carousel-control" href="#geocarousel" data-slide="prev">
      <span class="icon-prev"></span>
    </a>
    <a class="right carousel-control" href="#geocarousel" data-slide="next">
      <span class="icon-next"></span>
    </a>
  </div>
  <div id="map"></div>
</div>