import {company, products, capabilities, milestones, articles} from './content.mjs';
import {readFileSync} from 'node:fs';
const assetMetadata=new Map(JSON.parse(readFileSync(new URL('../public/assets/manifest.json',import.meta.url),'utf8')).map(asset=>[asset.name,asset]));

export const esc = (value='') => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const arrow = '<span aria-hidden="true">&rarr;</span>';
export const link = (href, text, cls='text-link') => `<a class="${cls}" href="${esc(href)}">${esc(text)} ${arrow}</a>`;
export const image = (name, alt, cls='', priority=false, sizes='(max-width: 680px) calc(100vw - 40px), (max-width: 1050px) 50vw, 600px') => {
  const [width,height]=assetMetadata.get(name).dimensions;
  const smallWidth=assetMetadata.get(name).smallDimensions[0];
  return `<img class="${cls}" src="/assets/${name}.webp" srcset="/assets/${name}-small.webp ${smallWidth}w, /assets/${name}.webp ${width}w" sizes="${sizes}" alt="${esc(alt)}" width="${width}" height="${height}" ${priority?'fetchpriority="high"':'loading="lazy"'} decoding="async">`;
};

export function header(active='') {
  const item = (url, title, key) => `<a href="${url}" ${active===key?'aria-current="page"':''}>${title}</a>`;
  return `<a class="skip-link" href="#main">Skip to content</a>
  <div class="utility"><div class="container"><span>Shahzadpur, Ambala · Haryana, India</span><a href="tel:${company.tel}">${company.phone}</a></div></div>
  <header class="site-header"><div class="container header-inner">
    <a class="brand" href="/" aria-label="Sicher Engineering home"><img src="/assets/logo.png" width="165" height="47" alt="Sicher Engineering"></a>
    <button class="menu-toggle" aria-label="Open navigation" aria-controls="main-navigation" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav id="main-navigation" aria-label="Main navigation">
      ${item('/', 'Home','home')}${item('/about-us','Company','about')}
      <div class="product-navigation">${item('/products','Products','products')}<button class="product-toggle" aria-label="Show product categories" aria-controls="product-menu" aria-expanded="false"><svg width="12" height="8" viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>
      <div class="product-menu" id="product-menu" hidden><span class="menu-label">Product range</span>${products.map(p=>`<a href="/${p.slug}">${esc(p.title)} ${arrow}</a>`).join('')}<a class="menu-all" href="/products">View all products ${arrow}</a></div></div>
      ${item('/capabilities','Capabilities','capabilities')}${item('/industries','Industries','industries')}${item('/blog','Insights','blog')}${item('/contact-us','Contact','contact')}
      <a class="button button-small nav-rfq" href="/contact-us#rfq">Request a Quote</a>
    </nav>
  </div></header>`;
}

export function footer() {
  return `<footer class="site-footer"><div class="container footer-grid">
    <div class="footer-company"><a href="/" aria-label="Sicher Engineering home"><img src="/assets/logo.png" alt="Sicher Engineering" width="165" height="47"></a><p>Sheet metal fabrication and engineered systems for railways, electrical and infrastructure applications.</p><span class="legal-name">${company.name}</span></div>
    <div><h2>Company</h2><a href="/about-us">About Sicher</a><a href="/capabilities">Manufacturing capabilities</a><a href="/industries">Industries & applications</a><a href="/blog">Insights</a></div>
    <div><h2>Products</h2>${products.map(p=>`<a href="/${p.slug}">${p.title}</a>`).join('')}</div>
    <div class="footer-contact"><h2>Contact</h2><address>${company.address}</address><a href="tel:${company.tel}">${company.phone}</a><a href="mailto:${company.footerEmail}">${company.footerEmail}</a><a class="footer-email-note" href="/contact-us#email-details">View contact details & email clarification ${arrow}</a></div>
  </div><div class="container footer-bottom"><span>© 2026 ${company.name}</span><a href="/privacy">Privacy & enquiry information</a><a href="#top">Back to top ↑</a></div></footer>`;
}

export function cta(title='Discuss your product or fabrication requirement.', text='Share your application, drawings and quantities with our team.',href='/contact-us#rfq') {
  return `<section class="cta-section"><div class="container cta-inner"><div><h2>${esc(title)}</h2><p>${esc(text)}</p></div><a class="button button-light" href="${esc(href)}">Request a Quote ${arrow}</a></div></section>`;
}

export function breadcrumb(items) {
  return `<nav class="breadcrumbs container" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li>${items.map(([name,url])=>`<li>${url?`<a href="${url}">${esc(name)}</a>`:`<span aria-current="page">${esc(name)}</span>`}</li>`).join('')}</ol></nav>`;
}

export function productTile(p, index=0) {
  return `<article class="product-item"><a class="product-image-link" href="/${p.slug}" aria-label="View ${esc(p.title)}">${image(p.image,p.imageAlt,'',false,'(max-width: 680px) calc((100vw - 58px) / 2), (max-width: 1050px) calc((100vw - 112px) / 3), 380px')}</a><div class="product-text"><span class="product-category">${esc(p.category)}</span><h3><a href="/${p.slug}">${esc(p.title)}</a></h3><p>${esc(p.summary)}</p>${link('/'+p.slug,'View product details')}</div></article>`;
}

export function timeline() {
  return `<ol class="timeline">${milestones.map(([year,title,description])=>`<li><span class="timeline-year">${year}</span><h3>${title}</h3><p>${description}</p></li>`).join('')}</ol>`;
}

export function home() {
  return `<main id="main">
  <section class="home-hero"><div class="container hero-grid"><div class="hero-copy"><p class="eyebrow">Sicher Engineering India Pvt. Ltd.</p><h1>Precision fabrication.<br>Engineered rail systems.</h1><p class="hero-description">Sheet metal components, door systems and stainless steel assemblies for railways, electrical and infrastructure applications.</p><div class="hero-actions"><a class="button" href="/products">Explore Our Products ${arrow}</a><a class="button button-outline" href="/contact-us#rfq">Request a Quote</a></div><p class="hero-location">Manufacturing in Shahzadpur, Ambala, Haryana.</p></div><figure class="hero-image">${image('product-workshop','Railway coaches in a depot, from the original Sicher website','',true)}<figcaption><span>Railway & industrial applications</span><small>Application photograph from the existing website</small></figcaption></figure></div></section>
  <section class="proof-section" aria-label="Company milestones and published supply figures"><div class="container proof-grid"><div><strong>2019</strong><span>Company established</span></div><div><strong>500+</strong><span>Automatic door units supplied</span></div><div><strong>10,000+</strong><span>Lavatory units supplied</span></div><p>Supply figures reported in Sicher’s published product information.</p></div></section>
  <section class="section introduction"><div class="container intro-grid"><div><p class="eyebrow">The company</p><h2>From sheet metal<br>to complete assemblies.</h2></div><div><p class="lead">Sicher Engineering manufactures custom sheet metal components and automatic door systems, with a focus on railway and electrical applications.</p><p>Established in 2019 and based near Ambala, Haryana, our work covers stainless steel and mild steel fabrication, aluminium products, forming, welding and surface finishing. We manufacture individual components as well as door, window and seating assemblies.</p>${link('/about-us','About Sicher Engineering')}</div></div></section>
  <section class="section products-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Our product range</p><h2>Built for the application.</h2></div><div><p>Door systems, coach components and fabricated products, with material and configuration choices for your project.</p>${link('/products','View all products')}</div></div><div class="product-grid home-product-grid">${products.map(productTile).join('')}<div class="custom-product"><span class="eyebrow">Custom fabrication</span><h3>Have a drawing.<br>Need a manufacturer?</h3><p>Talk to us about your sheet metal component, enclosure or fabricated assembly.</p>${link('/contact-us?product=custom#rfq','Discuss your requirement')}</div></div></div></section>
  <section class="section capabilities-home"><div class="container capability-grid"><div class="capability-copy"><p class="eyebrow">Manufacturing capabilities</p><h2>Cut. Form. Join. Finish.</h2><p>Our manufacturing services bring together the processes needed to turn sheet metal into finished components.</p>${link('/capabilities','Explore our capabilities')}<figure class="process-image">${image('laser-cutting','Close-up of a metalworking machine cutting a metal surface')}<figcaption>Metalworking image from the existing website · Process context</figcaption></figure></div><div class="capability-list">${capabilities.map((c,i)=>`<a href="/capabilities#${c.id}"><span class="process-number">0${i+1}</span><div><h3>${c.title}</h3><p>${c.context.replaceAll(' · ',' / ')}</p></div>${arrow}</a>`).join('')}</div></div></section>
  <section class="section featured-solution"><div class="container feature-grid"><figure>${image('automatic-door','Sliding door assembly illustration from Sicher’s existing product range')}<figcaption>Existing product illustration</figcaption></figure><div><p class="eyebrow">Featured product · Automated doors</p><h2>Door systems for<br>railway & metro service.</h2><p>Pneumatic or electrical sliding doors with configurable controls, materials and opening speeds. The published range includes emergency release, obstruction detection and manual override options.</p><dl class="feature-specs"><div><dt>Leaf weight</dt><dd>Up to 120 kg</dd></div><div><dt>Movement speed</dt><dd>200–800 mm/s</dd></div><div><dt>Materials</dt><dd>Aluminium · SS304/316 · Mild steel</dd></div></dl>${link('/automated-door-solutions','View automated door specifications')}</div></div></section>
  <section class="section industries-home"><div class="container"><div class="section-heading"><div><p class="eyebrow">Industries & applications</p><h2>Engineering with a purpose.</h2></div>${link('/industries','Explore applications')}</div><div class="industry-grid"><article><span class="industry-number">01</span><h3>Railways & metro</h3><p>Automated and pivoted doors, lavatory components, windows and seating for rail environments.</p><a href="/industries#railways">Railway applications ${arrow}</a></article><article><span class="industry-number">02</span><h3>Electrical & industrial</h3><p>Custom sheet metal components and fabricated enclosures for electrical and industrial requirements.</p><a href="/industries#electrical">Industrial applications ${arrow}</a></article><article><span class="industry-number">03</span><h3>Public infrastructure</h3><p>Stainless steel benches and configurable window systems for public and commercial facilities.</p><a href="/industries#infrastructure">Infrastructure applications ${arrow}</a></article></div></div></section>
  <section class="section history-home"><div class="container"><div class="section-heading"><div><p class="eyebrow">Our development</p><h2>A foundation in manufacturing.</h2></div><p>From our establishment near Ambala to the first railway door and automatic sliding door orders.</p></div>${timeline()}<div class="standards-strip"><div><h3>Quality & project requirements</h3><p>Our product information references ISO 9001 and ISO 14001 processes. Door specifications also reference UIC-564.</p></div>${link('/capabilities#quality','Discuss standards & documentation')}</div></div></section>
  <section class="section insights-home"><div class="container"><div class="section-heading"><div><p class="eyebrow">Insights</p><h2>Notes on fabrication & procurement.</h2></div>${link('/blog','All insights')}</div><div class="article-grid">${articles.slice(0,3).map(a=>articleTile(a)).join('')}</div></div></section>
  ${cta()}
  </main>`;
}

export const formatDate = value => new Date(value+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});
export function articleTile(a) {
  return `<article class="article-item"><div class="article-meta"><span>${a.tag}</span><time datetime="${a.date}">${formatDate(a.date)}</time></div><h3><a href="/post/${a.slug}">${esc(a.title)}</a></h3><p>${esc(a.summary)}</p>${link('/post/'+a.slug,'Read article')}</article>`;
}

export function document({title,description,path,body,active,base,structured}) {
  const url=base+(path==='/'?'/':path);
  const org={'@context':'https://schema.org','@type':'Organization',name:company.name,url:base,logo:base+'/assets/logo.png',telephone:company.tel,address:{'@type':'PostalAddress',streetAddress:'Village Kakkarmajra, Shahzadpur',addressLocality:'Ambala',addressRegion:'Haryana',postalCode:'134202',addressCountry:'IN'}};
  return `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)} | Sicher Engineering</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${url}"><meta name="theme-color" content="#142a38"><meta property="og:type" content="${structured?'article':'website'}"><meta property="og:title" content="${esc(title)} | Sicher Engineering"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${base}/assets/product-workshop.webp"><meta property="og:site_name" content="Sicher Engineering"><meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><link rel="preload" href="/assets/ibm-plex-sans-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/fonts.css"><link rel="stylesheet" href="/site.css"><script type="application/ld+json">${JSON.stringify(org).replace(/</g,'\\u003c')}</script>${structured?`<script type="application/ld+json">${JSON.stringify(structured).replace(/</g,'\\u003c')}</script>`:''}<script src="/site.js" defer></script></head><body id="top">${header(active)}${body}${footer()}</body></html>`;
}
