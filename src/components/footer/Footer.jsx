import styles from "./footer.module.css";
import { useTranslation } from "react-i18next";
export default function Footer() {

  const {t} = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerCols}>

        <div className={styles.col}>
          <h4>{t("Customer Service")}</h4>
          <ul>
            <li>{t("Help & Contact Us")}</li>
            <li>{t("Returns & Refunds")}</li>
            <li>{t("Online Stores")}</li>
            <li>{t("Terms & Conditions")}</li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>{t("Company")}</h4>
          <ul>
            <li>{t("What We Do")}</li>
            <li>{t("Available Services")}</li>
            <li>{t("Latest Posts")}</li>
            <li>{t("FAQs")}</li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>{t("Social Media")}</h4>
          <ul>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>Tumblr</li>
            <li>Pinterest</li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4>{t("PROFILE")}</h4>
          <ul>
            <li>{t("My Account")}</li>
            <li>{t("Checkout")}</li>
            <li>{t("Order Tracking")}</li>
            <li>{t("Help & Support")}</li>
          </ul>
        </div>

      </div>

      <div className={styles.bottom}>
        © 2026 Kashop. All Rights Reserved.
      </div>
    </footer>
  );
}
