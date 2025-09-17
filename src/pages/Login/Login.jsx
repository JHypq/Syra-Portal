import styles from "./Login.module.css"
import InputField from "../../components/InputField/InputField"
import Button from "../../components/Button/Button"
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import { CgDanger } from "react-icons/cg"
import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabaseClient"

export default function Login({ session, loading: authLoading }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPwd, setShowPwd] = useState(false)
    const [errors, setErrors] = useState({ email: "", password: "", form: "" })

    const navigate = useNavigate()

    const pwdRef = useRef(null)

    const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v)

    function mapAuthError(err) {
        const msg = (err?.message || "").toLowerCase()

        // Invalid credentials
        if (msg.includes("invalid login credentials")) {
            return "Wrong email or password."
        }

        // Rate limit
        if (err?.status === 429 || msg.includes("too many request")) {
            return "Too many attempts. Please wait a moment and try again."
        }

        // Disabled / banned / blocked accounts
        if (err?.status === 403 || /disabled|blocked|banned/.test(msg)) {
            return "This account has been disabled. Contact your administrator."
        }

        // Fallback: network/unknown
        return "We’re having trouble connecting. Please try again."
    }

    async function onSubmit(e) {
        e.preventDefault()

        const next = { email: "", password: "" }

        if (!email.trim()) next.email = "Enter your email."
        else if (!isValidEmail(email)) next.email = "Enter a valid email address."

        if (!password) next.password = "Enter your password."

        if (next.email || next.password) {
            setErrors(next)
            setFormError("")
            return
        }

        setLoading(true)
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password })

            if (error) {
                setErrors({ email: "", password: "" })
                setPassword("")
                setFormError(mapAuthError(error))
                pwdRef.current?.focus()
                return
            }

            setErrors({ email: "", password: "" })
            setFormError("")
            navigate("/dashboard", { replace: true })
        } catch {
            setFormError("We’re having trouble connecting. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    function onEmailChange(e) {
        setEmail(e.target.value)
        if (errors.email) setErrors((x) => ({ ...x, email: "" }))
        setFormError("")
    }

    function onPasswordChange(e) {
        setPassword(e.target.value)
        if (errors.password) setErrors((x) => ({ ...x, password: "" }))
        setFormError("")
    }

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginCard}>
                <h2>Welcome back!</h2>
                <p>Sign in to access your dashboard and continue your work.</p>
                <form className={styles.form} onSubmit={onSubmit} noValidate aria-busy={loading ? "true" : "false"}>
                    <div className={styles.fieldGroup}>
                        <InputField
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={onEmailChange}
                            icon={<FaEnvelope />}
                            error={!!errors.email}
                            errorText={errors.email}
                        />

                        <InputField
                            id="password"
                            name="password"
                            label="Password"
                            type={showPwd ? "text" : "password"}
                            value={password}
                            onChange={onPasswordChange}
                            icon={<FaLock />}
                            ref={pwdRef}
                            trailing={
                                <button
                                    type="button"
                                    onClick={() => setShowPwd(v => !v)}
                                    aria-label={showPwd ? "Hide password" : "Show password"}
                                    title={showPwd ? "Hide password" : "Show password"}
                                >
                                    {showPwd ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            }
                            error={!!errors.password}
                            errorText={errors.password}
                        />
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                    {formError && (
                        <div role="alert" className={styles.formError}>
                            <CgDanger className={styles.errorIcon} aria-hidden="true" />
                            <span>{formError}</span>
                        </div>
                    )}
                    <Button type="submit" fullWidth loading={loading}>Sign in</Button>
                </form>
            </div>
        </div>
    )
}