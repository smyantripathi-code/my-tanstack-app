import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: () => (
    <main style={{ minHeight: '100vh', padding: '10rem 2rem 5rem', background: 'var(--cream)' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: 'var(--espresso)', marginBottom: '1rem' }}>About Us</h1>
        <p style={{ color: 'var(--warm-gray)', lineHeight: 1.8, marginBottom: '2rem' }}>Gourmet LA Bakery is a family-run bakeshop in Downtown Los Angeles, known for our detailed made-to-order cakes and the warmth we pour into every product. Come visit us at 548 S Broadway!</p>
        <Link to="/" style={{ color: 'var(--rose-deep)', textDecoration: 'none', fontWeight: 600 }}>← Back to Home</Link>
      </div>
    </main>
  )
})
