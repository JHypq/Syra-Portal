import styles from "./Footer.module.css"
import { Link } from "react-router-dom"
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className={styles.footer} role="contentinfo">
            <div className={styles.footerWrapper}>
                <div className={styles.logoSection}>
                    <div className={styles.logoIcon} aria-hidden="true"><span>S</span></div>
                    <p className={styles.brandName}>Syra Portal</p>
                </div>
                <div className={styles.socialSection} aria-label="Social media">
                      <ul>
                        <li>
                        <a href="#" aria-label="Facebook">
                            <FaFacebookF />
                        </a>
                        </li>
                        <li>
                        <a href="#" aria-label="Twitter X">
                            <FaXTwitter />
                        </a>
                        </li>
                        <li>
                        <a href="#" aria-label="LinkedIn">
                            <FaLinkedinIn />
                        </a>
                        </li>
                    </ul>
                </div>
                <div className={styles.linkSection} aria-label="Footer links">
                    <ul>
                        <li><Link to="#">Privacy Policy</Link></li>
                        <li><Link to="#">Terms of Service</Link></li>
                        <li><Link to="#">Cookie Policy</Link></li>
                        <li><Link to="#">Help / Support</Link></li>
                        <li><Link to="#">Contact Us</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}