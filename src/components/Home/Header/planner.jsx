import styles from "./styles.module.css";
import logo from "../../../assets/CompassHeader.svg";
import logout from "../../../assets/logout.svg";
import { useState, useEffect } from "react";
import cityClima from "../../../Api";
import { dados, db } from "../../../FirebaseConection";
import plus from "../../../assets/plus.svg";
import { collection, addDoc } from "firebase/firestore";
import menos from "../../../assets/icon_menos.svg";

export default function Header() {
  const [horario, setHorario] = useState("");
  const [data, setData] = useState("");

  const [weatherData, setWeatherData] = useState(null);
  const [dado, setCity] = useState([]);

  const [descricao, setDescricao] = useState("");
  const [semana, setSemana] = useState("monday");
  const [selectSemana, setSelectSemana] = useState("monday");
  const [hora, setHora] = useState("00:00");
  const [task, setTask] = useState([]);

  const [cor, setCor] = useState("monday");
  const user = localStorage.getItem("user");

  const mudaCor = (semana) => {
    setCor(semana);
  };

  const adicionarTarefa = async () => {
    console.log(task);
    try {
      const newTask = {
        descricao: descricao,
        semana: selectSemana,
        hora: hora,
        cor: cor,
        user: user,
      };
      await addDoc(collection(db, "tarefas"), newTask);
      alert("Tarefa adicionada");
      setDescricao("");
      setSelectSemana("monday");
      user;
      setHora("00:00");
      // setSemana(semana);
      console.log(semana);
      setCor(semana);
      setTask((atual) => {
      return [...atual, newTask];
      });
    } catch (error) {
      console.log(error);
    }
    console.log(task);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const users = await dados();

        if (users.length > 0) {
          const cidade = users[0].city;
          const chave_api = "6793186352a0010d32b351353dc8ba84";
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave_api}`;
          const response = await fetch(url);
          const data = await response.json();
          const temperatureCelsius = Math.round(data.main.temp - 273.15);
          const icon = data.weather[0].icon;
          const weatherData = { temperature: temperatureCelsius, icon };

          setWeatherData(weatherData);
          setCity(users);
        }
      } catch {
        console.error("Erro ao obter cidades");
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
    <div>
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
          <h1>{weatherData && weatherData.temperature}°C</h1>
          {weatherData && (
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`}
              alt="Weather Icon"
            />
          )}
          <p>
            {dado[0]?.city} - {dado[0]?.country}
          </p>
        </div>
        <div className={styles.logos}>
          <a href="https://compass.uol/pt/home/" target="blank">
            <img src={logo} alt="" />
          </a>

          <button>
            <img src={logout} alt="" />
            <p>Logout</p>
          </button>
        </div>
      </header>

      <div className={styles.container__input}>
        <input
          type="text"
          placeholder="Task or issue"
          className={styles.input__task}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <select
          name="dia"
          className={styles.dia}
          onChange={(e) => setSelectSemana(e.target.value)}
          value={selectSemana}
        >
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>
        <select
          name="hora"
          className={styles.hora}
          onChange={(e) => setHora(e.target.value)}
          value={hora}
        >
          <option value="00:00">00:00</option>
          <option value="00:30">00:30</option>
          <option value="01:00">01:00</option>
          <option value="01:30">01:30</option>
          <option value="02:00">02:00</option>
          <option value="02:30">02:30</option>
          <option value="03:00">03:00</option>
          <option value="03:30">03:30</option>
          <option value="04:00">04:00</option>
          <option value="04:30">04:30</option>
          <option value="05:00">05:00</option>
          <option value="05:30">05:30</option>
          <option value="06:00">06:00</option>
          <option value="06:30">06:30</option>
          <option value="07:00">07:00</option>
          <option value="07:30">07:30</option>
          <option value="08:00">08:00</option>
          <option value="08:30">08:30</option>
          <option value="09:00">09:00</option>
          <option value="09:30">09:30</option>
          <option value="10:00">10:00</option>
          <option value="10:30">10:30</option>
          <option value="11:00">11:00</option>
          <option value="11:30">11:30</option>
          <option value="12:00">12:00</option>
          <option value="12:30">12:30</option>
          <option value="13:00">13:00</option>
          <option value="13:30">13:30</option>
          <option value="14:00">14:00</option>
          <option value="14:30">14:30</option>
          <option value="15:00">15:00</option>
          <option value="15:30">15:30</option>
          <option value="16:00">16:00</option>
          <option value="16:30">16:30</option>
          <option value="17:00">17:00</option>
          <option value="17:30">17:30</option>
          <option value="18:00">18:00</option>
          <option value="18:30">18:30</option>
          <option value="19:00">19:00</option>
          <option value="19:30">19:30</option>
          <option value="20:00">20:00</option>
          <option value="20:30">20:30</option>
          <option value="21:00">21:00</option>
          <option value="21:30">21:30</option>
          <option value="22:00">22:00</option>
          <option value="22:30">22:30</option>
          <option value="23:00">23:00</option>
          <option value="23:30">23:30</option>
        </select>
      </div>

      <div className={styles.buttons}>
        <button className={styles.icon_plus} onClick={adicionarTarefa}>
          <img src={plus} alt="" />
          <p className={styles.calendar}>Add to calendar</p>
        </button>
        <button className={styles.icon_menos}>
          <img src={menos} alt="" />
          <p className={styles.delete}>Delete All</p>
        </button>
      </div>

      <div className={styles.calendario}>
        <button
          className={`${styles.tab} ${styles.monday} ${
            cor === "monday" ? styles.corSemana : ""
          }`}
          onClick={() => mudaCor("monday")}
        >
          <p className={styles.semana}>Monday</p>
        </button>
        <button
          className={`${styles.tab} ${styles.tuesday} ${
            cor === "tuesday" ? styles.corSemana : ""
          }`}
          onClick={() => mudaCor("tuesday")}
        >
          <p className={styles.semana}>Tuesday</p>
        </button>
        <button
          className={`${styles.tab} ${styles.wednesday} ${
            cor === "wednesday" ? styles.corSemana : ""
          }`}
          onClick={() => mudaCor("wednesday")}
        >
          <p className={styles.semana}>Wednesday</p>
        </button>
        <button
          className={`${styles.tab} ${styles.thursday} ${
            cor === "thursday" ? styles.corSemana : ""
          }`}
          onClick={() => mudaCor("thursday")}
        >
          <p className={styles.semana}>Thursday</p>
        </button>
        <button
          className={`${styles.tab} ${styles.friday} ${
            cor === "friday" ? styles.corSemana : ""
          }`}
          onClick={() => mudaCor("friday")}
        >
          <p className={styles.semana}>Friday</p>
        </button>
        <button
          className={`${styles.tab} ${styles.saturday} ${
            cor === "saturday" ? styles.corSemana : ""
          }`}
          onClick={() => mudaCor("saturday")}
        >
          <p className={styles.semana}>Saturday</p>
        </button>
        <button
          className={` ${styles.tab} ${styles.sunday} ${
            cor === "sunday" ? styles.corSemana : ""
          }`}
          onClick={() => mudaCor("sunday")}
        >
          <p className={styles.semana}>Sunday</p>
        </button>
      </div>

      <div className={styles.time_planner}>
        <h1>Time</h1>
      </div>

      <ul className={styles.container_task}>
        {task.map((elemento) =>
          cor === "" || (elemento.semana && elemento.semana.includes(cor)) ? (
            <li key={elemento.descricao}>
              <div className={styles.tasks}>
                <div className={` ${styles.horas_task} ${styles[elemento.semana]}`}>
                  <span>{elemento.hora}</span>
                </div>
                <div>
                  <div className={` ${styles.marcador} ${styles[elemento.semana]}`}></div>
                  <div className={` ${styles.text_task} ${styles[elemento.semana]}`}>
                    <span>{elemento.descricao}</span>
                    <button>Delete</button>
                  </div>
                </div>
              </div>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
}
