import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"

export default function useSession() {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)
    const [authEvent, setAuthEvent] = useState(null)

    useEffect(() => {
        let mounted = true

        supabase.auth.getSession().then(({ data }) => {
            if (!mounted) {
                return
            }
            setSession(data.session ?? null)
            setLoading(false)
        })

        const { data: sub } = supabase.auth.onAuthStateChange((event, sess) => {
            setAuthEvent(event)
            setSession(sess ?? null)
        })

        return () => {
            mounted = false
            sub.subscription.unsubscribe()
        }
    }, [])

    return { session, loading, authEvent }
}