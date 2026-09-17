"""Regenerate every project detail page from one shell.

Usage: python3 tools/generate-project-pages.py
Section content comes from `projectPages` in src/js/data.js at runtime; this
only writes the shells (title, description and data-project per page).
"""
import re
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
shell = open(os.path.join(ROOT, 'burj-quaid.html')).read()

# ---- build a universal body from the existing shell ----
head_start = shell[:shell.index('<main>')]
tail = shell[shell.index('</main>'):]

BODY = '''<main>

<!-- ===== PROJECT HERO ===== -->
<section class="phero" id="top">
  <canvas id="cityCanvas" class="hero__canvas"></canvas>
  <div class="hero__veil"></div>
  <div class="wrap phero__inner">
    <a class="phero__back" href="index.html#projects" data-cursor="Back">← All projects</a>
    <p class="hero__eyebrow reveal-line"><i></i><span id="pEyebrow"></span></p>
    <h1 class="phero__title" id="pTitle"></h1>
    <p class="phero__tagline reveal-line" id="pTagline"></p>
    <p class="phero__stand reveal-line" id="pStand"></p>
    <div class="phero__specs" id="pSpecs"></div>
    <div class="phero__approvals" id="pApprovals"></div>
    <div class="hero__actions reveal-line">
      <a class="btn" href="#interest" data-cursor="Register">Register your interest<i class="btn__arrow">→</i></a>
      <a class="btn btn--ghost" href="#amenities" data-cursor="Look">Explore the project</a>
    </div>
    <p class="phero__market reveal-line" id="pMarket"></p>
  </div>
</section>

<!-- ===== LOCATION ===== -->
<section class="section travel" id="location" data-needs="#locTitle">
  <div class="wrap">
    <header class="sec-head">
      <p class="tag reveal">Location</p>
      <h2 class="h2 split" id="travelTitle">Where it stands.</h2>
    </header>
    <div class="travel__grid" id="travelGrid"></div>
    <div class="locnote reveal">
      <h3 id="locTitle"></h3>
      <p id="locText"></p>
    </div>
  </div>
</section>

<!-- ===== RESIDENTIAL ===== -->
<section class="section units" id="units" data-needs="#unitList">
  <div class="wrap">
    <header class="sec-head">
      <p class="tag reveal">Residential apartments</p>
      <h2 class="h2 split" id="unitsTitle">The residences.</h2>
      <p class="lede reveal" id="unitsNote"></p>
    </header>
    <div class="ugrid" id="unitList"></div>
  </div>
</section>

<!-- ===== COMMERCIAL ===== -->
<section class="section units units--alt" id="commercial" data-needs="#commercialList">
  <div class="wrap">
    <header class="sec-head">
      <p class="tag reveal">Commercial units</p>
      <h2 class="h2 split" id="commercialTitle">Retail and offices.</h2>
    </header>
    <div class="ugrid" id="commercialList"></div>
  </div>
</section>

<!-- ===== GALLERIES ===== -->
<section class="section pgallery" id="gallery" data-needs="#galleryHost">
  <div class="wrap" id="galleryHost"></div>
</section>

<!-- ===== LANDMARKS / FEATURES ===== -->
<section class="section landmarks" id="features" data-needs="#landmarkGrid">
  <div class="wrap">
    <header class="sec-head">
      <p class="tag reveal" id="landmarksTag">Features &amp; nearby landmarks</p>
      <h2 class="h2 split" id="landmarksTitle">What surrounds it.</h2>
    </header>
    <div class="lgrid" id="landmarkGrid"></div>
  </div>
</section>

<!-- ===== AMENITIES ===== -->
<section class="section amenities" id="amenities" data-needs="#amenList">
  <div class="wrap amen__grid">
    <div>
      <p class="tag reveal">Amenities</p>
      <h2 class="h2 split">Everything, in the building.</h2>
      <p class="lede reveal">The shared spaces and services planned through the development.</p>
    </div>
    <ul class="amen__list" id="amenList"></ul>
  </div>
</section>

<!-- ===== BOOKING ===== -->
<section class="section booking" id="booking" data-needs="#bookingSteps">
  <div class="wrap">
    <header class="sec-head">
      <p class="tag reveal">Booking</p>
      <h2 class="h2 split" id="bookingTitle">How to book.</h2>
      <p class="lede reveal" id="bookingNote"></p>
    </header>
    <ol class="bsteps" id="bookingSteps"></ol>
    <ul class="bcontacts" id="bookingContacts"></ul>
  </div>
</section>

<!-- ===== REGISTER INTEREST ===== -->
<section class="section interest" id="interest">
  <div class="wrap interest__grid">
    <div class="interest__left">
      <p class="tag reveal">Register Your Interest</p>
      <h2 class="h2 split">Talk to the sales team.</h2>
      <p class="lede reveal">Complete the form and our team will come back with full project information — availability, payment plans and possession timelines.</p>
      <ul class="contact__info">
        <li class="reveal"><span>Head Office</span><b id="cAddress"></b></li>
        <li class="reveal"><span>Phone</span><b><a id="cPhone" href="#"></a></b></li>
        <li class="reveal"><span>Email</span><b><a id="cEmail" href="#"></a></b></li>
      </ul>
    </div>
    <form class="form reveal" id="form" novalidate>
      <div class="field"><input id="fName" name="name" required placeholder=" " autocomplete="name" /><label for="fName">Full name</label></div>
      <div class="form__row">
        <div class="field field--code"><select id="fCode" name="code" aria-label="Country code"></select><label for="fCode" class="label--static">Code</label></div>
        <div class="field"><input id="fPhone" name="phone" required placeholder=" " inputmode="tel" autocomplete="tel" /><label for="fPhone">Phone number</label></div>
      </div>
      <div class="field"><input id="fEmail" type="email" name="email" required placeholder=" " autocomplete="email" /><label for="fEmail">Email</label></div>
      <div class="field"><select id="fProject" name="project"></select><label for="fProject" class="label--static">Project of interest</label></div>
      <div class="field"><textarea id="fMsg" name="message" rows="3" placeholder=" "></textarea><label for="fMsg">Message</label></div>
      <button class="btn btn--full" type="submit" data-cursor="Send">Submit<i class="btn__arrow">→</i></button>
      <p class="form__note" id="formNote" role="status"></p>
    </form>
  </div>
</section>

'''

pages = {
 'burj-quaid': ("Tallest Building in Karachi — Burj Quaid by ABS Developers",
   "Burj Quaid is Karachi's tallest building — an 82-storey mixed-use tower in DHA City Karachi with luxury apartments, offices and premium amenities."),
 'pearl-one-capital': ("Pearl One Capital — Pre-Launching Soon in DHA Islamabad",
   "Pearl One Capital is coming to DHA Islamabad — 300+ luxury residences, smart retail units and more than a hundred amenities. Pre-launch registration open."),
 'pearl-one-premium': ("Pearl One Premium in Bahria Town Lahore — ABS Developers",
   "Pearl One Premium in Bahria Town Lahore — ultra-luxury 25-storey residences over a shopping mall, with premium amenities throughout."),
 'pearl-one-tower': ("Pearl One Tower — Bahria Town Lahore — ABS Developers",
   "Pearl One Tower in Bahria Town Lahore — delivered and possession ready, with 150+ residences and premium building amenities."),
 'mall-residency-1': ("ABS Mall & Residency — Premier Living & Shopping",
   "ABS Mall & Residency 1 in Bahria Town Lahore — 140+ residences above a shopping mall at the Ring Road interchange. Possession ready."),
 'mall-residency-2': ("ABS Mall & Residency 2 — Bahria Town Lahore",
   "ABS Mall & Residency 2 offers 1, 2 and 3-bedroom apartments and retail units in Bahria Town Lahore, with a rooftop garden, gym and premium amenities."),
 'pearl-one-royal': ("Pearl One Royal — Bahria Orchard Phase 2, Lahore",
   "Pearl One Royal — a 23-storey residential and commercial tower in Bahria Orchard Phase 2, Lahore, with premium amenities and Bahria Town landmarks nearby."),
 'poc-1': ("Pearl One Courtyard — Real Estate Project by ABS Developers",
   "Pearl One Courtyard in Bahria Town Lahore — 30 floors comprising a six-storey mall and a 23-storey residence, with 50+ amenities and a rooftop helipad."),
 'poc-2': ("Pearl One Courtyard 2 — Smart Living in Bahria Town Lahore",
   "Pearl One Courtyard 2 is Punjab's tallest residential tower — 45 storeys in Bahria Town Lahore with 50+ amenities and 16+ elevators."),
 'poc-3': ("Pearl One Courtyard 3 — Bahria Town Lahore — ABS Developers",
   "Pearl One Courtyard III — a 31-storey tower in Bahria Town Lahore with premium amenities and the community's landmarks nearby."),
}

for pid, (title, desc) in pages.items():
    head = head_start
    head = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', head, flags=re.S)
    head = re.sub(r'<meta name="description" content=".*?" />',
                  f'<meta name="description" content="{desc}" />', head, flags=re.S)
    head = re.sub(r'<body data-project="[^"]*">', f'<body data-project="{pid}">', head)
    open(os.path.join(ROOT, f'{pid}.html'),'w').write(head + BODY + tail)
    print('wrote', pid + '.html')
