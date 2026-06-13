export default function Footer() {
  return (
    <footer style={{ background: 'var(--espresso)', color: 'var(--cream)', padding: '3rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
        <div>
          <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Gourmet LA Bakery</div>
          <p style={{ color: 'rgba(250,246,240,0.6)', fontSize: '0.875rem', lineHeight: 1.6 }}>Handcrafted cakes, pastries & coffee in the heart of Downtown Los Angeles.</p>
        </div>
        <div>
          <div style={{ fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--rose)', marginBottom: '1rem' }}>Hours</div>
          <div style={{ fontSize: '0.875rem', color: 'rgba(250,246,240,0.75)', lineHeight: 2 }}>
            <div>Monday – Friday: 7am – 8pm</div>
            <div>Saturday: 8am – 8pm</div>
            <div>Sunday: 9am – 6pm</div>
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--rose)', marginBottom: '1rem' }}>Contact</div>
          <div style={{ fontSize: '0.875rem', color: 'rgba(250,246,240,0.75)', lineHeight: 2 }}>
            <div>548 S Broadway</div>
            <div>Los Angeles, CA 90013</div>
            <a href="tel:+12136234244" style={{ color: 'var(--rose)', textDecoration: 'none', display: 'block' }}>(213) 623-4244</a>
            <div style={{ color: 'rgba(250,246,240,0.4)', fontSize: '0.75rem', marginTop: '0.5rem' }}>Cash only · Takeout available</div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '2rem auto 0', borderTop: '1px solid rgba(250,246,240,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ color: 'rgba(250,246,240,0.35)', fontSize: '0.75rem' }}>© 2024 Gourmet LA Bakery. All rights reserved.</span>
        <span style={{ color: 'rgba(250,246,240,0.35)', fontSize: '0.75rem' }}>Made with love in Los Angeles 🎂</span>
      </div>
    </footer>
  )
}
