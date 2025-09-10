import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ session, loading }) {
    if (loading) return null
    if (!session) return <Navigate to="/" replace />

    return <Outlet />
}