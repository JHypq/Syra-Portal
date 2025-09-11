import styles from "./InputField.module.css"

export default function InputField({ id, type, name, value, onChange, label, icon, trailing }) {

    return (
        <div className={styles.field}>
            {icon && <span className={styles.icon}>{icon}</span>}
            <input
                id={id}
                type={type}
                name={name}
                placeholder=" "
                value={value}
                onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
            {trailing && <span className={styles.trailing}>{trailing}</span>}
        </div>
    )
}