import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { TiLockClosedOutline } from "react-icons/ti";
import { AiOutlineUser } from "react-icons/ai";
import { db } from "../../../FirebaseConection";
import { useState } from "react";

export default function Form() {
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')





  return (
    <div className={styles.container__form}>
      <div className={styles.container}>
        <h1>Welcome,</h1>
        <p>To continue browsing safely, log in to the network.</p>
        <form className={styles.container__login}>
          <h2>Login</h2>
          <div>
            <input type="text" placeholder="user name" id="user__id" value={email} onChange={(e) => setEmail(e.target.value)} />
            <AiOutlineUser />
          </div>

          <div className="password__id">
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <TiLockClosedOutline size={30} style={{ marginBottom: "-10px" }} />
          </div>

          <Link to="/register">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
