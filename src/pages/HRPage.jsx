import { useLang } from '../i18n/LangContext.jsx'
import MdRenderer from '../components/MdRenderer.jsx'
import viContent from '../i18n/vi/hr.js'
import enContent from '../i18n/en/hr.js'

export default function HRPage() {
  const { lang } = useLang()
  const c = lang === 'vi' ? viContent : enContent

  return (
    <main className="main-content">
      <div className="page-header">
        <div className="page-badge">{c.badge}</div>
        <h1>{c.title}</h1>
        <p>{c.subtitle}</p>
      </div>
      <MdRenderer content={c.content} />
    </main>
  )
}
