import NavBar from "./NavBar";
import styles from "../styles/layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutbody}>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
