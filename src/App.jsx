import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'

// Portfolio Pages
import Home from './pages/Home'
import ProjectDetails from './pages/ProjectDetails'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'

import { lazy, Suspense } from 'react'

// Admin (Lazy Loaded for Core Web Vitals)
const AdminLogin = lazy(() => import('./admin/AdminLogin'))
const AdminLayout = lazy(() => import('./admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'))
const AdminProjects = lazy(() => import('./admin/AdminProjects'))
const AdminSkills = lazy(() => import('./admin/AdminSkills'))
const AdminExperience = lazy(() => import('./admin/AdminExperience'))
const AdminAbout = lazy(() => import('./admin/AdminAbout'))
const AdminTrophies = lazy(() => import('./admin/AdminTrophies'))

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-background text-foreground">Loading...</div>}>
              <Routes>
                {/* ── Portfolio (Public) ── */}
                <Route path="/" element={<Home />} />
                <Route path="/project/:slug" element={<ProjectDetails />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />

                {/* ── Admin Panel ── */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="skills" element={<AdminSkills />} />
                  <Route path="journey" element={<AdminExperience />} />
                  <Route path="about" element={<AdminAbout />} />
                  <Route path="trophies" element={<AdminTrophies />} />
                </Route>

                {/* ── 404 ── */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}
