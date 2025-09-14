import styles from "./Button.module.css"
import { Link } from "react-router-dom"

export default function Button({ 
    children, 
    type = "button", 
    onClick, 
    disabled = false, 
    fullWidth = false, 
    loading = false,
    to,
}) {

    const isDisabled = disabled || loading
    const className = `${styles.btn} ${fullWidth ? styles.full : ""}`

    if (to) {
        return (
            <Link
                to={to}
                className={className}
                aria-disabled={isDisabled}
                aria-busy={loading}
                aria-live="polite"
                onClick={(e) => {
                if (isDisabled) e.preventDefault()
                else onClick?.(e)
                }}
                tabIndex={isDisabled ? -1 : 0}
            >
                {loading ? <span className={styles.spinner} aria-hidden="true" /> : children}
            </Link>
        )
  }

    return (
        <button
            className={className}
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            aria-busy={loading}
            aria-live="polite"
        >
            {loading ? <span className={styles.spinner} aria-hidden="true" /> : children}
        </button>
    )
}