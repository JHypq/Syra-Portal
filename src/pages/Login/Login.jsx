import styles from "./Login.module.css"
import InputField from "../../components/InputField/InputField"
import Button from "../../components/Button/Button"
import { FaEnvelope, FaLock } from "react-icons/fa"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginCard}>
                <h2>Welcome back!</h2>
                <p>Sign in to access your dashboard and continue your work.</p>
                <form className={styles.form}>
                    <div className={styles.fieldGroup}>
                        <InputField
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<FaEnvelope />}
                        />

                        <InputField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<FaLock />}
                        />
                        <Link to="#">Forgot password?</Link>
                    </div>
                    <Button type="submit" fullWidth>Sign in</Button>
                </form>
            </div>
        </div>
    )
}