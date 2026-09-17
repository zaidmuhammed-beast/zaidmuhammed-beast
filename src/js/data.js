/**
 * Public, factual information about ABS Developers (Pvt.) Ltd.
 * Sourced from the company's public profiles and press coverage.
 * All descriptive copy here is written for this build.
 */

export const company = {
  name: 'ABS Developers (Pvt.) Ltd.',
  founded: 2014,
  hq: 'Lahore, Punjab, Pakistan',
  chairman: 'Dr. Subbayal Ikram',
  address: 'Ground Floor, Pearl One Tower, 10A–18A Iqbal Block, Bahria Town, Lahore, Punjab 53720, Pakistan',
  phones: ['+92 320 0000 022', '+92 300 6666 490'],
  email: 'info@abs-developers.com',
  social: {
    facebook: 'https://www.facebook.com/absdevelopers/',
    linkedin: 'https://pk.linkedin.com/company/absdevelopers'
  }
};

export const stats = [
  { value: 16, suffix: '+', label: 'Projects delivered', note: 'Residential, commercial and mixed-use' },
  { value: 9,  suffix: '+', label: 'Years of building', note: 'Founded in Lahore, 2014' },
  { value: 200, suffix: '+', label: 'Team members', note: 'Design, engineering and sales' },
  { value: 0,  suffix: '%', label: 'Interest charged', note: 'Every plan, every project' }
];

export const heroStats = [
  { k: '16+', v: 'Projects delivered' },
  { k: '4', v: 'Cities' },
  { k: '0%', v: 'Riba' }
];

export const marquee = [
  'Burj Quaid', 'Pearl One Capital', 'Pearl One Courtyard', 'Pearl One Premium',
  'ABS Mall & Residency', 'ABS Central', 'Pearl One Tower', '100% Shariah compliant'
];

export const services = [
  {
    n: '01',
    title: 'High-rise residential',
    text: 'Apartment towers from compact one-bed homes to double-storey penthouses, planned around daylight, service cores and real family layouts.',
    tags: ['Apartments', 'Penthouses', 'Sky lounges']
  },
  {
    n: '02',
    title: 'Commercial & retail',
    text: 'Shopping malls, retail outlets, IT zones and corporate floors built as part of the tower rather than bolted on beneath it.',
    tags: ['Malls', 'Outlets', 'Corporate floors']
  },
  {
    n: '03',
    title: 'Mixed-use destinations',
    text: 'Developments that stack a mall, offices and residences into a single address, so residents live above everything they need.',
    tags: ['Mall + residency', 'Mixed-use', 'Master planning']
  },
  {
    n: '04',
    title: 'Shariah-compliant investment',
    text: 'Instalment plans structured with no interest, no penalty riba and no hidden charges at possession — reviewed for compliance end to end.',
    tags: ['0% interest', 'No hidden charges', 'Transparent']
  },
  {
    n: '05',
    title: 'Construction & delivery',
    text: 'Projects are fully pre-planned before the first pour, then self-financed through construction so timelines survive the market.',
    tags: ['Pre-planned', 'In-house build', 'On-time possession']
  },
  {
    n: '06',
    title: 'Aftercare & management',
    text: 'Handover support, facility management and resale guidance for owners long after the possession letter is signed.',
    tags: ['Handover', 'Facilities', 'Resale']
  }
];

export const projects = [
  {
    id: 'burj-quaid',
    name: 'Burj Quaid',
    city: 'Karachi',
    location: 'DHA City Karachi',
    status: 'Under development',
    scale: 'Supertall mixed-use',
    accent: '#d9a441',
    text: 'The company’s most ambitious build: a supertall mixed-use landmark planned for DHA City Karachi with luxury apartments, sky-high penthouses, premium offices, hospitality and an observation level.',
    facts: [['Use', 'Residential · Office · Hotel'], ['Homes', '1, 2 & 3 bed + penthouses'], ['Landmark', 'Observation deck']],
    seed: 1
  },
  {
    id: 'pearl-one-capital',
    name: 'Pearl One Capital',
    city: 'Islamabad',
    location: 'DHA Islamabad',
    status: 'Launching',
    scale: 'Luxury residential & retail',
    accent: '#c9b27a',
    text: 'ABS Developers’ entry into the capital — a luxury residential and retail address in DHA Islamabad planned around a stack of more than a hundred on-site amenities.',
    facts: [['Use', 'Residential · Retail'], ['Amenities', '100+ planned'], ['Market', 'DHA Islamabad']],
    seed: 2
  },
  {
    id: 'pearl-one-courtyard',
    name: 'Pearl One Courtyard',
    city: 'Lahore',
    location: 'Main Boulevard, Tipu Sultan Block, Bahria Town',
    status: 'Under construction',
    scale: 'G+25 mixed-use',
    accent: '#e0b356',
    text: 'A ground-plus-twenty-five storey mixed-use tower on Bahria Town’s main boulevard: a five-level shopping mall, 200+ commercial units, apartments above and double-storey penthouses at the crown.',
    facts: [['Height', 'G + 25 storeys'], ['Commercial', '200+ units'], ['Extras', 'Helipad · Rooftop garden']],
    seed: 3
  },
  {
    id: 'pearl-one-premium',
    name: 'Pearl One Premium',
    city: 'Lahore',
    location: 'Takbeer Block, Bahria Town',
    status: 'Under construction',
    scale: 'G+25 residential & mall',
    accent: '#cfa14a',
    text: 'Built on the old food-court cinema site in Takbeer Block: twenty-five storeys of residences and penthouses over a dedicated shopping mall, with more than three hundred homes in the stack.',
    facts: [['Height', 'G + 25 storeys'], ['Homes', '300+ residences'], ['Retail', 'Dedicated mall']],
    seed: 4
  },
  {
    id: 'abs-mall-residency',
    name: 'ABS Mall & Residency',
    city: 'Lahore',
    location: 'Main entrance, Bahria Town',
    status: 'Delivered',
    scale: 'Mall + residences',
    accent: '#bfa06a',
    text: 'A mall-and-residency landmark at the main entrance of Bahria Town Lahore, pairing apartments and penthouses with retail floors and more than twenty on-site facilities.',
    facts: [['Use', 'Retail · Residential'], ['Facilities', '21+'], ['Position', 'Bahria Town gateway']],
    seed: 5
  },
  {
    id: 'abs-central',
    name: 'ABS Central',
    city: 'Lahore',
    location: 'Ring Road Interchange',
    status: 'Under construction',
    scale: 'High-rise mixed-use',
    accent: '#d7ad5f',
    text: 'A high-rise concept at the Ring Road interchange: premium apartments over commercial shops, served by high-speed lifts, secure parking and smart building security.',
    facts: [['Use', 'Apartments · Shops'], ['Access', 'Ring Road interchange'], ['Systems', 'Smart security']],
    seed: 6
  },
  {
    id: 'pearl-one-tower',
    name: 'Pearl One Tower',
    city: 'Lahore',
    location: 'Iqbal Block, Bahria Town',
    status: 'Delivered',
    scale: 'Residential & commercial',
    accent: '#b9944c',
    text: 'The project that set the standard: a residential and commercial tower completed in under twenty months with possession handed to buyers on schedule. It now houses the company’s head office.',
    facts: [['Delivery', 'Under 20 months'], ['Use', 'Shops · Apartments'], ['Status', 'Handed over']],
    seed: 7
  }
];

export const pillars = [
  { title: 'No riba on instalments', text: 'Payment plans are priced once. Spreading them over time never adds interest.' },
  { title: 'No hidden charges', text: 'What is quoted at booking is what is settled at possession.' },
  { title: 'Self-financed builds', text: 'Construction is funded through the project, not through interest-bearing debt.' },
  { title: 'Documented compliance', text: 'Structures are reviewed so the whole chain — not just the brochure — stays compliant.' }
];

export const steps = [
  { n: '01', title: 'Land & feasibility', text: 'Location, approvals and demand are tested before a single rupee is committed.' },
  { n: '02', title: 'Full pre-planning', text: 'Architecture, MEP, structure and finishes are resolved before construction starts — not during it.' },
  { n: '03', title: 'Compliant structuring', text: 'The payment plan is built interest-free from the start, then reviewed for Shariah compliance.' },
  { n: '04', title: 'Construction', text: 'In-house teams build to the pre-planned programme, self-financed through the construction phase.' },
  { n: '05', title: 'Possession', text: 'Handover on the promised date, with aftercare and facility management from day one.' }
];
