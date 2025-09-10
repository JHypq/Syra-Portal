import styles from "./InputField.module.css"

export default function InputField({ id, type, name, value, onChange, label, icon }) {

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
        </div>
    )
}