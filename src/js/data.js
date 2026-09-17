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
