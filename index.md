---
layout: page
title: Point 97
tagline: ocean tools
---
{% include JB/setup %}
<div id="carousel-wrapper">
  <div id="map"> </div>
  <div id="geocarousel" class="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators" style="display:none">
      <li data-target="#geocarousel" data-slide-to="0" class="active"></li>
      {% for post in site.tags.place %}
      <li data-target="#geocarousel" data-slide-to="{{forloop.index + 1}}"></li>
      {% endfor %}
    </ol>
    <div class="carousel-inner">
      <div class="item active">
        <div class="container">
          <div class="carousel-caption lens">
            <div class="lens-panel">
                <div class="lens-panel-contents">
                    <h1>Point 97</h1>
                    <p>Cutting edge technology solutions for marine and coastal communities.</p>
                    <!-- <p><a class="btn btn-large btn-primary" href="#">Read More</a></p> -->
                </div>
            </div>
          </div>
        </div>
      </div>
      {% for post in site.tags.place %}
      <div class="item" data-lat="{{ post.lat }}" data-lng="{{ post.lng }}" data-zoom="{{ post.zoom }}">
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
</div>
