import styles from "./InputField.module.css"
import { CgDanger } from "react-icons/cg"
import { forwardRef } from "react"

const InputField = forwardRef(function InputField(
    { id, type, name, value, onChange, label, icon, trailing, error = false, errorText = "" },
    ref
) {
    return (
        <>
        <div className={`${styles.field} ${error ? styles.error : ""}`}>
            {icon && <span className={styles.icon}>{icon}</span>}
            <input
                ref={ref}
                id={id}
                type={type}
                name={name}
                placeholder=" "
                value={value}
                onChange={onChange}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
            />
            <label htmlFor={id}>{label}</label>
            {trailing && <span className={styles.trailing}>{trailing}</span>}
        </div>
        {error && (
            <p id={`${id}-error`} role="alert" className={styles.errorText}>
                <CgDanger className={styles.errorIcon} aria-hidden="true" />
                {errorText}
            </p>
        )}
        </>
    )
})

export default InputField