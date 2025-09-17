import styles from "./Layout.module.css"
import { Outlet, useLocation } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"

export default function Layout() {
    const { pathname } = useLocation()
    const noHeaderPaths = ["/", "/forgot-password", "/reset-password", "/404-not-found"]
    const hideHeader = noHeaderPaths.includes(pathname)

    return (
        <div className={styles.siteWrapper}>
            {!hideHeader && <Navbar />}
            <div className={styles.bodyWrapper}>
                <main className={styles.main}>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}