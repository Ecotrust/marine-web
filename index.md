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
                    <h2>Portland, Oregon, USA</h2>
                    <div class="lens-content">
                      <p>Technology solutions and engagement strategies for marine &amp; coastal planning.</p>
                    </div>
                    <!-- <p><a class="btn btn-default btn-large" href="#">Read More</a></p> -->
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
                    <h2>{{ post.place }}</h2>
                    <div class="lens-panel-text">
                      <p>{{ post.content }}</p>
                    </div>
                    <ul class="list-unstyled">
                      <li>partner</li>
                      <li>product</li>
                    </ul>
                    {% if post.embed %}
                    <p><a class="btn btn-default btn-large" data-embed="{{ post.embed| escape }}">View Data</a></p>
                    {% endif %}
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
