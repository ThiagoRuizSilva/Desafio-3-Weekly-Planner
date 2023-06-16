import { Link } from "react-router-dom";
import styles from "./index.module.css";

import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../FirebaseConection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";




export default function FormRegister() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  function formatBirthdate(input) {
    const onlyNumbers = input.replace(/[^\d]/g, "");
    const day = onlyNumbers.slice(0, 2);
    const month = onlyNumbers.slice(2, 4);
    const year = onlyNumbers.slice(4, 8);

    let formattedDate = day;
    if (month.length > 0) {
      formattedDate += `/${month}`;
    }
    if (year.length > 0) {
      formattedDate += `/${year}`;
    }

    return formattedDate;
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      // Verificar a idade mínima
      // await createUserWithEmailAndPassword(auth, email, password)

      //      .then(() => {
      //         alert("Email validado")
      //         // navigate('/');
      //       })
      //       .catch(() => {
      //        alert('Email já existente insira outro');
      //      });
        


      const currentDate = new Date();
      const birthdateInput = new Date(birthdate);
      const ageDiffMilliseconds = currentDate - birthdateInput;
      const ageDate = new Date(ageDiffMilliseconds);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);

      if (age < 18) {
        alert("Você deve ter pelo menos 18 anos para se cadastrar.");
        return;
      }
    }
     if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === "" ||
      birthdate === "" ||
      country === "" ||
      city === "" ||
      confirmPassword === ""
    ) {
      alert("Preencha todos campos por favor");
      return
    }

    if (!handleEmail(email)) {
      alert("O email não atende aos requisitos")
      return
    }
    if(!handlePassword(password)){
      alert("A senha não atende aos requisitos")
      return
    }
    if (password != confirmPassword) {
      alert("As senhas não correspondem.");
      return
    }

    await createUserWithEmailAndPassword(auth, email, password)

           .then(() => {
              alert("Email validado")
              // navigate('/');
            })
            .catch(() => {
             alert('Email já existente insira outro');
           });

    await addDoc(collection(db, "usuario"), {
      email,
      password,
      country,
      city,
    }); alert("Registro feito com sucesso");
    navigate('/')


  }



  function capitalizeFirstLetter(string) {
    const words = string.split(" ");

    const capitalizedWords = words.map((word) => {
      if (word === "") {
        return word;
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    });

    return capitalizedWords.join(" ");
  }

  function handleEmail(email) {
    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regexEmail.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  handleEmail();

  function handlePassword(password) {
    let regexPassword =  /^(?=.[A-Z])(?=.[!@#$%^&])(?=.\d).+$/;
  
    return regexPassword.test(password) 
     
    
  }
  
  handlePassword(); 
  




  return (
    <div className={styles.container__form}>
      <div className={styles.container}>
        <h1>Welcome,</h1>
        <p>Please, register to continue</p>
      </div>

      <form className={styles.form_id} onSubmit={handleRegister}>
        <div className="first__name">
          <label htmlFor="meuInput">first name</label>
          <input
            type="text"
            placeholder="Your first name"
            value={firstName}
            onChange={(e) =>
              setFirstName(capitalizeFirstLetter(e.target.value))
            }
          />
        </div>

        <div>
          <label htmlFor="meuInput">last name</label>
          <input
            type="text"
            placeholder="Your last name"
            value={lastName}
            onChange={(e) => setLastName(capitalizeFirstLetter(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="meuInput">birth date</label>
          <input
            type="text"
            placeholder="MM/DD/YYYY"
            value={formatBirthdate(birthdate)}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="meuInput">Country</label>
          <input
            type="text"
            placeholder="Your Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="meuInput">City</label>
          <input
            type="text"
            placeholder="Your City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="meuInput">e-mail</label>
          <input
            type="text"
            placeholder="A valid e-mail here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="meuInput">password</label>
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="meuInput">password</label>
          <input
            type="password"
            placeholder="Comfirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register Now</button>
      </form>

      {/* <Link>Register Now</Link> */}
    </div>
  );
}
