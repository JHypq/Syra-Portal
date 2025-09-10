import styles from "./Button.module.css"

export default function Button({ 
    children, 
    type = "button", 
    onClick, 
    disabled = false, 
    fullWidth = false, 
}) {
    return (
        <button
            className={`${styles.btn} ${fullWidth ? styles.full : ""}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}