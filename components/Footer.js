import styles from "../styles/footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footercnt}>
      <div className={styles.sendmenews}>
        <h2>Send me news</h2>
        <form action="" className={styles.sendmenewsform}>
          <input type="email" placeholder="Enter your email" />
          <button>GET INSIGHT</button>
        </form>
      </div>
      <div className={styles.footerbottom}>
        <Link href="/">
          <h1 className={styles.logoheaderbig}>
            AFRI. <span>Trump</span>
          </h1>
        </Link>

        <div className={styles.footerbottom_right}><p>Copyright © 2022 AFRIgather All rights reserved.</p>
        <p>Created by @9trocoder</p></div>
        
      </div>
    </div>
  );
};

export default Footer;
