import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerCols}>

        <div className={styles.col}>
          <h4>CUSTOMER SERVICE</h4>
          <ul>
            <li>Help & Contact Us</li>
            <li>Returns & Refunds</li>
            <li>Online Stores</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>COMPANY</h4>
          <ul>
            <li>What We Do</li>
            <li>Available Services</li>
            <li>Latest Posts</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>SOCIAL MEDIA</h4>
          <ul>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>Tumblr</li>
            <li>Pinterest</li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>PROFILE</h4>
          <ul>
            <li>My Account</li>
            <li>Checkout</li>
            <li>Order Tracking</li>
            <li>Help & Support</li>
          </ul>
        </div>

      </div>

      <div className={styles.bottom}>
        © 2026 Kashop. All Rights Reserved.
      </div>
    </footer>
  );
}
