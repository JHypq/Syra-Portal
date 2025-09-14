import styles from "./NotFound.module.css"
import Button from "../../components/Button/Button"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.code} aria-hidden="true">404</div>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.copy}>
          The page you’re looking for doesn’t exist or may have moved.
        </p>
        <div className={styles.actions}>
          <Button to="/">Back to home</Button>
          <Link to="#" className={styles.secondary}>Contact support</Link>
        </div>
      </div>
    </div>
  )
}