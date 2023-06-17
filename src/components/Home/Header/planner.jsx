import styles from "./styles.module.css";
import logo from "../../../assets/CompassHeader.svg";
import logout from "../../../assets/logout.svg";
import { useState, useEffect } from "react";
import cityClima from "../../../Api";
import { dados } from "../../../FirebaseConection";



export default function Header() {
    const [horario, setHorario] = useState("");
    const [data, setData] = useState("");

    const [weatherData, setWeatherData] = useState(null);
    const [dado, setCity] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const users = await dados();

        if (users.length > 0) {
          const data = await cityClima(users[0].city);
          setWeatherData(data);
          setCity(users);
        }
      } catch (error) {
        console.error("Erro ao obter cidades ou dados do clima:", error);
      }
    };

    fetchWeatherData();
  }, []);


    useEffect(() => {
      const contador = setInterval(() => {
        const data = new Date();
        const meses = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const dia = String(data.getDate()).padStart(2, "0");
        const ano = String(data.getFullYear());
        const mes = meses[data.getMonth()];
        const horas = String(data.getHours()).padStart(2, "0");
        const minuto = String(data.getMinutes()).padStart(2, "0");
        setData(`${mes} ${dia}th, ${ano}`);
        setHorario(`${horas}:${minuto}`);
      }, 1000);
  
      return () => {
        clearInterval(contador);
      };
    }, []);





  return (
    <header>
      <div className={styles.container}>
        <h1>Weekly Planner</h1>
        <p>Use this planner to organize your daily issues.</p>
      </div>
      <div className={styles.dates__header}>
        <h1>{horario}</h1>
        <p>{data}</p>
      </div>
      <div className={styles.clima__tempo}>
        <p>
            {dado[0]?.city} - {dado[0]?.country}
        </p>

      </div>
      <div className={styles.logos}>
        <img src={logo} alt="" />
        <button>
          <img src={logout} alt="" />
          <p>Logout</p>
        </button>
      </div>
    </header>
  );
}
