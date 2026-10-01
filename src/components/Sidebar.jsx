import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useLang } from '../i18n/LangContext.jsx'

const navItems = {
  vi: [
    { to: '/',        icon: '👤', label: 'Tự giới thiệu' },
    { to: '/hr',      icon: '👔', label: 'Vòng HR'        },
    { to: '/tech',    icon: '💻', label: 'Kỹ thuật'       },
    { to: '/roadmap', icon: '🗺️', label: 'Lộ trình Backend' },
  ],
  en: [
    { to: '/',        icon: '👤', label: 'Self-Intro'  },
    { to: '/hr',      icon: '👔', label: 'HR Round'    },
    { to: '/tech',    icon: '💻', label: 'Technical'   },
    { to: '/roadmap', icon: '🗺️', label: 'Backend Roadmap' },
  ],
}

const langs = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'en', label: 'English'     },
]

export default function Sidebar() {
  const { lang, toggle } = useLang()
  const items = navItems[lang]
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // close when clicking outside
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = (code) => {
    if (code !== lang) toggle()
    setOpen(false)
  }

  const currentLabel = lang === 'vi' ? 'Tiếng Việt' : 'English'

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-title">Interview Prep</div>
        <div className="logo-sub">Daifuku · Vũ Hoàng Minh</div>
      </div>

      <ul className="sidebar-nav">
        {items.map(({ to, icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <span className="nav-icon">{icon}</span>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Language picker — dropdown opens upward */}
      <div className="lang-toggle-wrap" ref={ref}>
        {open && (
          <div className="lang-dropdown">
            {langs.map(({ code, label }) => (
              <button
                key={code}
                className={`lang-option ${code === lang ? 'active' : ''}`}
                onClick={() => select(code)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
        <button className="lang-toggle" onClick={() => setOpen(o => !o)}>
          <span>🌐 {currentLabel}</span>
          <span className="lang-chevron">{open ? '▾' : '▴'}</span>
        </button>
      </div>
    </aside>
  )
}
