import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";

import { TiLockClosedOutline } from "react-icons/ti";
import { AiOutlineUser } from "react-icons/ai";
import { auth } from "../../FirebaseConection";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";



export default function Form() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loged, setLoged] = useState(false);


  

  async function handleLogin(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
     
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setLoged(false);
          localStorage.setItem("user", email)
          alert("Usuario logado");
          navigate("/")
        })
        .catch(() => {
          if(confirm("Email não encontrado! Deseja realizar o cadastro?") === true) {
            navigate("/register")
          }
          // alert("Erro ao logar senha incorretas");
          setLoged(true);

          // navigate('/register')
        });
    } else {
      alert("prencha os campo");
    }
  }

  const spanClassName = loged ? "input_error" : "";

  return (
    <div className={styles.container__form}>
      <div className={styles.container}>
        <h1>Welcome,</h1>
        <p>To continue browsing safely, log in to the network.</p>
        <form className={styles.container__login} onSubmit={handleLogin}>
          <h2>Login</h2>
          {/* <div className={styles.label_float}> */}
          <div className={styles.input__container}>
            <input
              type="text"
              placeholder="user name"
              id="user__id"
              className={loged ? styles.input_error : ""}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span id="user__id" className="label__user">
              <AiOutlineUser
                color="#e0e0e0"
                fontSize={"20px"}
                id={styles.user__id}
                className={email !== "" ? styles.move : ""}
              />
            </span>
          </div>
          {/* </div>  */}

          <div className={styles.input__container}>
            <input
              type="password"
              placeholder="password"
              value={password}
              className={loged ? styles.input_error : ""}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TiLockClosedOutline
              color="#e0e0e0"
              fontSize={"20px"}
              id={styles.user_password}
              className={password !== "" ? styles.move : ""}
            />
          </div>

          <div className={styles.erro__login}>
            {loged ? (
              <span>Wow, invalid username or password. Please, try again!</span>
            ) : (
              ""
            )}
          </div>

          <button type="submit">
          <Link to="/">Log in</Link>
          </button>
          {/* <Link to="/register">
            Login
          </Link> */}
        </form>
      </div>
    </div>
  );
}
