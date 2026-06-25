// Italia — render the guide from ITALIA (data.js). Vanilla JS, no framework.

(function () {
  "use strict";

  var app = document.getElementById("app");
  var nav = document.getElementById("regionNav");
  var intro = document.getElementById("intro");

  if (typeof ITALIA === "undefined") {
    app.innerHTML = "<p>Content failed to load. Check data.js.</p>";
    return;
  }

  intro.textContent = ITALIA.intro;
  document.title = ITALIA.title + " — " + ITALIA.subtitle;

  var activeTag = null; // current filter, or null for "everything"

  // Build an element with optional class and text.
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function mapsUrl(query) {
    return "https://maps.apple.com/?q=" + encodeURIComponent(query);
  }

  function actionLink(cls, label, href, aria) {
    var a = el("a", cls, label);
    a.href = href;
    a.rel = "noopener";
    if (/^https?:/.test(href)) a.target = "_blank";
    if (aria) a.setAttribute("aria-label", aria);
    return a;
  }

  function tipList(items) {
    var ul = el("ul", "list tips");
    items.forEach(function (item) {
      ul.appendChild(el("li", null, item));
    });
    return ul;
  }

  // A single place: name, blurb, tag chips, and Maps / Info links.
  function renderPlace(place) {
    var item = el("article", "place");
    if (place.tags) item.dataset.tags = place.tags.join(" ");

    // Optional photo. If it fails to load, hide it rather than show a broken icon.
    if (place.photo) {
      var fig = el("div", "place-photo");
      var img = document.createElement("img");
      img.src = place.photo;
      img.alt = place.name;
      img.loading = "lazy";
      img.referrerPolicy = "no-referrer";
      img.onerror = function () { fig.style.display = "none"; };
      fig.appendChild(img);
      item.appendChild(fig);
    }

    item.appendChild(el("h4", "place-name", place.name));
    if (place.blurb) item.appendChild(el("p", "place-blurb", place.blurb));

    if (place.tags && place.tags.length) {
      var chips = el("div", "chips");
      place.tags.forEach(function (t) {
        chips.appendChild(el("span", "chip", t));
      });
      item.appendChild(chips);
    }

    var actions = el("div", "actions");
    if (place.maps) {
      actions.appendChild(
        actionLink("btn maps", "Maps", mapsUrl(place.maps),
          "Open " + place.name + " in Maps")
      );
    }
    if (place.url) {
      actions.appendChild(
        actionLink("btn info", "More info", place.url,
          "Read more about " + place.name)
      );
    }
    if (actions.childNodes.length) item.appendChild(actions);

    return item;
  }

  function renderTown(town) {
    var card = el("article", "town");
    card.id = "town-" + town.id;

    var head = el("div", "town-head");
    head.appendChild(el("h3", "town-name", town.name));
    if (town.base) head.appendChild(el("span", "town-base", town.base));
    card.appendChild(head);

    if (town.blurb) card.appendChild(el("p", "town-blurb", town.blurb));

    if (town.places && town.places.length) {
      var wrap = el("div", "places");
      town.places.forEach(function (p) {
        wrap.appendChild(renderPlace(p));
      });
      card.appendChild(wrap);
    }

    if (town.food && town.food.length) {
      card.appendChild(el("p", "section-label", "Eat & drink"));
      var fwrap = el("div", "food");
      town.food.forEach(function (f) {
        var row = el("div", "food-item");
        var head = el("div", "food-head");
        head.appendChild(el("span", "food-name", f.name));
        if (f.kind) head.appendChild(el("span", "food-kind " + f.kind, f.kind));
        row.appendChild(head);
        if (f.note) row.appendChild(el("p", "food-note", f.note));
        if (f.maps) {
          var fa = el("div", "actions");
          fa.appendChild(actionLink("btn maps", "Maps", mapsUrl(f.maps),
            "Open " + f.name + " in Maps"));
          row.appendChild(fa);
        }
        fwrap.appendChild(row);
      });
      card.appendChild(fwrap);
    }

    if (town.tips && town.tips.length) {
      card.appendChild(el("p", "section-label", "Local tips"));
      card.appendChild(tipList(town.tips));
    }
    return card;
  }

  function renderRegion(region) {
    var section = el("section", "region");
    section.id = "region-" + region.id;

    var head = el("div", "region-head");
    head.appendChild(el("h2", "region-name", region.name));
    if (region.tagline) head.appendChild(el("p", "region-tag", region.tagline));
    section.appendChild(head);

    if (region.travel && region.travel.length) {
      var tcard = el("article", "town travel-card");
      tcard.appendChild(el("p", "section-label", "Getting around"));
      region.travel.forEach(function (t) {
        var row = el("div", "travel-item");
        row.appendChild(el("div", "travel-route", t.route));
        if (t.detail) row.appendChild(el("p", "travel-detail", t.detail));
        if (t.url) {
          var ta = el("div", "actions");
          ta.appendChild(actionLink("btn info", "Timetable & fares", t.url,
            t.route + " — official info"));
          row.appendChild(ta);
        }
        tcard.appendChild(row);
      });
      tcard.appendChild(el("p", "travel-caveat",
        "Times and fares change seasonally — treat these as a guide and check the official link on the day."));
      section.appendChild(tcard);
    }

    region.towns.forEach(function (town) {
      section.appendChild(renderTown(town));
    });
    return section;
  }

  // ---- Collect all tags, build filter chips ----
  function allTags() {
    var seen = {};
    ITALIA.regions.forEach(function (r) {
      r.towns.forEach(function (t) {
        (t.places || []).forEach(function (p) {
          (p.tags || []).forEach(function (tag) { seen[tag] = true; });
        });
      });
    });
    return Object.keys(seen).sort();
  }

  function applyFilter(tag) {
    activeTag = tag;
    var places = app.querySelectorAll(".place");
    places.forEach(function (node) {
      var tags = (node.dataset.tags || "").split(" ");
      var show = !tag || tags.indexOf(tag) !== -1;
      node.style.display = show ? "" : "none";
    });
    // Hide towns / regions that have no visible places.
    app.querySelectorAll(".town").forEach(function (town) {
      var visible = town.querySelectorAll(".place:not([style*='none'])").length;
      var hasPlaces = town.querySelectorAll(".place").length > 0;
      town.style.display = (hasPlaces && !visible) ? "none" : "";
    });
    app.querySelectorAll(".region").forEach(function (region) {
      var visibleTowns = Array.prototype.filter.call(
        region.querySelectorAll(".town"),
        function (t) { return t.style.display !== "none"; }
      ).length;
      region.style.display = visibleTowns ? "" : "none";
    });
  }

  function buildFilter() {
    var bar = el("div", "filter");
    var label = el("span", "filter-label", "Filter");
    bar.appendChild(label);

    var all = el("button", "fchip active", "Everything");
    all.addEventListener("click", function () {
      setActiveChip(all);
      applyFilter(null);
    });
    bar.appendChild(all);

    allTags().forEach(function (tag) {
      var b = el("button", "fchip", tag);
      b.addEventListener("click", function () {
        setActiveChip(b);
        applyFilter(tag);
      });
      bar.appendChild(b);
    });

    function setActiveChip(active) {
      bar.querySelectorAll(".fchip").forEach(function (c) {
        c.classList.toggle("active", c === active);
      });
    }
    return bar;
  }

  // ---- Region nav (scroll-to) ----
  ITALIA.regions.forEach(function (region, i) {
    var btn = el("button", i === 0 ? "active" : null, region.name);
    btn.addEventListener("click", function () {
      var target = document.getElementById("region-" + region.id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    nav.appendChild(btn);
  });

  // ---- Render ----
  app.appendChild(buildFilter());
  ITALIA.regions.forEach(function (region) {
    app.appendChild(renderRegion(region));
  });

  // ---- Scroll-spy on the region nav ----
  var buttons = Array.prototype.slice.call(nav.querySelectorAll("button"));
  var sections = ITALIA.regions.map(function (r) {
    return document.getElementById("region-" + r.id);
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var idx = sections.indexOf(entry.target);
            buttons.forEach(function (b, i) {
              b.classList.toggle("active", i === idx);
            });
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    sections.forEach(function (s) { if (s) observer.observe(s); });
  }
})();
