import { Link } from "react-router-dom";
import styles from "./index.module.css";

import { TiLockClosedOutline } from "react-icons/ti";
import { AiOutlineUser } from "react-icons/ai";
import { auth } from "../../../FirebaseConection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate()
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')


async function handleLogin(e) {
e.preventDefault()

if(email !== '' && password !== '') {
  await signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    navigate('/register')
  })
  .catch(()=> {
    alert("erro ao logar senha incorretas")
  })


}else {
  alert("prencha os campo")
}

}


  return (
    <div className={styles.container__form} >
      <div className={styles.container}>
        <h1>Welcome,</h1>
        <p>To continue browsing safely, log in to the network.</p>
        <form className={styles.container__login} onSubmit={handleLogin}>
          <h2>Login</h2>
           <div className={styles.label_float}>
            <div className={styles.input__container}>
            <input type="text" placeholder="user name" id="user__id" className={styles.form__input} value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="user__id">
              <AiOutlineUser />
            </label>
            </div>
          </div> 


          <div className={styles.password__id}>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <TiLockClosedOutline size={30} style={{ marginBottom: "-10px" }} />
          </div>

          <button type="submit" >Login</button>
           {/* <Link to="/register">
            Login
          </Link> */}
        </form>
      </div>
    </div>
  );
}
