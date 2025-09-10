import { supabase } from "../../lib/supabaseClient"

export default function Dashboard() {
    async function handleSignOut() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("Error signing out:", error.message)
        }
    }

    return (
        <>
            <h1>Dashboard Page Here</h1>
            <button onClick={handleSignOut}>Sign Out</button>
        </>
    )
}