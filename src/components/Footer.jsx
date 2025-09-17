import styles from "./Footer.module.css"
import { Link } from "react-router-dom"
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

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
                        <a 
                            href="https://facebook.com/" 
                            aria-label="Facebook" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FaFacebookF />
                        </a>
                        </li>
                        <li>
                        <a 
                            href="https://x.com/" 
                            aria-label="Twitter X" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FaXTwitter />
                        </a>
                        </li>
                        <li>
                        <a 
                            href="https://www.linkedin.com/" 
                            aria-label="LinkedIn" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FaLinkedinIn />
                        </a>
                        </li>
                    </ul>
                </div>
                <div className={styles.linkSection} aria-label="Footer links">
                    <ul>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/term-of-service">Terms of Service</Link></li>
                        <li><Link to="/cookie-policy">Cookie Policy</Link></li>
                        <li><Link to="/support">Help / Support</Link></li>
                        <li><Link to="/contact-us">Contact Us</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}