import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './i18n/LangContext.jsx'
import Sidebar from './components/Sidebar.jsx'
import IntroPage from './pages/IntroPage.jsx'
import HRPage from './pages/HRPage.jsx'
import TechPage from './pages/TechPage.jsx'

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Sidebar />
          <Routes>
            <Route path="/"     element={<IntroPage />} />
            <Route path="/hr"   element={<HRPage />} />
            <Route path="/tech" element={<TechPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LangProvider>
  )
}
