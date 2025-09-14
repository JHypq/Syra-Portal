import styles from "./Layout.module.css"
import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
    const { pathname } = useLocation()
    const noHeaderPaths = ["/", "/forgot-password", "/reset-password", "/404-not-found"]
    const hideHeader = noHeaderPaths.includes(pathname)

    return (
        <div className={styles.siteWrapper}>
            {!hideHeader && <Header />}
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}