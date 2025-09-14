import styles from "./ForgotPassword.module.css"
import InputField from "../../components/InputField/InputField"
import Button from "../../components/Button/Button"
import { FaEnvelope } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState({ email: "" })
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);

    function onEmailChange(e) {
        setEmail(e.target.value)
        if (errors.email) setErrors(x => ({ ...x, email: "" }))
    }

    async function onSubmit(e) {
        e.preventDefault()

        const next = { email: "" }
        if (!email.trim()) next.email = "Enter your email."
        else if (!isValidEmail(email)) next.email = "Enter a valid email address."
        
        if (next.email) {
            setErrors(next)
            return
        }

        setLoading(true)
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })
        setLoading(false)

        if (error) {
            setErrors({ email: "We couldn’t send the link. Try again in a moment." })
            return
        }

        setSent(true)
    }

    return sent ? (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h2 className={styles.title}>Check your email</h2>
                <p className={styles.subtitle}>
                    We've sent an email to <strong>{email}</strong>, please check your inbox.
                </p>
                <div className={styles.footerLinks}>
                    <Button to="/" fullWidth>Back to sign in</Button>
                </div>
            </div>
        </div>
    ) : (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h2 className={styles.title}>Forgot password</h2>
                <p className={styles.subtitle}>
                    Enter your email address and we’ll send you a reset link.
                </p>

                <form className={styles.form} onSubmit={onSubmit} noValidate aria-busy={loading ? "true" : "false"}>
                    <div className={styles.fieldGroup}>
                        <InputField
                            id="reset-email"
                            name="email"
                            label="Email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={onEmailChange}
                            icon={<FaEnvelope />}
                            error={!!errors.email}
                            errorText={errors.email}
                        />
                    </div>
                        <Button type="submit" fullWidth loading={loading}> Send reset link </Button>

                    <div className={styles.footerLinks}>
                        <Link to="/">Back to sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}