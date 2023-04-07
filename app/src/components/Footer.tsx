import styles from "../styles/styles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <img src="/logo.png" className={styles.logo} height="100px" alt="logo" />
      <p className={styles.copyright}>© 2023 - All rights reserved</p>
    </footer>
  );
}
