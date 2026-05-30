import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from '@/components/ui/Navbar'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import { routes } from '@/router/routes'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />

        <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.login} element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
