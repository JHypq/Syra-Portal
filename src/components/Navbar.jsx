import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { LuPanelLeft } from "react-icons/lu"
import { AiFillHome } from "react-icons/ai"
import { BsPeopleFill } from "react-icons/bs"
import { RiSettings4Fill } from "react-icons/ri"
import NavItem from "../components/NavItem/NavItem"
import styles from "./Navbar.module.css"
import { supabase } from "../lib/supabaseClient"
import { useUser } from "../user/UserProvider"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const userRef = useRef(null)
    const btnRef = useRef(null)
    const firstItemRef = useRef(null)
    const { pathname } = useLocation()
    const { profile } = useUser()
    const navigate = useNavigate()

    const name = profile ? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim() : ""
    const email = profile?.email ?? ""
    const initial = (profile?.first_name?.[0] || profile?.last_name?.[0] || "M").toUpperCase()

    const toggleMenu = () => setMenuOpen(prev => !prev)
    const closeMenu = () => {
        setMenuOpen(false)
        btnRef.current?.focus()
    }

    useEffect(() => {
        if (menuOpen) {
            firstItemRef.current?.focus()
        }
    }, [menuOpen])

    useEffect(() => setMenuOpen(false), [pathname])

    useEffect(() => {
        const onOutside = (e) => {
            if (!userRef.current) return
            if (!userRef.current.contains(e.target)) setMenuOpen(false)
        }
        document.addEventListener("pointerdown", onOutside, true)
        return () => document.removeEventListener("pointerdown", onOutside, true)
    }, [])

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("Error signing out:", error.message)
        } else {
            navigate("/login")
        }
    }

    return (
        <nav className={styles.sidebar} data-open={open} aria-label="Main navigation">
            <div className={styles.header}>
                <div className={styles.brand}>
                    <div className={styles.logo} aria-hidden="true"><span>S</span></div>
                    {open && <span className={styles.brandText} aria-hidden="true">Syra Portal</span>}
                </div>

                <button
                    type="button"
                    className={styles.toggle}
                    aria-expanded={open}
                    aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
                    onClick={() => setOpen(v => !v)}
                >
                    <LuPanelLeft className={styles.icon} />
                </button>
            </div>

            <NavItem to="/dashboard" icon={AiFillHome} label="Dashboard" />
            <NavItem to="/people" icon={BsPeopleFill} label="People" />
            <NavItem to="/settings" icon={RiSettings4Fill} label="Team Settings" />

            <div className={styles.userWrap} ref={userRef}>
                <button
                    type="button"
                    id="userMenuButton"
                    className={styles.user}
                    aria-label={`Account menu for ${name || email || "user"}`}
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    aria-controls="userMenu"
                    ref={btnRef}
                    onClick={toggleMenu}
                    onKeyDown={(e) => { if (e.key === "Escape") closeMenu() }}
                >
                    <div className={styles.avatar} aria-hidden="true">{initial}</div>
                    <div className={styles.userText}>
                        <span className={styles.userName}>{name}</span>
                        <span className={styles.userEmail}>{email}</span>
                    </div>
                </button>

                {menuOpen && (
                    <div
                        id="userMenu"
                        role="menu"
                        aria-labelledby="userMenuButton"
                        className={styles.userMenu}
                        onKeyDown={(e) => { if (e.key === "Escape") closeMenu() }}
                    >
                        <div className={styles.menuHeader}>
                            <div className={styles.menuName}>{name}</div>
                            <div className={styles.menuEmail}>{email}</div>
                        </div>

                        <Link
                            ref={firstItemRef} 
                            to="/settings" 
                            role="menuitem" 
                            className={styles.menuItem} 
                            onClick={closeMenu}                       
                        >
                            User settings
                        </Link>
                        <button type="button" role="menuitem" className={`${styles.menuItem} ${styles.danger}`} onClick={() => { handleSignOut(), closeMenu(); }}>
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}