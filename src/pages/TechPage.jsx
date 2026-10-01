import { useState } from 'react'
import { useLang } from '../i18n/LangContext.jsx'
import MdRenderer from '../components/MdRenderer.jsx'
import viContent from '../i18n/vi/tech.js'
import enContent from '../i18n/en/tech.js'

export default function TechPage() {
  const { lang } = useLang()
  const c = lang === 'vi' ? viContent : enContent
  const [active, setActive] = useState('overview')

  return (
    <main className="main-content">
      <div className="page-header">
        <div className="page-badge">{c.badge}</div>
        <h1>{c.title}</h1>
        <p>{c.subtitle}</p>
      </div>

      <div className="section-tabs">
        {Object.entries(c.sections).map(([key, { label }]) => (
          <button
            key={key}
            className={`section-tab ${active === key ? 'active' : ''}`}
            onClick={() => setActive(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <MdRenderer content={c.sections[active].content} />
    </main>
  )
}
