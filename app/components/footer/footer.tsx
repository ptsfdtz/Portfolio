import styles from "./footer.module.css";
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>© {year} ptsfdtz</p>
    </footer>
  );
}

export { Footer };
