import { Link } from "react-router-dom";
import styles from "./index.module.css";

export default function FormRegister() {
  return (
    <div className={styles.container__form}>
      <div className={styles.container}>
        <h1>Welcome,</h1>
        <p>Please, register to continue</p>
      </div>

      <form className={styles.form_id}>
        <div className="first__name">
          <label htmlFor="meuInput">first name</label>
          <input type="text" placeholder="Your first name" />
        </div>

        <div>
          <label htmlFor="meuInput">last name</label>
          <input type="text" placeholder="Your last name" />
        </div>

        <div>
          <label htmlFor="meuInput">birth date</label>
          <input type="text" placeholder="MM/DD/YYYY" />
        </div>

        <div>
          <label htmlFor="meuInput">Country</label>
          <input type="text" placeholder="Your Country" />
        </div>

        <div>
          <label htmlFor="meuInput">City</label>
          <input type="text" placeholder="Your City" />
        </div>

        <div>
          <label htmlFor="meuInput">e-mail</label>
          <input type="text" placeholder="A valid e-mail here" />
        </div>

        <div>
          <label htmlFor="meuInput">password</label>
          <input type="password" placeholder="Your password" />
        </div>

        <div>
          <label htmlFor="meuInput">password</label>
          <input type="password" placeholder="Comfirm your password" />
        </div>
      </form>

      <Link>Register Now</Link>
    </div>
  );
}
