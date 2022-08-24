import styles from "../styles/navbar.module.css";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className={styles.navvcnt}>
      <Link href="/">
        <h1 className={styles.logoheaderbig}>
          AFRI. <span>Gather</span>
        </h1>
      </Link>
    </div>
  );
};

export default NavBar;
