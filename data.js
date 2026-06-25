// Italia — guide content. Plain JS object, no build step.
//
// Structure:
//   ITALIA.regions[] -> { id, name, tagline, towns[] }
//   town            -> { id, name, base, blurb, places[], tips[] }
//   place           -> { name, blurb, maps, url, tags[] }
//
//   - `maps`  : the exact search handed to Apple/Google Maps. Be specific —
//               a landmark name + town, or "lat,lng" for a precise pin.
//   - `url`   : an optional link to read more about that place.
//   - `tags`  : any of walk / swim / art / food / football / culture / view /
//               shop / history / nature / photography  (used for filter chips).
//   - tips    : plain strings, practical notes for the whole town.
//
// Expand freely: add towns, add places, retag. No build step — save & refresh.

const ITALIA = {
  title: "Italia",
  subtitle: "Bergamo · Lake Iseo",
  intro:
    "A family guide to two weeks in the Bergamasco — the walled upper town of Bergamo, the quiet north end of Lake Iseo at Lovere, and a day in Milan. Walks, swims, art, and food, all reachable by train, bus, and ferry.",

  notes: [
    "Early July is hot — bias walks to the morning, swims to the afternoon.",
    "No car: the spine is train (Milan↔Bergamo), bus Line C (Bergamo↔Lovere), and the lake ferries.",
    "Bergamo↔Lovere is bus Line C from Bergamo Autostazione — roughly hourly, about 75 minutes.",
  ],

  dialect: [
    { word: "Mat", meaning: "A lot / very (Bergamasco)" },
    { word: "Pòta", meaning: "All-purpose filler — 'well…', 'what can you do'" },
    { word: "S'cèt", meaning: "Lad / young man" },
    { word: "Öna fèta", meaning: "A slice (of polenta, cake…)" },
  ],

  regions: [
    {
      id: "bergamo",
      name: "Bergamo",
      tagline: "A walled upper town above a working city",
      travel: [
        {
          route: "Getting around Bergamo (ATB)",
          detail: "Single ticket ~€1.50, valid 75 min across buses + both funiculars (one transfer). 24h pass ~€5.50. Tap a contactless card on board ('Passa e vai') — no need to pre-buy. Kids under 10 free.",
          url: "https://www.atb.bergamo.it/",
        },
        {
          route: "Funicular to Città Alta",
          detail: "From Viale Vittorio Emanuele II up to Piazza Mercato delle Scarpe. Every ~7 min, roughly 07:00–00:30 (later Fri/Sat). Covered by the €1.50 ticket. Bus lines 1/1A also go up if the queue is long.",
          url: "https://www.visitbergamo.net/en/oggetto/citys-funicular/",
        },
        {
          route: "Airport (Orio al Serio) ↔ city",
          detail: "ATB Line 1, every ~20 min, ~€2.60, 15–20 min to the station / 25–30 to Città Alta.",
          url: "https://www.atb.bergamo.it/",
        },
        {
          route: "Bergamo ↔ Milan (train)",
          detail: "Frequent Trenord regional trains from Bergamo station, ~50–60 min. Buy at machines/windows or the Trenord app; check live times before travelling.",
          url: "https://www.trenord.it/en/",
        },
      ],
      towns: [
        {
          id: "citta-alta",
          name: "Città Alta",
          base: "Bergamo",
          blurb:
            "The medieval upper town, ringed by UNESCO-listed Venetian walls. Take the funicular up rather than the steep climb in the heat — though the old stone stairways reward fresh legs. A second funicular carries on to San Vigilio for the best view.",
          places: [
            {
              name: "Piazza Vecchia",
              photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Bergamo%20-%20Panorama%20da%20Piazza%20Vecchia.jpg?width=600",
              blurb:
                "The Renaissance square Le Corbusier called too perfect to touch. Climb the Campanone civic tower for the view — it still rings 100 chimes at 10pm.",
              maps: "Piazza Vecchia, Bergamo",
              url: "https://www.visitbergamo.net/en/oggetto/piazza-vecchia/",
              tags: ["culture", "history", "view"],
            },
            {
              name: "Accademia Carrara",
              photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Accademia%20Carrara.JPG?width=600",
              blurb:
                "The standout for the art-lovers: Botticelli, Raphael, Mantegna, Bellini, Titian. Calm, well-lit, and rarely crowded.",
              maps: "Accademia Carrara, Bergamo",
              url: "https://lacarrara.it/en/",
              tags: ["art", "culture"],
            },
            {
              name: "GAMeC",
              blurb:
                "Modern and contemporary art across the street from the Carrara — a sharp contrast and a good second half to an art morning.",
              maps: "GAMeC, Via San Tomaso, Bergamo",
              url: "https://www.gamec.it/en",
              tags: ["art"],
            },
            {
              name: "Cappella Colleoni",
              photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Bergamo%2C%20Cappella%20Colleoni%202021.jpg?width=600",
              blurb:
                "A Renaissance chapel in coloured marble beside Santa Maria Maggiore — extravagant frescoes and inlay, free to step into.",
              maps: "Cappella Colleoni, Bergamo",
              url: "https://www.visitbergamo.net/en/oggetto/citta-alta/",
              tags: ["art", "history", "culture"],
            },
            {
              name: "The Venetian Walls",
              photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Venetian%20walls%20of%20Bergamo%2C%2015th-16th%20centuries%20%281%29.jpg?width=600",
              blurb:
                "A flat, scenic loop right round the upper town, with telescopes, benches and the best sunsets in Bergamo. Easy for all five of you.",
              maps: "Mura Venete, Bergamo",
              url: "https://www.visitbergamo.net/en/oggetto/venetian-walls-and-unesco/",
              tags: ["walk", "view", "history", "photography"],
            },
            {
              name: "San Vigilio hill",
              photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Bergamo%20Alta%20S%20Vigilio.jpg?width=600",
              blurb:
                "The upper funicular climbs to a small castle and the widest panorama over the city and out toward the plain.",
              maps: "Castello di San Vigilio, Bergamo",
              url: "https://www.visitbergamo.net/en/oggetto/citta-alta/",
              tags: ["view", "walk", "nature"],
            },
          ],
          food: [
            {
              name: "La Marianna",
              note: "Café & gelateria where stracciatella was invented in 1961. Shaded courtyard; best pastries in the morning.",
              kind: "coffee",
              maps: "La Marianna, Colle Aperto, Bergamo",
            },
            {
              name: "Da Mimmo",
              note: "Long-standing institution on Via Colleoni, known for wood-fired pizza and classic dishes. Lively; book ahead. ~€25–40pp.",
              kind: "pizza",
              maps: "Da Mimmo, Via Bartolomeo Colleoni, Bergamo",
            },
            {
              name: "Pizza alla Fara",
              note: "Tiny spot in Città Alta for light, well-made pizza by the slice — handy cheap lunch between sights.",
              kind: "pizza",
              maps: "Pizza alla Fara, Bergamo",
            },
            {
              name: "Antica Osteria del Vino Buono",
              note: "Near Piazza Mercato delle Scarpe — local dishes (casoncelli, polenta), good wine, fair prices. A safe single-meal pick.",
              kind: "pasta",
              maps: "Antica Osteria del Vino Buono, Bergamo",
            },
          ],
          tips: [
            "Funicular up is about €1.50 and a few minutes — worth it in July heat.",
            "Stracciatella gelato was invented at La Marianna in Colle Aperto in 1961.",
            "Many trattorias close Mondays; dinner from ~19:30. Book ahead in Città Alta.",
          ],
        },
        {
          id: "bergamo-bassa",
          name: "Città Bassa & sport",
          base: "Bergamo",
          blurb:
            "The lower town is the everyday Bergamo — shopping streets, the stadium, and the trattorias locals actually use.",
          places: [
            {
              name: "Via XX Settembre",
              photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Via%20XX%20settembre%2C%20Bergamo.jpg?width=600",
              blurb:
                "The main fashion street in the lower town — high-street brands and boutiques, the obvious draw for the teenagers.",
              maps: "Via XX Settembre, Bergamo",
              url: "https://www.visitbergamo.net/en/",
              tags: ["shop"],
            },
            {
              name: "New Balance Arena (Atalanta)",
              blurb:
                "Atalanta's ground, 20–30 min walk from the centre, with a club shop. Serie A won't have started in early July, so there's no match — but the shop and the New Balance kit tie into the football-and-clothes interest. Public tours aren't reliably offered; check before going.",
              maps: "Gewiss Stadium, Bergamo",
              url: "https://www.atalanta.it/",
              tags: ["football", "shop"],
            },
          ],
          food: [
            {
              name: "Trattoria Parietti",
              note: "On Via San Tomaso near the Carrara — rustic Bergamasco home cooking, fixed-price menus, very good value. Popular; reserve.",
              kind: "pasta",
              maps: "Trattoria Parietti, Via San Tomaso, Bergamo",
            },
            {
              name: "Il Fornaio",
              note: "Reliable pizza al taglio (by the slice) with good toppings — quick, cheap bite while shopping in the lower town.",
              kind: "pizza",
              maps: "Il Fornaio, Bergamo",
            },
            {
              name: "Gelateria La Romana",
              note: "Consistently excellent gelato — a dependable cool-down on a hot afternoon.",
              kind: "coffee",
              maps: "Gelateria La Romana, Bergamo",
            },
          ],
          tips: [
            "Bergamo is a UNESCO cheese city — try Taleggio, Branzi, Formai de Mut.",
            "The two icons to eat: casoncelli (stuffed pasta) and polenta taragna.",
          ],
        },
      ],
    },

    {
      id: "iseo",
      name: "Lovere & Lake Iseo",
      tagline: "The quieter, wilder lake",
      travel: [
        {
          route: "Bergamo ↔ Lovere (bus Line C)",
          detail: "From Bergamo Autostazione (next to the train station), roughly hourly, ~75 min, via Endine and Lake Endine. Run by Bergamo Trasporti / Arriva — buy from the driver or the station office. A summer timetable runs ~9 Jun–13 Sep.",
          url: "https://www.bergamotrasporti.it/",
        },
        {
          route: "Lake Iseo ferries (Navigazione Lago d'Iseo)",
          detail: "Single hops are cheap (roughly €4–6); Monte Isola return ~€5–6 incl. landing fee. Children under 14 travel free with an adult. Timetable is strongly seasonal — always check the live schedule before each trip.",
          url: "https://navigazionelagoiseo.it/en/scheduled-services/tickets-fares/",
        },
        {
          route: "Ferry timetable & route map",
          detail: "Official live timetables and the full route map (Lovere, Pisogne, Monte Isola, Iseo, Sarnico). Buy on board, at the jetty office, or online (QR on phone is fine).",
          url: "https://www.navigazionelagoiseo.it/en/",
        },
      ],
      towns: [
        {
          id: "lovere",
          name: "Lovere",
          base: "Lovere",
          blurb:
            "Officially one of Italy's most beautiful villages, at the north tip of Lake Iseo — the calmer, cheaper alternative to Como and Garda. Two lakeside promenades, a neoclassical gallery, and walks straight up into the hills.",
          places: [
            {
              name: "Accademia Tadini",
              photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Lovere%20Accademia%20Tadini.JPG?width=600",
              blurb:
                "A neoclassical lakeside gallery with works by Canova — another one for the art-lovers, and a cool indoor option on a hot afternoon.",
              maps: "Accademia Tadini, Lovere",
              url: "https://www.accademiatadini.it/",
              tags: ["art", "culture"],
            },
            {
              name: "Lakeside promenades",
              photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Iseo%20and%20Lovere%20from%20Ceratello.jpg?width=600",
              blurb:
                "About 2km of easy waterfront strolling through the old town, best at golden hour for photos and gelato.",
              maps: "Lungolago Giosuè Carducci, Lovere",
              url: "https://visitlakeiseo.info/en/places/lovere/",
              tags: ["walk", "view", "photography"],
            },
            {
              name: "San Giovanni in Monte Cala",
              blurb:
                "A walk up from Lovere through woods and meadows to a sanctuary with a panorama over the whole lake. Refreshments at the top.",
              maps: "Santuario di San Giovanni, Lovere",
              url: "https://visitlakeiseo.info/en/places/lovere/",
              tags: ["walk", "nature", "view"],
            },
            {
              name: "Lovere lido & pool",
              blurb:
                "An outdoor pool complex with chutes plus lifeguarded lake swimming — the safe option for mixed swimming confidence.",
              maps: "Lido di Lovere",
              url: "https://visitlakeiseo.info/en/places/lovere/",
              tags: ["swim"],
            },
          ],
          food: [
            {
              name: "Lakefront bars & gelaterie",
              note: "The lungolago (waterfront) is lined with cafés and gelato spots — best enjoyed slowly at golden hour. Pick by the view and the queue of locals.",
              kind: "coffee",
              maps: "Lungolago Marconi, Lovere",
            },
            {
              name: "Pizzerias around Piazza Tredici Martiri",
              note: "The main square and side streets hold several pizza and pasta spots; lake fish (perch, trout) features on local menus. Verify on the spot — Lovere's scene is small and seasonal.",
              kind: "pizza",
              maps: "Piazza Tredici Martiri, Lovere",
            },
          ],
          tips: [
            "Bus Line C from Bergamo Autostazione runs roughly hourly (~75 min).",
            "The lake ferry timetable is seasonal — check navigazionelagoiseo.it before each trip.",
            "Lake fish (perch risotto, marinated sardines) is the local speciality — look for it on menus.",
          ],
        },
        {
          id: "lake-walks",
          name: "Lake walks & swims",
          base: "Lovere",
          blurb:
            "The reason to come: flat shaded lakeside paths for hot days, a couple of real climbs, and some of the best wild swimming in Lombardy.",
          places: [
            {
              name: "Baia del Bögn",
              blurb:
                "Dark cliffs over turquoise water near Riva di Solto — nicknamed 'Thailand an hour from Milan'. A small pebbly free beach, quiet in the mornings, reached by a ~1km lakeside promenade from Riva di Solto.",
              maps: "Bogn di Zorzino, Riva di Solto",
              url: "https://visitlakeiseo.info/en/",
              tags: ["swim", "nature", "view", "photography"],
            },
            {
              name: "Vello–Toline path",
              blurb:
                "A flat, traffic-free path carved into the rock with tunnels and lookouts on the eastern shore — shaded, breezy, and ideal for all five on a hot day. Reach it by ferry or train across the lake.",
              maps: "Vello, Marone",
              url: "https://visitlakeiseo.info/en/",
              tags: ["walk", "nature", "view"],
            },
            {
              name: "Antica Strada Valeriana",
              blurb:
                "A 24km ancient mule path through stone hamlets. Do a single stage and ride the lakeside railway back — Stage 3 (Pisogne–Pilzone) is the scenic pick.",
              maps: "Antica Strada Valeriana, Pisogne",
              url: "https://visitlakeiseo.info/en/",
              tags: ["walk", "history", "nature"],
            },
            {
              name: "Monte Colombina (from Bossico)",
              blurb:
                "A longer climb from the Bossico plateau through forest to open hills and a summit cross — the proper mountain day.",
              maps: "Monte Colombina, Bossico",
              url: "https://visitlakeiseo.info/en/",
              tags: ["walk", "nature", "view"],
            },
          ],
          tips: [
            "Morning for the climbs, afternoon for the swims — July sun is fierce.",
            "Bossico is reachable from Lovere by the local Line L bus.",
          ],
        },
        {
          id: "monte-isola",
          name: "Day trips on the lake",
          base: "Lovere",
          blurb:
            "Two easy ferry hops that make a day each — a car-free island and a frescoed church across the water.",
          places: [
            {
              name: "Monte Isola",
              photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Monte%20Isola.jpg?width=600",
              blurb:
                "Europe's largest lake island, car-free, reached by cheap ferry. Walk or rent bikes, climb to the Madonna della Ceriola sanctuary for the view, and eat lake fish and salami in the fishing villages.",
              maps: "Monte Isola, Lago d'Iseo",
              url: "https://visitlakeiseo.info/en/arts-and-culure/monte-isola/",
              tags: ["walk", "swim", "food", "view", "nature"],
            },
            {
              name: "Santa Maria della Neve, Pisogne",
              photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Santa%20Maria%20della%20Neve%20Pisogne%201.JPG?width=600",
              blurb:
                "The 'Sistine Chapel of the Poor' — Romanino frescoes in a small church a quick ferry hop from Lovere.",
              maps: "Santa Maria della Neve, Pisogne",
              url: "https://visitlakeiseo.info/en/",
              tags: ["art", "history", "culture"],
            },
          ],
          tips: [
            "Lake ferries are cheap (about €4–6) — buy at the jetty.",
            "Lovere↔Pisogne is the easiest crossing for the frescoes.",
          ],
        },
      ],
    },

    {
      id: "milano",
      name: "Milan day-trip",
      tagline: "One day, mostly on foot, around the Duomo",
      towns: [
        {
          id: "milano-centro",
          name: "Around the Duomo",
          base: "Milan (day trip by train)",
          blurb:
            "A frequent regional train from Bergamo puts you in the centre. Almost everything clusters tightly around the Duomo, so a single day on foot works — picked with the teenagers' fashion, art, and football interests in mind.",
          places: [
            {
              name: "Duomo & rooftop terraces",
              photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Duomo_di_Milano.JPG?width=600",
              blurb:
                "Walk among the spires on the roof, not just the square below — buy the terraces ticket. The signature Milan moment.",
              maps: "Duomo di Milano",
              url: "https://www.duomomilano.it/en/",
              tags: ["culture", "history", "view", "photography"],
            },
            {
              name: "Galleria Vittorio Emanuele II",
              photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Veduta%20della%20Galleria%20Vittorio%20Emanuele%20II%20da%20piazza%20del%20Duomo%2C%20Milano.jpg?width=600",
              blurb:
                "The glass-roofed 19th-century arcade beside the Duomo — Prada, Versace, and the grandest window-shopping in Italy.",
              maps: "Galleria Vittorio Emanuele II, Milano",
              url: "https://www.yesmilano.it/en",
              tags: ["shop", "culture", "view"],
            },
            {
              name: "Quadrilatero della Moda",
              photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Via%20Monte%20Napoleone%2C%20Milan%2C%20Italy.jpg?width=600",
              blurb:
                "The fashion quarter — Via Montenapoleone and around. For the girls' fashion interest and the boy's eye for clothes, this is the heart of it.",
              maps: "Via Montenapoleone, Milano",
              url: "https://www.yesmilano.it/en/fashion-shopping",
              tags: ["shop"],
            },
            {
              name: "San Siro Stadium",
              photo: "https://commons.wikimedia.org/wiki/Special:FilePath/San%20Siro%20Stadio%20in%202025%2001.jpg?width=600",
              blurb:
                "The Milan football cathedral, with a museum and tour — a draw for the football fan if there's appetite for a tram ride out from the centre.",
              maps: "Stadio San Siro, Milano",
              url: "https://sansirostadium.com/?lang=en",
              tags: ["football"],
            },
            {
              name: "Pinacoteca di Brera",
              photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Milano%20Pinacoteca%20di%20Brera1.JPG?width=600",
              blurb:
                "A deeper, quieter art hit than the crowds expect, in the arty Brera district — good if the day leans cultural.",
              maps: "Pinacoteca di Brera, Milano",
              url: "https://pinacotecabrera.org/en/",
              tags: ["art", "culture"],
            },
          ],
          tips: [
            "Book Last Supper tickets weeks ahead if you want it — they sell out fast.",
            "Trams 1 and 10 are sightseeing routes in disguise.",
          ],
        },
      ],
    },
  ],
};
