import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: Home,
})

// ── tiny reusable primitives ──────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1,2,3,4,5].map(i => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? 'var(--gold)' : 'none'} stroke="var(--gold)" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
      </div>
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--espresso)' }}>{rating}</span>
      <span style={{ fontSize: '0.8rem', color: 'var(--warm-gray)' }}>({count} reviews)</span>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <div style={{ height: '1px', width: '2rem', background: 'var(--rose-deep)' }} />
      <span style={{ fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--rose-deep)' }}>{children}</span>
      <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, var(--rose-deep), transparent)' }} />
    </div>
  )
}

// ── hero photo grid (CSS background fakes) ───────────────────────────────────
// We use Unsplash for real pastry/cafe photos

const heroPhotos = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', // cakes
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80', // bread
  'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80', // bakery display
  'https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?w=600&q=80', // muffins
  'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80', // coffee pastry
  'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&q=80', // tres leches
]

// ── menu items ────────────────────────────────────────────────────────────────

const menuCategories = [
  {
    name: 'Signature Cakes',
    items: [
      { name: 'Birthday Cake de Ximena', desc: 'Made-to-order, custom decorations, layered sponge', price: 'Call for pricing' },
      { name: 'Wedding Cake', desc: 'Multi-tier, fondant or buttercream, fully customizable', price: 'Call for pricing' },
      { name: 'Tres Leches Cake', desc: 'Classic Mexican milk-soaked sponge, whipped cream topping', price: 'Slice $4–6' },
      { name: 'Rosca de Reyes', desc: 'Traditional Three Kings ring bread with candied fruit', price: 'Seasonal' },
    ]
  },
  {
    name: 'Pan Dulce & Pastries',
    items: [
      { name: 'Assorted Pan Dulce', desc: 'Conchas, cuernos, polvorones & more from the display case', price: '$1–3 each' },
      { name: 'Croissants', desc: 'Buttery, flaky, baked fresh daily — plain or filled', price: '$3' },
      { name: 'Muffins', desc: 'Blueberry, banana walnut, and rotating seasonal flavors', price: '$2.50' },
      { name: 'Cake Slices', desc: 'Great size, very yummy — rotating flavors daily', price: '$4–5' },
    ]
  },
  {
    name: 'Savory & Drinks',
    items: [
      { name: 'Sandwiches', desc: 'Fresh-made on house bread — rotating daily fillings', price: '$6–8' },
      { name: 'Coffee', desc: 'Espresso, Americano, Café de Olla, and more', price: '$2–4' },
      { name: 'Café con Leche', desc: 'Rich coffee with steamed Mexican milk', price: '$3' },
      { name: 'Hot Chocolate', desc: 'Mexican-style, made with real chocolate tablets', price: '$3' },
    ]
  },
]

// ── review data ───────────────────────────────────────────────────────────────

const reviews = [
  { name: 'V K', role: 'Local Guide · 44 reviews', date: '3 months ago', text: 'Very lovely spot for pastries or baking. Also beautiful cakes. Friendly and kind owners and workers! Highly recommend.', stars: 5 },
  { name: 'Jenae L.', role: 'Local Guide · 693 reviews', date: '2 years ago', text: 'Delightful bakery with savory and sweet treats. Cash only. To enjoy the pastries in the display cabinet, grab a tray and tongs and pick from the sliding glass doors. A gem in Downtown LA.', stars: 5 },
  { name: 'Rebecca R.', role: 'Local Guide · 325 reviews', date: 'a year ago', text: 'Just stopped in for a croissant and a pastry — great service, easy to order, cakes look delicious and they also serve savory foods. Would come again. A++', stars: 5 },
]

// ── main component ────────────────────────────────────────────────────────────

function Home() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [photoIndex, setPhotoIndex] = useState(0)

  // Auto-cycle hero photo
  useEffect(() => {
    const t = setInterval(() => setPhotoIndex(i => (i + 1) % heroPhotos.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <main style={{ minHeight: '100vh' }}>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Background photo */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url(${heroPhotos[photoIndex]})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transition: 'background-image 0.8s ease-in-out',
          filter: 'brightness(0.45)',
        }} />
        {/* Espresso overlay — left 60% */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(105deg, rgba(44,26,14,0.88) 0%, rgba(44,26,14,0.72) 55%, transparent 80%)',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '8rem 2rem 4rem', width: '100%' }}>
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ height: '1px', width: '2rem', background: 'var(--rose)' }} />
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 700 }}>Downtown Los Angeles</span>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.05, marginBottom: '0.25rem' }}>
              Gourmet LA
            </h1>
            <h1 style={{ fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, color: 'var(--rose)', lineHeight: 1, marginBottom: '1.5rem' }}>
              Bakery
            </h1>

            <p style={{ color: 'rgba(250,246,240,0.8)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '480px', marginBottom: '2.5rem' }}>
              Handcrafted made-to-order cakes, fresh pan dulce, savory sandwiches, and rich coffee — baked with love since day one in the heart of Broadway.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a href="#menu" style={{
                background: 'var(--rose-deep)', color: 'var(--cream)',
                padding: '0.85rem 2rem', borderRadius: '3rem', textDecoration: 'none',
                fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.02em',
                transition: 'all 0.2s', border: 'none',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--rose)'; e.currentTarget.style.color = 'var(--espresso)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--rose-deep)'; e.currentTarget.style.color = 'var(--cream)' }}>
                Explore the Menu
              </a>
              <a href="#visit" style={{
                background: 'transparent', color: 'var(--cream)',
                padding: '0.85rem 2rem', borderRadius: '3rem', textDecoration: 'none',
                fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.02em',
                border: '1px solid rgba(250,246,240,0.35)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(250,246,240,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                Find Us
              </a>
            </div>

            {/* Quick stats */}
            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem', flexWrap: 'wrap' }}>
              {[['4.3 ★', '268 Reviews'], ['$1–10', 'Per Person'], ['Open', 'Until 8 PM']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--cream)' }}>{val}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(250,246,240,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.15rem' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Photo dot indicators */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 3 }}>
          {heroPhotos.map((_, i) => (
            <button key={i} onClick={() => setPhotoIndex(i)} style={{
              width: i === photoIndex ? '1.5rem' : '0.4rem', height: '0.4rem',
              borderRadius: '1rem', background: i === photoIndex ? 'var(--rose)' : 'rgba(250,246,240,0.35)',
              border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0,
            }} />
          ))}
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" style={{ background: 'var(--espresso)', padding: '5rem 2rem', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              Where every cake tells a story
            </h2>
            <p style={{ color: 'rgba(250,246,240,0.7)', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              Tucked into 548 S Broadway in Downtown LA, Gourmet LA Bakery is a neighborhood treasure known for its warmth as much as its baked goods. From intricately decorated custom cakes to the rainbow of pan dulce filling our display case every morning, everything here is made with intention.
            </p>
            <p style={{ color: 'rgba(250,246,240,0.7)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              The owners and staff greet you like family. Whether you're stopping in for a quick espresso and a croissant, or planning an unforgettable wedding cake, you'll feel the care in every bite.
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {['Made-to-Order Cakes', 'Fresh Daily', 'Cash Only', 'Takeout Available'].map(tag => (
                <span key={tag} style={{ background: 'rgba(232,180,160,0.15)', color: 'var(--rose)', border: '1px solid rgba(232,180,160,0.2)', borderRadius: '2rem', padding: '0.35rem 0.9rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Feature highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { icon: '🎂', title: 'Custom Cakes', desc: 'Made-to-order for any occasion — birthdays, weddings, quinceañeras' },
              { icon: '🥐', title: 'Daily Pastries', desc: 'Pan dulce, croissants & muffins baked fresh every morning' },
              { icon: '☕', title: 'Coffee & Drinks', desc: 'Espresso, café de olla, and rich Mexican hot chocolate' },
              { icon: '🥪', title: 'Savory Options', desc: 'Fresh sandwiches and hearty savory bites to keep you going' },
            ].map(card => (
              <div key={card.title} style={{
                background: 'rgba(250,246,240,0.05)', border: '1px solid rgba(250,246,240,0.08)',
                borderRadius: '1rem', padding: '1.25rem',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(250,246,240,0.09)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(250,246,240,0.05)')}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{card.icon}</div>
                <div style={{ fontWeight: 600, color: 'var(--cream)', fontSize: '0.9rem', marginBottom: '0.35rem' }}>{card.title}</div>
                <div style={{ color: 'rgba(250,246,240,0.5)', fontSize: '0.8rem', lineHeight: 1.5 }}>{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO STRIP ──────────────────────────────────────────────────── */}
      <section style={{ padding: '3rem 0', background: 'var(--cream-dark)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '0.75rem', animation: 'scroll-strip 30s linear infinite', width: 'max-content' }}>
          {[...heroPhotos, ...heroPhotos].map((src, i) => (
            <div key={i} style={{
              width: '280px', height: '200px', flexShrink: 0, borderRadius: '0.75rem', overflow: 'hidden',
            }}>
              <img src={src} alt="bakery" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes scroll-strip {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ── MENU ─────────────────────────────────────────────────────────── */}
      <section id="menu" style={{ padding: '5rem 2rem', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel>What We Offer</SectionLabel>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.75rem' }}>
            The Menu
          </h2>
          <p style={{ color: 'var(--warm-gray)', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: 1.6, fontSize: '0.95rem' }}>
            Rotating daily specials. Grab a tray and tongs at the display case — or order a custom cake for any occasion.
          </p>

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {menuCategories.map((cat, i) => (
              <button key={cat.name} onClick={() => setActiveCategory(i)} style={{
                padding: '0.6rem 1.4rem', borderRadius: '2rem', border: '1px solid',
                borderColor: activeCategory === i ? 'var(--espresso)' : 'var(--cream-dark)',
                background: activeCategory === i ? 'var(--espresso)' : 'transparent',
                color: activeCategory === i ? 'var(--cream)' : 'var(--warm-gray)',
                fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Items grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {menuCategories[activeCategory].items.map(item => (
              <div key={item.name} style={{
                background: 'white', borderRadius: '1rem', padding: '1.5rem',
                border: '1px solid rgba(44,26,14,0.08)',
                boxShadow: '0 2px 12px rgba(44,26,14,0.04)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,26,14,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(44,26,14,0.04)' }}>
                <div style={{ fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.35rem', fontSize: '0.95rem' }}>{item.name}</div>
                <div style={{ color: 'var(--warm-gray)', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>{item.desc}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--rose-deep)', fontWeight: 500 }}>{item.price}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem 1.5rem', background: 'rgba(201,168,76,0.1)', borderRadius: '0.75rem', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.1rem' }}>💡</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--espresso-mid)' }}>Grab a tray and tongs at the display case to pick your pan dulce. Custom cakes require advance notice — call us to discuss your order.</span>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────────── */}
      <section id="reviews" style={{ padding: '5rem 2rem', background: 'var(--cream-dark)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel>What People Say</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--espresso)' }}>
              Guest Reviews
            </h2>
            <StarRating rating={4.3} count={268} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {reviews.map(r => (
              <div key={r.name} style={{
                background: 'white', borderRadius: '1rem', padding: '1.75rem',
                border: '1px solid rgba(44,26,14,0.06)',
                boxShadow: '0 2px 12px rgba(44,26,14,0.04)',
              }}>
                {/* Stars */}
                <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= r.stars ? 'var(--gold)' : 'none'} stroke="var(--gold)" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p style={{ color: 'var(--charcoal)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem', fontStyle: 'italic' }}>"{r.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--rose), var(--espresso))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: '0.85rem', fontWeight: 700,
                  }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--espresso)' }}>{r.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--warm-gray)' }}>{r.role} · {r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              textDecoration: 'none', color: 'var(--espresso-mid)', fontWeight: 600, fontSize: '0.875rem',
              border: '1px solid rgba(44,26,14,0.2)', borderRadius: '2rem', padding: '0.65rem 1.4rem',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--espresso)'; e.currentTarget.style.color = 'var(--cream)'; e.currentTarget.style.borderColor = 'var(--espresso)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--espresso-mid)'; e.currentTarget.style.borderColor = 'rgba(44,26,14,0.2)' }}>
              Read all 268 reviews on Google →
            </a>
          </div>
        </div>
      </section>

      {/* ── VISIT / MAP ──────────────────────────────────────────────────── */}
      <section id="visit" style={{ padding: '5rem 2rem', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel>Come See Us</SectionLabel>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--espresso)', marginBottom: '2.5rem' }}>
            Visit the Bakery
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            {/* Info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '📍', title: 'Address', lines: ['548 S Broadway', 'Los Angeles, CA 90013', 'Downtown LA'] },
                { icon: '🕐', title: 'Hours', lines: ['Mon–Fri: 7am – 8pm', 'Saturday: 8am – 8pm', 'Sunday: 9am – 6pm'] },
                { icon: '📞', title: 'Phone', lines: ['(213) 623-4244', 'Takeout available', '💵 Cash only'] },
              ].map(card => (
                <div key={card.title} style={{
                  background: 'white', borderRadius: '1rem', padding: '1.25rem 1.5rem',
                  border: '1px solid rgba(44,26,14,0.07)',
                  display: 'flex', gap: '1rem', alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{card.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--espresso)', fontSize: '0.85rem', marginBottom: '0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{card.title}</div>
                    {card.lines.map(line => <div key={line} style={{ color: 'var(--warm-gray)', fontSize: '0.875rem', lineHeight: 1.6 }}>{line}</div>)}
                  </div>
                </div>
              ))}
              <a href="https://www.google.com/maps/dir//548+S+Broadway,+Los+Angeles,+CA+90013" target="_blank" rel="noopener noreferrer" style={{
                display: 'block', textAlign: 'center', background: 'var(--espresso)', color: 'var(--cream)',
                textDecoration: 'none', padding: '0.9rem', borderRadius: '0.75rem',
                fontWeight: 600, fontSize: '0.875rem', transition: 'background 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--espresso-mid)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--espresso)')}>
                Get Directions →
              </a>
            </div>

            {/* Embedded map */}
            <div style={{ borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(44,26,14,0.1)', height: '420px' }}>
              <iframe
                title="Gourmet LA Bakery Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.837!2d-118.249!3d34.044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c65fcca7b88f%3A0x64f5e0fa7d51affd!2s548%20S%20Broadway%2C%20Los%20Angeles%2C%20CA%2090013!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ORDER CTA ────────────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 2rem', background: 'var(--espresso)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* decorative arcs */}
        <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(232,180,160,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(232,180,160,0.05)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '620px', margin: '0 auto' }}>
          <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.25rem', color: 'var(--rose)', marginBottom: '0.5rem' }}>Ready to celebrate?</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '1rem' }}>
            Order a Custom Cake Today
          </h2>
          <p style={{ color: 'rgba(250,246,240,0.65)', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.95rem' }}>
            From birthday cakes to wedding showpieces — call us to discuss your vision. Every cake is made with care, detail, and a lot of love.
          </p>
          <a href="tel:+12136234244" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--rose-deep)', color: 'var(--cream)', textDecoration: 'none',
            padding: '1rem 2.5rem', borderRadius: '3rem', fontWeight: 700, fontSize: '1rem',
            transition: 'all 0.2s', letterSpacing: '0.01em',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--rose)'; e.currentTarget.style.color = 'var(--espresso)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--rose-deep)'; e.currentTarget.style.color = 'var(--cream)' }}>
            📞 (213) 623-4244
          </a>
        </div>
      </section>
    </main>
  )
}
