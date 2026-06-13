import { Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(250,246,240,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(44,26,14,0.1)' : 'none',
      transition: 'all 0.3s ease',
      padding: '0 2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.6rem', color: 'var(--espresso)', fontWeight: 700, lineHeight: 1 }}>Gourmet LA</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--warm-gray)', fontWeight: 600 }}>Bakery · Est. Downtown</span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[['#menu', 'Menu'], ['#about', 'About'], ['#reviews', 'Reviews'], ['#visit', 'Visit']].map(([href, label]) => (
            <a key={href} href={href} style={{ textDecoration: 'none', color: scrolled ? 'var(--espresso-mid)' : 'var(--espresso)', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.02em', transition: 'color 0.2s', position: 'relative' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--rose-deep)')}
              onMouseLeave={e => (e.currentTarget.style.color = scrolled ? 'var(--espresso-mid)' : 'var(--espresso)')}>
              {label}
            </a>
          ))}
          <a href="tel:+12136234244" style={{
            background: 'var(--espresso)', color: 'var(--cream)', textDecoration: 'none',
            padding: '0.5rem 1.2rem', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: 600,
            letterSpacing: '0.02em', transition: 'background 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--espresso-mid)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--espresso)')}>
            Order Now
          </a>
        </nav>
      </div>
    </header>
  )
}
