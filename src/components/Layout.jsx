import styles from "./Layout.module.css"
import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
    const { pathname } = useLocation()
    const isLoginPage = pathname === "/"
    return (
        <div className={styles.siteWrapper}>
            {!isLoginPage && <Header />}
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}