import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login/Login"
import Dashboard from "./pages/Dashboard/Dashboard"
import Layout from "./components/Layout"

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}