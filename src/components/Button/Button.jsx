import styles from "./Button.module.css"

export default function Button({ 
    children, 
    type = "button", 
    onClick, 
    disabled = false, 
    fullWidth = false, 
    loading = false,
}) {

    const isDisabled = disabled || loading

    return (
        <button
            className={`${styles.btn} ${fullWidth ? styles.full : ""}`}
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