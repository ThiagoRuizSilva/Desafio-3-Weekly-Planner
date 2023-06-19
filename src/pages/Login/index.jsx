import Home from "../../components/Home";
import Form from "../../components/Form";
import styles from "./styles.module.css";
export default function Login() {
  return (
    <div className={styles.container}>
      <Form />
      <Home />
    </div>
  );
}

