import styles from "./ResetPassword.module.css"
import InputField from "../../components/InputField/InputField"
import Button from "../../components/Button/Button"
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function ResetPassword() {
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [errors, setErrors] = useState({ password: "", confirm: "" })
    const [loading, setLoading] = useState(false)
    const [showPwd, setShowPwd] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [stage, setStage] = useState("checking")

    useEffect(() => {
        const { data: sub } = supabase.auth.onAuthStateChange((event) => {
            if (event === "PASSWORD_RECOVERY") {
                setStage("ready")
                history.replaceState(null, "", "/reset-password")
            }
        })

        supabase.auth.getSession().then(({ data }) => {
            if (data?.session) {
                setStage("ready")
                history.replaceState(null, "", "/reset-password")
            } else {
                setStage("error")
            }
        })

        return () => sub.subscription.unsubscribe()
    }, [])

    function onPwdChange(e) {
        setPassword(e.target.value)
        if (errors.password) setErrors(x => ({ ...x, password: "" }))
    }

    function onPwdConfirmChange(e) {
        setConfirm(e.target.value)
        if (errors.confirm) setErrors(x => ({ ...x, confirm: "" }))
    }

    async function onSubmit(e) {
        e.preventDefault()
        setErrors({ password: "", confirm: "" })

        if (!password) { 
            setErrors(x => ({ ...x, password: "Enter a new password." }))
            return 
        }
        if (password.length<8) { 
            setErrors(x => ({ ...x, password: "Password must be at least 8 characters." }))
            return 
        }
        if (!confirm) { 
            setErrors(x => ({ ...x, confirm:  "Confirm your password." })) 
            return 
        }
        if (password!==confirm) {
            setErrors(x => ({ ...x, confirm:  "Passwords do not match." }));
            return 
        }

        setLoading(true)
        const { error: updErr } = await supabase.auth.updateUser({ password })
        setLoading(false)

        if (updErr) { 
            setErrors({ password: "Could not update your password. Try again.", confirm: "" }) 
            return 
        }

        try {
            await supabase.auth.signOut({ scope: "global" })
        } catch {

        }

        setStage("done")
    }

    if (stage === "checking") return null

    if (stage === "error") {
        return (
            <div className={styles.wrapper}>
            <div className={styles.card}>
                <h2 className={styles.title}>Link invalid or expired</h2>
                <p className={styles.subtitle}>Request a new reset link from the sign-in page.</p>
                <Button to="/" fullWidth>Back to sign in</Button>
            </div>
            </div>
        )
    }

    if (stage === "done") {
        return (
            <div className={styles.wrapper}>
            <div className={styles.card}>
                <h2 className={styles.title}>Password updated</h2>
                <p className={styles.subtitle}>You can now sign in with your new password.</p>
                <Button to="/" fullWidth>Back to sign in</Button>
            </div>
            </div>
        )
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h2 className={styles.title}>Set a new password</h2>
                <p className={styles.subtitle_02}>Choose a strong password you haven’t used before.</p>

                <form className={styles.form} onSubmit={onSubmit} noValidate aria-busy={loading ? "true" : "false"}>
                    <div className={styles.fieldGroup}>
                        <InputField
                            id="new-password"
                            name="new-password"
                            type={showPwd ? "text" : "password"}
                            autoComplete="new-password"
                            label="New password"
                            value={password}
                            onChange={onPwdChange}
                            icon={<FaLock />}
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

                        <InputField
                            id="confirm-password"
                            name="confirm-password"
                            type={showConfirm ? "text" : "password"}
                            autoComplete="new-password"
                            label="Confirm password"
                            value={confirm}
                            onChange={onPwdConfirmChange}
                            icon={<FaLock />}
                            trailing={
                                <button
                                type="button"
                                onClick={() => setShowConfirm(v => !v)}
                                aria-label={showConfirm ? "Hide password" : "Show password"}
                                title={showConfirm ? "Hide password" : "Show password"}
                                >
                                {showConfirm ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            }
                            error={!!errors.confirm}
                            errorText={errors.confirm}
                        />

                    </div>

                    <Button type="submit" fullWidth loading={loading}>
                        Update password
                    </Button>
                </form>
            </div>
        </div>
    )
}