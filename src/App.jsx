import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login/Login"
import Dashboard from "./pages/Dashboard/Dashboard"
import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"
import useSession from "./hooks/useSession"
import { useEffect } from "react";

export default function App() {
  const { session, loading } = useSession()

  useEffect(() => {
    if (!loading) {
      const boot = document.getElementById('boot-loader');
      if (!boot) return;
      requestAnimationFrame(() => {
        const t = setTimeout(() => boot.remove(), 150);
        return () => clearTimeout(t);
      });
    }
  }, [loading]);

  if (loading) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={session ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route element={<ProtectedRoute session={session} loading={loading} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}