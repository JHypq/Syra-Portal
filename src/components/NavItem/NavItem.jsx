import { NavLink } from "react-router-dom"
import styles from "../Navbar.module.css"

export default function NavItem({ to, icon: Icon, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                [styles.item, isActive && styles.active].filter(Boolean).join(" ")
            }
            aria-label={label}
        >
            <Icon className={styles.icon}/>
            <span className={styles.label}>{label}</span>
        </NavLink>
    )
}