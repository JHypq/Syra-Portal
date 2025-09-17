import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { supabase } from "../lib/supabaseClient"

const Ctx = createContext(null)

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)          // auth user (id, email)
    const [profile, setProfile] = useState(null)    // { first_name, last_name, email }
    const [status, setStatus] = useState("idle")    // "idle" | "loading" | "ready" | "error"

    // hydrate from sessionStorage for instant UI
    useEffect(() => {
        try {
            const cached = sessionStorage.getItem("profile")
            if (cached) {
                const obj = JSON.parse(cached)
                setProfile(obj && typeof obj === "object" ? obj : null)
            }
        } catch {}
    }, [])

    async function fetchProfile(uid) {
        if (!uid) return
        setStatus(s => (s === "ready" ? "ready" : "loading"))

        let { data, error } = await supabase
            .from("profiles")
            .select("first_name,last_name,email")
            .eq("id", uid)
            .maybeSingle()

        if (error) {
            setStatus("error")
            return
        }

        if (!data) {
            const { data: session } = await supabase.auth.getUser()
            const email = session?.user?.email ?? null

            const up = await supabase
                .from("profiles")
                .upsert({ id: uid, email })
                .select("first_name,last_name,email")
                .maybeSingle()

            if (up.error) {
                setStatus("error")
                return
            }
            data = up.data
        }

        setProfile(data)
        try { sessionStorage.setItem("profile", JSON.stringify(data)) } catch {}
        setStatus("ready")
    }   

    // initial auth + on auth state change
    useEffect(() => {
        let mounted = true
        ;(async () => {
            const { data: { user: u } } = await supabase.auth.getUser()
            if (!mounted) return
            setUser(u)
            if (u) fetchProfile(u.id)
        })()
        const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
            const u = session?.user ?? null
            setUser(u)
            if (u) fetchProfile(u.id)
            else {
                setProfile(null)
                sessionStorage.removeItem("profile")
                setStatus("idle")
            }
        })
        return () => { mounted = false; sub?.subscription?.unsubscribe() }
    }, [])

    // realtime updates for *this* user’s row
    useEffect(() => {
        if (!user?.id) return
        const channel = supabase
            .channel("profiles-self")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "profiles", filter: `id=eq.${user.id}` },
                (payload) => {
                    const next = payload.new || payload.old
                    if (next) {
                        setProfile(prev => {
                            const merged = prev ? { ...prev, ...next } : next
                            try {
                                sessionStorage.setItem("profile", JSON.stringify(merged))
                            } catch {}
                        })
                    }
                }
            )
            .subscribe()
        return () => { supabase.removeChannel(channel) }
    }, [user?.id])

    const value = useMemo(() => ({
        user,
        profile,
        status,
        refetch: () => user?.id && fetchProfile(user.id)
    }), [user, profile, status])

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useUser() {
    const ctx = useContext(Ctx)
    if (!ctx) throw new Error("useUser must be used within <UserProvider>")
    return ctx
}