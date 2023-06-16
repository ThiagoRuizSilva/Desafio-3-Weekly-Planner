import styles from "./styles.module.css";

import FormRegister from "../../components/Form register";
import Home from "../../components/Home";

export default function Register() {
  return (
    <div className={styles.container}>
      <FormRegister />
      <Home />
    </div>
  );
}
