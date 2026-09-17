/**
 * Content for the ABS Developers build.
 * Structure, project specifications and contact details mirror the company's
 * own homepage; descriptive copy here is written for this build.
 */

export const company = {
  name: 'ABS Developers',
  legal: 'ABS Developers (Pvt.) Ltd.',
  blurb: 'A pioneer in Shariah-compliant real estate, building tomorrow’s skylines with uncompromising quality.',
  address: 'Ground Floor, Pearl One Tower, Iqbal Block, Bahria Town, Lahore',
  phone: '03-222-333-332',
  phoneHref: '+923222333332',
  email: 'info@abs-developers.com',
  site: 'abs-developers.com'
};

/* primary navigation, matching the live site */
export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'Our Projects', href: '#projects' },
  { label: 'Careers', href: '#careers' },
  { label: 'About Us', href: '#about' },
  { label: 'Shariah Compliant', href: '#shariah' },
  { label: 'Blog', href: '#blog' }
];

export const footerLinks = {
  'Quick Links': [
    ['Home', '#home'], ['Our Projects', '#projects'], ['Careers', '#careers'],
    ['About Us', '#about'], ['Shariah Compliant', '#shariah'], ['Contact Us', '#interest']
  ],
  Resources: [
    ['Search', '#projects'], ['Our Team', '#about'], ['Blog', '#blog']
  ]
};

export const hero = {
  eyebrow: 'Welcome',
  lead: 'To ABS Developers',
  title: ['Pakistan’s leading', 'real estate', 'developer.'],
  sub: 'Premium properties, transparent investment and world-class construction — delivered across Lahore, Islamabad, Karachi and Sialkot.',
  ctas: [
    { label: 'Schedule a 1-1 Meeting', href: '#interest', primary: true },
    { label: 'Explore Projects', href: '#projects' }
  ]
};

export const marquee = [
  'Burj Quaid', 'Pearl One Courtyard', 'ABS Central', 'Pearl One Capital',
  'ABS Mall & Residency', 'Sialkot Central', 'Pearl One Royal', '100% Shariah Compliant'
];

/* Status badges follow the live site: FLAGSHIP / AVAILABLE / POSSESSION READY / DELIVERED */
export const projects = [
  {
    id: 'burj-quaid', name: 'Burj Quaid', badge: 'FLAGSHIP',
    stats: [['941', 'ft Height'], ['82', 'Storeys']],
    city: 'Karachi', location: 'DHA City Karachi',
    note: 'Pakistan’s tallest tower — a supertall landmark rising 941 feet over DHA City Karachi.',
    tags: ['Commercial Spaces', 'Luxury Apartments'], accent: '#d9a441', seed: 1
  },
  {
    id: 'abs-executive', name: 'ABS Executive', badge: 'AVAILABLE',
    stats: [['23', 'Storeys']],
    city: 'Lahore', location: 'Opposite DHA Phase 5, Ring Road Interchange',
    note: 'A ground-plus-23 storey address on the Ring Road interchange, facing DHA Phase 5.',
    tags: ['Commercial Spaces', 'Luxury Apartments'], accent: '#d9a441', seed: 2
  },
  {
    id: 'abs-central', name: 'ABS Central', badge: 'AVAILABLE',
    stats: [['23', 'Storeys']],
    city: 'Lahore', location: 'Ring Road Interchange, Bahria Town Lahore',
    note: 'Twenty-three storeys of apartments and commercial floors at the Bahria Town interchange.',
    tags: ['Commercial Spaces', 'Luxury Apartments'], accent: '#d9a441', seed: 3
  },
  {
    id: 'poc-1', name: 'Pearl One Courtyard 1', badge: 'AVAILABLE',
    stats: [['23', 'Storeys']],
    city: 'Lahore', location: 'Prime location, Bahria Town Lahore',
    note: 'The first tower of the Courtyard trio, on a prime Bahria Town plot.',
    tags: ['Commercial Spaces', 'Luxury Apartments'], accent: '#d9a441', seed: 4
  },
  {
    id: 'poc-2', name: 'Pearl One Courtyard 2', badge: 'AVAILABLE',
    stats: [['300+', 'ft Height'], ['45', 'Storeys']],
    city: 'Lahore', location: 'Bahria Town Lahore',
    note: 'Punjab’s tallest tower — forty-five storeys, with duplex penthouses at the crown.',
    tags: ['University of Lahore', 'Luxury Apartments', 'Duplex Penthouses'], accent: '#d9a441', seed: 5
  },
  {
    id: 'poc-3', name: 'Pearl One Courtyard 3', badge: 'AVAILABLE',
    stats: [['31', 'Storeys']],
    city: 'Lahore', location: 'Prime location, Bahria Town Lahore',
    note: 'Thirty-one storeys completing the Courtyard cluster.',
    tags: ['Commercial Spaces', 'Luxury Apartments'], accent: '#d9a441', seed: 6
  },
  {
    id: 'pearl-one-premium', name: 'Pearl One Premium', badge: 'AVAILABLE',
    stats: [['23', 'Storeys']],
    city: 'Lahore', location: 'Prime location, Bahria Town Lahore',
    note: 'Residences and a dedicated retail podium across twenty-three storeys.',
    tags: ['Commercial Spaces', 'Luxury Apartments'], accent: '#d9a441', seed: 7
  },
  {
    id: 'pearl-one-capital', name: 'Pearl One Capital', badge: 'AVAILABLE',
    stats: [['300+', 'ft Height'], ['23', 'Storeys']],
    city: 'Islamabad', location: 'DHA Phase 2, Islamabad',
    note: 'The company’s capital-city address, rising over 300 feet in DHA Phase 2.',
    tags: ['Commercial Spaces', 'Luxury Apartments'], accent: '#d9a441', seed: 8
  },
  {
    id: 'sialkot-central', name: 'Sialkot Central', badge: 'AVAILABLE',
    stats: [['23', 'Floors']],
    city: 'Sialkot', location: 'Prime location, Sialkot',
    note: 'Twenty-three floors bringing the Central format to Sialkot.',
    tags: ['Commercial Spaces', 'Luxury Apartments'], accent: '#d9a441', seed: 9
  },
  {
    id: 'pearl-one-royal', name: 'Pearl One Royal', badge: 'AVAILABLE',
    stats: [['23', 'Storeys']],
    city: 'Lahore', location: 'Bahria Orchard Phase 2',
    note: 'A twenty-three storey residential and commercial tower in Bahria Orchard.',
    tags: ['Commercial Spaces', 'Luxury Apartments'], accent: '#d9a441', seed: 10
  },
  {
    id: 'mall-residency-2', name: 'ABS Mall & Residency 2', badge: 'AVAILABLE',
    stats: [['15', 'Storeys']],
    city: 'Lahore', location: 'Ring Road Interchange, Bahria Town Lahore',
    note: 'The second Mall & Residency block — fifteen storeys over retail.',
    tags: ['Commercial Spaces', 'Luxury Apartments'], accent: '#d9a441', seed: 11
  },
  {
    id: 'mall-residency-1', name: 'ABS Mall & Residency 1', badge: 'POSSESSION READY',
    stats: [['9', 'Storeys']],
    city: 'Lahore', location: 'Ring Road Interchange, Bahria Town Lahore',
    note: 'Nine storeys of homes above a working mall — keys in hand.',
    tags: ['Commercial Spaces', 'Luxury Apartments'], accent: '#c9a25e', seed: 12
  },
  {
    id: 'pearl-one-tower', name: 'Pearl One Tower', badge: 'DELIVERED',
    stats: [['7', 'Storeys']],
    city: 'Lahore', location: 'Prime location, Bahria Town Lahore',
    note: 'Completed, handed over, and now home to the ABS head office.',
    tags: ['Mixed-Use', 'Retail Spaces', 'Community Hub'], accent: '#c9a25e', seed: 13
  }
];

/* "Experience Our Vision" — the live site runs walkthrough films here */
export const vision = {
  title: 'Experience Our Vision',
  sub: 'Take a virtual tour of our latest developments and architectural excellence.',
  items: [
    { name: 'Pearl One Courtyard', sub: 'Flagship luxury residential development', len: '0:55', seed: 5 },
    { name: 'Burj Quaid', sub: 'Pakistan’s tallest tower, DHA City Karachi', len: '1:20', seed: 1 },
    { name: 'ABS Mall & Residency', sub: 'Retail and residences, Bahria Town Lahore', len: '0:48', seed: 12 },
    { name: 'Pearl One Capital', sub: 'DHA Phase 2, Islamabad', len: '1:05', seed: 8 }
  ]
};

export const value = {
  badge: '100% Shariah Compliant',
  title: 'Where Vision Meets Value.',
  text: 'Iconic residential, commercial and mixed-use developments built to create lasting value for investors and modern lifestyles for families — every one of them quality-led, transparent and fully Shariah-compliant.',
  points: ['Free Consultation', 'Prime Locations', 'Guaranteed ROI']
};

export const stats = [
  { value: 13, suffix: '+', label: 'Landmark projects', note: 'Delivered and under development' },
  { value: 941, suffix: ' ft', label: 'Tallest tower', note: 'Burj Quaid, DHA City Karachi' },
  { value: 4, suffix: '', label: 'Cities', note: 'Lahore · Islamabad · Karachi · Sialkot' },
  { value: 100, suffix: '%', label: 'Shariah compliant', note: 'No riba, no hidden charges' }
];

export const pillars = [
  { title: 'No riba on instalments', text: 'Payment plans are priced once — spreading them over time never adds interest.' },
  { title: 'No hidden charges', text: 'What is quoted at booking is what is settled at possession.' },
  { title: 'Transparent investment', text: 'Project status, timelines and payment structure are on the table from day one.' },
  { title: 'Documented compliance', text: 'Structures are reviewed so the whole chain stays compliant, not just the brochure.' }
];

export const careers = {
  title: 'Build your career with ABS',
  text: 'From chairman and CEO to managing directors and engineers, ABS runs on in-house expertise across design, construction, sales and client service.',
  roles: ['Civil & Structural Engineering', 'Architecture & Design', 'Sales & Investment Advisory', 'Project Management']
};

export const blog = [
  { tag: 'Investment', title: 'Why investors choose Shariah-compliant developments', read: '4 min read' },
  { tag: 'Projects', title: 'Inside Burj Quaid: building Pakistan’s tallest tower', read: '6 min read' },
  { tag: 'Market', title: 'What on-time possession actually requires', read: '5 min read' }
];

/* ------------------------------------------------------------------
 * Project pages. Specifications, approvals, travel times, location
 * features and amenities are the developments' published details.
 * ------------------------------------------------------------------ */
export const projectPages = {
  'burj-quaid': {
    id: 'burj-quaid',
    name: 'Burj Quaid',
    eyebrow: 'A Landmark Above the City',
    tagline: 'Where Pakistan Touches the Sky',
    standfirst: 'A tribute to the enduring legacy of Quaid-e-Azam Muhammad Ali Jinnah, by ABS Developers.',
    intro: 'Rising 941 feet over DHA City Karachi, Burj Quaid is set to become Pakistan’s tallest skyscraper — eighty-two storeys of apartments, offices and hospitality wrapped around a single vertical address.',
    seed: 1,
    accent: '#d9a441',
    specs: [
      ['941', 'ft Height'],
      ['82', 'Storeys'],
      ['DHA City', 'Karachi']
    ],
    approvals: ['CAA Approved', 'PAA Approved', 'DHA Approved'],
    marketedBy: 'Exclusively marketed by Discover Pakistan',
    travel: {
      title: 'Travel times after the Malir Expressway completes',
      items: [
        ['25 mins', 'from Clifton'],
        ['25 mins', 'from the Airport'],
        ['25 mins', 'from Shahra-e-Faisal'],
        ['25 mins', 'from Sea View']
      ]
    },
    location: {
      title: 'Strategically located in DHA City Karachi',
      text: 'Direct links to the major highways, and minutes from the commercial districts, schools, healthcare and recreation planned across DHA City.'
    },
    landmarks: [
      ['22-lane entrance', 'The widest gateway of any Pakistani housing scheme.'],
      ['10-lane roads', 'Arterial roads sized for the city DHA City will become.'],
      ['Latest sewerage system', 'Modern treatment and drainage infrastructure.'],
      ['Solar parks', 'On-site solar generation within the scheme.'],
      ['Lucky power plant', 'Dedicated power generation nearby.'],
      ['Largest golf course', 'A championship-scale course inside the development.'],
      ['Water park', 'Family recreation minutes from the tower.'],
      ['Adventure park', 'Outdoor activity grounds within DHA City.']
    ],
    amenities: [
      '24/7 room service & assistance', 'Private pools (select units)', 'Double-height lobby',
      'High-speed elevators', 'Smart automated complex', 'Executive lounge', 'Library',
      'Tennis court', 'Sauna & wellness spa', 'Bowling alley', 'Fitness & gym centre',
      'Rooftop sky lounge', 'Landscaped green courtyards', 'Children’s play area',
      'Co-working spaces', 'Smart home integration'
    ],
    galleries: [
      { title: 'Exterior views', sub: 'The tower on the DHA City skyline', tiles: 3 },
      { title: 'Apartment interiors', sub: 'Living, dining, kitchen and bedrooms', tiles: 3 },
      { title: 'Private residential lobby', sub: 'Arrival and reception levels', tiles: 2 }
    ]
  }
};

projectPages['pearl-one-capital'] = {
  id: 'pearl-one-capital',
  name: 'Pearl One Capital',
  eyebrow: 'Pre-launching soon',
  tagline: 'The capital address',
  standfirst: 'Luxury apartments, smart shops and more than a hundred amenities, coming to DHA Islamabad.',
  intro: 'Pearl One Capital brings the Pearl One format to the capital: over 300 residential units above a retail podium, with pre-launch registration now open.',
  seed: 8,
  accent: '#d9a441',
  specs: [
    ['300+', 'Residential units'],
    ['100+', 'Amenities'],
    ['DHA', 'Islamabad']
  ],
  approvals: ['Pre-launch registration open'],
  location: {
    title: 'DHA Phase 2, Islamabad',
    text: 'A ground-plus-23 storey tower in DHA Islamabad, with apartment stock facing both the courtyard and the ring road.'
  },
  /* residential mix — sizes as published */
  units: [
    { type: '1-bed apartment', size: '500 sq ft', note: 'The entry residence: bedroom, living room, kitchen and washroom.' },
    { type: '1-bed, ring road facing', size: '540 sq ft', note: 'The same layout on the ring-road elevation.' },
    { type: '2-bed apartment', size: '800 sq ft', note: 'A larger plan with bedroom, living, kitchen and washroom.' },
    { type: '3-bed luxury apartment', size: '1,600 sq ft', note: 'Three bedrooms and three bathrooms.' },
    { type: '1-bed penthouse', size: '1,350 sq ft', note: 'Upper-level living with long views across the capital.' },
    { type: '2-bed penthouse', size: '2,305 sq ft', note: 'The largest residence in the tower.' }
  ],
  commercial: [
    { type: 'Ground floor mall retail', size: '170 sq ft', note: 'Modern outlets on the primary retail level.' },
    { type: 'First floor retail & office', size: '150 sq ft', note: 'Suited to corporate and service businesses.' },
    { type: 'Lower ground retail', size: '150 sq ft', note: 'A further run of outlets below the mall floor.' }
  ],
  amenities: [
    'Infinity swimming pool', 'Children’s play areas', 'Landscaped parks', 'CCTV surveillance',
    'Indoor gym', 'Terrace', 'BBQ & dining area', 'Courtyard', '24/7 room & grocery service',
    'Private pools (select units)', 'Double-height private residential lobby', '6+ lifts',
    'Fully automated complex', 'Library', 'Tennis court', 'High-speed elevators',
    'Executive lounge', 'Sauna', 'Daycare', 'Bowling alley'
  ],
  booking: {
    title: 'Booking process',
    note: 'Expression of Interest deposit: PKR 500,000.',
    steps: [
      { title: 'Submit the EOI form', text: 'Applicant details, property preference and the PKR 500,000 deposit — online or at the ABS Developers office.' },
      { title: 'Submit payment evidence', text: 'Pay by bank transfer, cheque or cash against the official account details, then send the receipt to the helpline or installments inbox.' },
      { title: 'Down payment within 15 days', text: 'Complete the booking by paying the down payment within fifteen days of the EOI.' },
      { title: 'Confirmation & documentation', text: 'Booking is confirmed and the final documentation is issued.' }
    ],
    contacts: [
      ['WhatsApp helpline', '+92 3000 955 955', 'tel:+923000955955'],
      ['Installments', 'installment@abs-developers.com', 'mailto:installment@abs-developers.com']
    ]
  },
  galleries: [
    { title: 'The tower', sub: 'Exterior and approach', tiles: 3 },
    { title: 'Floor plans', sub: 'One bed · two bed · three bed · penthouse', tiles: 4 }
  ]
};

/* --- Bahria Town Lahore portfolio ------------------------------------ */
projectPages['pearl-one-premium'] = {
  id: 'pearl-one-premium', name: 'Pearl One Premium', seed: 7, accent: '#d9a441',
  eyebrow: 'A modern landmark in Bahria Town',
  tagline: 'Ultra-luxury, twenty-five storeys up',
  standfirst: 'Residences, penthouses and a shopping mall on one of Bahria Town Lahore’s most central plots.',
  specs: [['G+25', 'Storeys'], ['300+', 'Residential units'], ['Takbeer Block', 'Bahria Town']],
  location: {
    title: 'Prime location in Bahria Town Lahore',
    text: 'Pearl One Premium stands in Takbeer Block 1, on the site where the old Food Court Cinema once stood — a central address with everything a full lifestyle needs around it.'
  },
  unitsTitle: 'Five ways to live here.',
  unitsNote: 'More than three hundred residences, from one-bed apartments to three-bedroom penthouses on the upper floors.',
  units: [
    { type: '1-bed apartment' }, { type: '2-bed apartment' },
    { type: '3-bed luxury apartment' }, { type: '2-bed penthouse' }, { type: '3-bed penthouse' }
  ],
  commercialTitle: 'Retail across three levels.',
  commercial: [
    { type: 'Ground floor outlets', note: 'The primary retail frontage of the mall.' },
    { type: 'First floor outlets', note: 'A second run of retail above the ground level.' },
    { type: 'Second floor upwards', note: 'Further commercial space on the upper mall floors.' }
  ],
  landmarksTag: 'Building features', landmarksTitle: 'How the building works.',
  landmarks: [
    ['Ground + 25 storeys', 'The full height of the tower above the mall levels.'],
    ['Dedicated basement parking', 'Reserved for residents.'],
    ['Separate entrances', 'Mall visitors and residents arrive apart, for privacy.'],
    ['1, 2 and 3-bed apartments', 'Spacious plans through the residential floors.'],
    ['Luxury penthouses', 'Upper floors, with the long views.'],
    ['Shopping mall', 'A state-of-the-art mall on the lower floors.']
  ],
  amenities: [
    'Infinity swimming pool', 'Children’s play areas', 'Landscaped parks', 'CCTV surveillance',
    'Indoor gym', 'Terrace', 'BBQ & dining area', 'Courtyard', 'Secure basement parking',
    '24/7 security', 'High-speed elevators', 'Backup power system', 'Children’s play zone',
    'Rooftop leisure area', 'Landscaped surroundings'
  ],
  galleries: [{ title: 'The building', sub: 'Exterior and mall levels', tiles: 3 }]
};

projectPages['pearl-one-tower'] = {
  id: 'pearl-one-tower', name: 'Pearl One Tower', seed: 13, accent: '#d9a441',
  eyebrow: 'Delivered · immediate possession',
  tagline: 'At the heart of Bahria Town',
  standfirst: 'The project that set the standard — completed, handed over, and now home to the ABS head office.',
  specs: [['G+7', 'Storeys'], ['150+', 'Residential units'], ['Delivered', 'Possession ready']],
  approvals: ['Immediate possession'],
  location: {
    title: 'Strategically located at the heart of Bahria Town',
    text: 'One of Lahore’s most sought-after residential locations, with direct access to the main roads and the commercial and lifestyle destinations around it.'
  },
  landmarksTag: 'Location features', landmarksTitle: 'Excellent connectivity.',
  landmarks: [
    ['Major roads', 'Prime location with easy access to the main road network.'],
    ['Commercial destinations', 'Close to the commercial and lifestyle hubs of Bahria Town.'],
    ['Across Lahore', 'Well connected to the key areas of the city.'],
    ['Peaceful surroundings', 'Premium residential facilities in a quiet setting.']
  ],
  unitsTitle: 'Three apartment types.',
  unitsNote: 'Over one hundred and fifty residences across the tower.',
  units: [
    { type: '1-bed apartment' }, { type: '2-bed apartment' }, { type: '3-bed luxury apartment' }
  ],
  amenities: [
    '24/7 room service & assistance', 'Private pools (select units)', 'Double-height lobby',
    'High-speed elevators', 'Smart automated complex', 'Executive lounge', 'Library',
    'Tennis court', 'Sauna & wellness spa', 'Bowling alley', 'Fitness & gym centre',
    'Rooftop sky lounge', 'Landscaped green courtyards', 'Children’s play area',
    'Co-working spaces', 'Smart home integration'
  ],
  galleries: [
    { title: 'Exterior views', sub: 'The tower in Bahria Town', tiles: 3 },
    { title: 'Amenities', sub: 'Shared spaces through the building', tiles: 3 },
    { title: 'Penthouse interiors', sub: 'The upper-floor residences', tiles: 2 }
  ]
};

projectPages['mall-residency-1'] = {
  id: 'mall-residency-1', name: 'ABS Mall & Residency 1', seed: 12, accent: '#d9a441',
  eyebrow: 'Possession ready',
  tagline: 'Premier living and shopping',
  standfirst: 'Homes above a working mall at the Ring Road interchange of Bahria Town Lahore.',
  specs: [['G+9', 'Storeys'], ['140+', 'Residential units'], ['Ring Road', 'Interchange']],
  approvals: ['Possession ready'],
  location: {
    title: 'Prime location in Bahria Town Lahore',
    text: 'Opposite ABS Mall & Residency 2, near the Ring Road interchange — easy access to the main roads and the destinations around them.'
  },
  unitsTitle: 'Four ways to live here.',
  unitsNote: 'More than one hundred and forty residences above the mall floors.',
  units: [
    { type: '1-bed apartment' }, { type: '2-bed apartment' },
    { type: '3-bed apartment' }, { type: '2-bed penthouse' }
  ],
  commercialTitle: 'The shopping mall.',
  commercial: [
    { type: 'Ground floor mall retail', size: '170 sq ft', note: 'Modern outlets on the primary retail level.' },
    { type: 'First floor retail & offices', size: '150 sq ft', note: 'Suited to corporate and service businesses.' },
    { type: 'Lower ground retail', size: '150 sq ft', note: 'A further run of outlets below the mall floor.' }
  ],
  amenities: [
    'Infinity swimming pool', 'Children’s play areas', 'Landscaped parks', 'CCTV surveillance',
    'Indoor gym', 'Terrace', 'BBQ & dining area', 'Courtyard', 'Basement car parking',
    '24/7 security', 'Backup power system', 'Rooftop leisure area', 'Landscaped surroundings'
  ],
  galleries: [{ title: 'Mall & residences', sub: 'Exterior and retail levels', tiles: 3 }]
};

projectPages['mall-residency-2'] = {
  id: 'mall-residency-2', name: 'ABS Mall & Residency 2', seed: 11, accent: '#d9a441',
  eyebrow: 'A blend of shopping and modern living',
  tagline: 'Premium apartments in Bahria Town Lahore',
  standfirst: 'Apartments, penthouses and retail at the Ring Road interchange — built for families and investors alike.',
  specs: [['G+15', 'Storeys'], ['1–3 bed', 'Apartments'], ['Ring Road', 'Interchange']],
  location: {
    title: 'Prime location for premium living',
    text: 'At the Ring Road interchange of Bahria Town Lahore — one of the city’s most accessible addresses, and one with real room for capital appreciation.'
  },
  unitsTitle: 'Layouts for every household.',
  unitsNote: 'Spacious plans, modern interiors and panoramic views across the development.',
  units: [
    { type: '1-bed apartment', note: 'Ideal for singles or couples.' },
    { type: '2-bed apartment', note: 'A family plan with room to grow.' },
    { type: '3-bed apartment', note: 'The largest standard residence.' },
    { type: 'Penthouses', note: 'Upper-floor living with panoramic views.' }
  ],
  landmarksTag: 'Investment benefits', landmarksTitle: 'Why investors look here.',
  landmarks: [
    ['Rental income', 'Strong potential for rental yield in one of Pakistan’s most desirable markets.'],
    ['Capital appreciation', 'Significant upside from the interchange location.'],
    ['Premium lifestyle', 'Built for end-users and tenants alike.']
  ],
  amenities: [
    'Infinity swimming pool', 'Children’s play areas', 'Landscaped parks', 'CCTV surveillance',
    'Indoor gym', 'Terrace', 'BBQ & dining area', 'Courtyard', 'Basement car parking',
    'Rooftop garden & leisure area', 'Backup power system', 'Smart home features',
    'Landscaped spaces'
  ],
  booking: {
    title: 'How to book',
    note: 'Booking is handled directly by the sales team.',
    steps: [
      { title: 'Call the sales team', text: 'Dial 0300 6666 490 to talk through availability and payment plans.' },
      { title: 'Visit the sales office', text: 'Tour the model apartments and sales office in Bahria Town Lahore.' }
    ],
    contacts: [['Sales', '0300 6666 490', 'tel:+923006666490']]
  },
  galleries: [{ title: 'Floor plans & layouts', sub: 'Designed around different lifestyles', tiles: 4 }]
};

projectPages['pearl-one-royal'] = {
  id: 'pearl-one-royal', name: 'Pearl One Royal', seed: 10, accent: '#d9a441',
  eyebrow: 'Bahria Orchard Phase 2',
  tagline: 'Royal living, twenty-three storeys up',
  standfirst: 'A residential and commercial tower with the schools, hospital and head office of Bahria Town on its doorstep.',
  specs: [['G+23', 'Storeys'], ['Bahria Orchard', 'Phase 2'], ['Lahore', 'Punjab']],
  location: {
    title: 'Strategically located in Bahria Town Lahore',
    text: 'Seamless connectivity to the schools, healthcare, commercial conveniences and community landmarks of Bahria Town.'
  },
  travel: {
    title: 'Travel connectivity to Pearl One Royal',
    items: [
      ['School', 'Bahria International School'],
      ['Head office', 'Bahria Head Office'],
      ['Hospital', 'Bahria Hospital'],
      ['Fuel', 'Petrol pump nearby']
    ]
  },
  landmarksTag: 'Features & nearby landmarks', landmarksTitle: 'Built into Bahria Town.',
  landmarks: [
    ['22-lane entrance', 'The widest gateway of any Pakistani housing scheme.'],
    ['10-lane roads', 'Arterial roads sized for the community they serve.'],
    ['Latest sewerage system', 'Modern treatment and drainage infrastructure.'],
    ['Solar parks', 'On-site solar generation within the scheme.'],
    ['Power plant', 'Dedicated power generation nearby.'],
    ['Golf course', 'A championship-scale course within the development.'],
    ['Water park', 'Family recreation close to the tower.'],
    ['Adventure park', 'Outdoor activity grounds nearby.']
  ],
  amenities: [
    '24/7 room service & assistance', 'Private pools (select units)', 'Double-height lobby',
    'High-speed elevators', 'Smart automated complex', 'Executive lounge', 'Library',
    'Tennis court', 'Sauna & wellness spa', 'Bowling alley', 'Fitness & gym centre',
    'Rooftop sky lounge', 'Landscaped green courtyards', 'Children’s play area',
    'Co-working spaces', 'Smart home integration'
  ],
  galleries: [
    { title: 'Exterior views', sub: 'The tower on approach', tiles: 3 },
    { title: 'Apartment interiors', sub: 'Living, dining and bedrooms', tiles: 3 },
    { title: 'Private residential lobby', sub: 'Arrival and reception levels', tiles: 2 }
  ]
};

/* --- the Courtyard cluster, Bahria Town Lahore ------------------------ */
projectPages['poc-1'] = {
  id: 'poc-1', name: 'Pearl One Courtyard 1', seed: 4, accent: '#d9a441',
  eyebrow: 'A modern living experience',
  tagline: 'Thirty floors, one address',
  standfirst: 'A six-storey mall beneath twenty-three storeys of residences, in the heart of Bahria Town Lahore.',
  specs: [['30', 'Floors total'], ['G+6', 'Storey mall'], ['23', 'Storey residence']],
  location: {
    title: 'Prime location in Bahria Town Lahore',
    text: 'Tower 1 sits in the heart of Bahria Town, within reach of everything: Winter Land and the food court seconds away, the hospital and Imtiaz Mall minutes away, and the main roads just beyond.'
  },
  travel: {
    title: 'Everything, minutes away',
    items: [
      ['10 sec', 'Winter Land & Food Court'],
      ['3 min', 'Bahria Hospital & Imtiaz Mall'],
      ['5 min', 'Ring Road & Raiwind Road'],
      ['5 min', 'Canal Road']
    ]
  },
  unitsTitle: 'Six residence types.',
  unitsNote: 'From one-bed apartments through to double-storey penthouses at the crown of the tower.',
  units: [
    { type: '1-bed apartment' }, { type: '1-bed apartment, alternate plan' },
    { type: '3-bed apartment' }, { type: '2-bed penthouse' },
    { type: '3-bed penthouse' }, { type: 'Double-storey penthouse' }
  ],
  commercialTitle: 'Mall retail and commercial units.',
  commercial: [
    { type: 'Ground floor mall retail', size: '170 sq ft', note: 'Modern outlets on the primary retail level.' },
    { type: 'First floor retail & office', size: '150 sq ft', note: 'Suited to corporate and service businesses.' },
    { type: 'Lower ground retail', size: '150 sq ft', note: 'A further run of outlets below the mall floor.' },
    { type: 'Commercial units, ground to 4th', size: '300 / 466 / 600 sq ft', note: 'Three footprints, available on every floor from ground to fourth.' },
    { type: 'Wide commercial unit', size: '800 sq ft', note: 'Ground floor only — the largest single unit in the mall.' },
    { type: 'Food court unit', size: '300 sq ft', note: 'Fitted space within the food court.' }
  ],
  landmarksTag: 'The building', landmarksTitle: 'What is built in.',
  landmarks: [
    ['Rooftop helipad', 'A helipad at the crown of the tower.'],
    ['Rooftop garden', 'Landscaped leisure space above the residences.'],
    ['Basement parking', 'Dedicated parking below the mall levels.'],
    ['50+ amenities', 'Shared facilities across the development.'],
    ['25-floor residency', 'The residential stack above the mall.'],
    ['Bahria Town Lahore', 'Central to the whole community.']
  ],
  amenities: [
    'Infinity swimming pool', 'Children’s play areas', 'Landscaped parks', 'CCTV surveillance',
    'Indoor gym', 'Terrace', 'BBQ & dining area', 'Courtyard', 'Rooftop garden',
    'Rooftop helipad', 'Basement parking', 'Shopping mall', 'Food court'
  ],
  galleries: [
    { title: 'The development', sub: 'Mall levels and tower', tiles: 3 },
    { title: 'Floor plans', sub: 'One bed · two bed · three bed · penthouse', tiles: 4 }
  ]
};

projectPages['poc-2'] = {
  id: 'poc-2', name: 'Pearl One Courtyard 2', seed: 5, accent: '#d9a441',
  eyebrow: 'Punjab’s tallest residential tower',
  tagline: 'Forty-five storeys of smart living',
  standfirst: 'The tallest residential tower in Punjab, in the heart of Bahria Town Lahore.',
  specs: [['45', 'Storeys'], ['50+', 'Amenities'], ['16+', 'Elevators']],
  approvals: ['Punjab’s tallest residential tower'],
  location: {
    title: 'Perfect location in Bahria Town Lahore',
    text: 'Alongside Tower 1 in the heart of Bahria Town, with the same reach: the food court seconds away, the hospital and Imtiaz Mall minutes away, and the main road network just beyond.'
  },
  travel: {
    title: 'Everything, minutes away',
    items: [
      ['10 sec', 'Winter Land & Food Court'],
      ['3 min', 'Bahria Hospital & Imtiaz Mall'],
      ['5 min', 'Ring Road & Raiwind Road'],
      ['5 min', 'Canal Road']
    ]
  },
  unitsTitle: 'Six ways to live here.',
  unitsNote: 'Apartments through to double-storey penthouses, across forty-five storeys.',
  units: [
    { type: '1-bed apartment' }, { type: '2-bed apartment' }, { type: '3-bed apartment' },
    { type: '2-bed penthouse' }, { type: '3-bed penthouse' }, { type: 'Double-storey penthouse' }
  ],
  landmarksTag: 'The building', landmarksTitle: 'What is built in.',
  landmarks: [
    ['16+ elevators', 'Vertical transport sized for a forty-five storey tower.'],
    ['50+ amenities', 'Shared facilities throughout the development.'],
    ['Basement parking', 'Dedicated resident parking below the tower.'],
    ['Huge residential lobby', 'The arrival level for residents.'],
    ['24/7 CCTV security', 'Continuous monitoring across the building.'],
    ['Bahria Town Lahore', 'Central to the whole community.']
  ],
  amenities: [
    'Infinity swimming pool', 'Children’s play areas', 'Landscaped parks', 'CCTV surveillance',
    'Indoor gym', 'Terrace', 'BBQ & dining area', 'Courtyard', '16+ elevators',
    'Basement parking', 'Residential lobby', '24/7 security'
  ],
  galleries: [
    { title: 'The tower', sub: 'Punjab’s tallest residential building', tiles: 3 },
    { title: 'Floor plans', sub: 'One bed · two bed · three bed · penthouse', tiles: 4 }
  ]
};

projectPages['poc-3'] = {
  id: 'poc-3', name: 'Pearl One Courtyard 3', seed: 6, accent: '#d9a441',
  eyebrow: 'Pearl One Courtyard III',
  tagline: 'Thirty-one storeys, Bahria Town',
  standfirst: 'The third tower of the Courtyard cluster, in one of Lahore’s most secure communities.',
  specs: [['G+31', 'Storeys'], ['Bahria Town', 'Lahore'], ['Courtyard', 'Tower III']],
  location: {
    title: 'Strategically located in Bahria Town Lahore',
    text: 'Seamless connectivity to the Ring Road, healthcare, retail destinations, community spaces and the wider attractions of Lahore.'
  },
  landmarksTag: 'Features & nearby landmarks', landmarksTitle: 'Built into Bahria Town.',
  landmarks: [
    ['22-lane entrance', 'The widest gateway of any Pakistani housing scheme.'],
    ['10-lane roads', 'Arterial roads sized for the community they serve.'],
    ['Latest sewerage system', 'Modern treatment and drainage infrastructure.'],
    ['Solar parks', 'On-site solar generation within the scheme.'],
    ['Power plant', 'Dedicated power generation nearby.'],
    ['Golf course', 'A championship-scale course within the development.'],
    ['Water park', 'Family recreation close to the tower.'],
    ['Adventure park', 'Outdoor activity grounds nearby.']
  ],
  amenities: [
    '24/7 room service & assistance', 'Private pools (select units)', 'Double-height lobby',
    'High-speed elevators', 'Smart automated complex', 'Executive lounge', 'Library',
    'Tennis court', 'Sauna & wellness spa', 'Bowling alley', 'Fitness & gym centre',
    'Rooftop sky lounge', 'Landscaped green courtyards', 'Children’s play area',
    'Co-working spaces', 'Smart home integration'
  ],
  galleries: [
    { title: 'Exterior views', sub: 'The tower on approach', tiles: 3 },
    { title: 'Apartment interiors', sub: 'Living, dining and bedrooms', tiles: 3 },
    { title: 'Private residential lobby', sub: 'Arrival and reception levels', tiles: 2 }
  ]
};
