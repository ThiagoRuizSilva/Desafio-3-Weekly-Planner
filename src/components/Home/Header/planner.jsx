import styles from "./styles.module.css";
import logo from "../../../assets/CompassHeader.svg";
import logout from "../../../assets/logout.svg";
import { useState, useEffect } from "react";
import cityClima from "../../../Api";
import { dados } from "../../../FirebaseConection";
import plus from "../../../assets/plus.svg";
import menos from "../../../assets/icon_menos.svg";

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
            <img src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`} alt="Weather Icon" />
            )}
          <p>
            {dado[0]?.city} - {dado[0]?.country}
          </p>
        </div>
        <div className={styles.logos}>
          <a href="https://compass.uol/pt/home/" target="_blank">
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
        />
        <select name="dia" className={styles.dia}>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
        <select name="hora" className={styles.hora}>
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
        <button className={styles.icon_plus}>
          <img src={plus} alt="" />
          <p className={styles.calendar}>Add to calendar</p>
        </button>
        <button className={styles.icon_menos}>
          <img src={menos} alt="" />
          <p className={styles.delete}>Delete All</p>
        </button>
      </div>

            <div className={styles.calendario}>
              <div className={styles.monday}>
                <p className={styles.semana}>Monday</p>
              </div>
              <div className={styles.tuesday}>
                <p className={styles.semana}>Tuesday</p>
              </div>
              <div className={styles.wednesday}>
                <p className={styles.semana}>Wednesday</p>
              </div>
              <div className={styles.thursday}>
                <p className={styles.semana}>Thursday</p>
              </div>
              <div className={styles.friday}>
                <p className={styles.semana}>Friday</p>
              </div>
              <div className={styles.saturday}>
                <p className={styles.semana}>Saturday</p>
              </div>
              <div className={styles.sunday}>
                <p className={styles.semana}>Sunday</p>
              </div>
            </div>


            <div className={styles.time_planner}>
              <h1>Time</h1>
            </div>


            <ul className={styles.container_task}>
              <li>
                <div className={styles.tasks}>
                <div className={styles.horas_task}>
                  <span>10h30m</span>
                </div>
                <div className={styles.text_task}>
                  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
                  <button>Delete</button>
                </div>
                </div>
              </li>
            </ul>
    </div>
  );
}
