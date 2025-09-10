import styles from "./Login.module.css"
import InputField from "../../components/InputField/InputField"
import Button from "../../components/Button/Button"
import { FaEnvelope, FaLock } from "react-icons/fa"
import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabaseClient"

export default function Login({ session, loading: authLoading }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function onSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setFormError(error.message === "Invalid login credentials"
                ? "Wrong email or password."
                : "Something went wrong. Please try again."
            )
        } else {
            setFormError("")
            navigate("/dashboard", { replace: true })
        }
        setLoading(false)
    }

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginCard}>
                <h2>Welcome back!</h2>
                <p>Sign in to access your dashboard and continue your work.</p>
                <form className={styles.form} onSubmit={onSubmit}>
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
                    {formError && (
                        <div role="alert" className={styles.formError}>{formError}</div>
                    )}
                    <Button type="submit" fullWidth loading={loading}>Sign in</Button>
                </form>
            </div>
        </div>
    )
}