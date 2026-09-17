/**
 * Shared page chrome for the inner pages: navigation, mobile menu, contact
 * details, footer columns and the enquiry form's selects.
 */
import * as data from './data.js';

const $ = (s) => document.querySelector(s);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const setText = (sel, text, href) => {
  const n = $(sel);
  if (!n) return;
  if (text != null) n.textContent = text;
  if (href) n.href = href;
};

/**
 * @param {object} opts
 * @param {string} [opts.preselectProject] project name to pre-select in the form
 */
export function renderChrome(opts = {}) {
  const links = $('#navLinks');
  const menu = $('#menuList');
  data.nav.forEach((item, i) => {
    // inner pages link back to the homepage sections, except About which has its own page
    const href = item.href === '#home' ? 'index.html'
      : item.href === '#about' ? 'about.html'
      : `index.html${item.href}`;
    if (links) {
      const a = el('a', null, item.label);
      a.href = href;
      links.append(a);
    }
    if (menu) menu.append(el('li', null, `<a href="${href}"><b>0${i + 1}</b>${item.label}</a>`));
  });
  if (menu) menu.append(el('li', null, `<a href="#interest"><b>0${data.nav.length + 1}</b>Contact Us</a>`));

  const c = data.company;
  const addr = $('#menuAddress');
  if (addr) addr.innerHTML = c.address.replace(/, /g, ',<br/>');
  setText('#menuPhone', c.phone, `tel:${c.phoneHref}`);
  setText('#menuEmail', c.email, `mailto:${c.email}`);
  setText('#cAddress', c.address);
  setText('#cPhone', c.phone, `tel:${c.phoneHref}`);
  setText('#cEmail', c.email, `mailto:${c.email}`);
  setText('#fAddress', c.address);
  setText('#fPhoneLink', c.phone, `tel:${c.phoneHref}`);
  setText('#fEmailLink', c.email, `mailto:${c.email}`);
  setText('#fSite', c.site);
  setText('#footerBlurb', c.blurb);
  setText('#year', String(new Date().getFullYear()));

  const cols = $('#footerCols');
  if (cols) {
    Object.entries(data.footerLinks).forEach(([title, items]) => {
      cols.append(el('div', null, `<p class="menu__label">${title}</p><ul>${
        items.map(([label, href]) => {
          const to = href === '#interest' ? '#interest'
            : href === '#about' ? 'about.html'
            : `index.html${href}`;
          return `<li><a href="${to}">${label}</a></li>`;
        }).join('')
      }</ul>`));
    });
  }

  const sel = $('#fProject');
  if (sel) {
    ['Not sure yet', ...data.projects.map((p) => p.name)].forEach((n) => sel.append(new Option(n, n)));
    if (opts.preselectProject) sel.value = opts.preselectProject;
  }
  const code = $('#fCode');
  if (code) {
    ['+92 PK', '+971 AE', '+966 SA', '+44 UK', '+1 US', '+61 AU', '+60 MY', '+90 TR', '+86 CN']
      .forEach((c2) => code.append(new Option(c2, c2.split(' ')[0])));
  }
}
