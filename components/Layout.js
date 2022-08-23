import NavBar from "./NavBar";
import styles from "../styles/layout.module.css";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutbody}>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
