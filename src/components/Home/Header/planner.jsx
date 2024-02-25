
import styles from "./styles.module.css";
import logo from "../../../assets/CompassHeader.svg";
import logout from "../../../assets/logout.svg";
import { useState, useEffect } from "react";
import Clima from "../../clima";
import { auth, db, userId } from "../../../FirebaseConection";
import plus from "../../../assets/plus.svg";
import menos from "../../../assets/icon_menos.svg";
import { signOut } from "firebase/auth";
import {
  collection,
  deleteDoc,
  getDocs,
  doc,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export default function Header() {
  const [horario, setHorario] = useState("");
  const [data, setData] = useState("");
  const [task, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedDay, setSelectedDay] = useState("monday");
  const [time, setTime] = useState("00:00");

  const [activeDay, setActiveDay] = useState("monday");



  const handleDayClick = (day) => {
    setActiveDay(day);
    console.log(activeDay)
  };

  

  useEffect(() => {
    const filterUsersTasks = query(
      collection(db, "tasks"),
      where("userId", "==", userId)
    );

    const retrieve = onSnapshot(filterUsersTasks, (snapshot) => {
      const taskList = [];
      snapshot.forEach((doc) => {
        const task = doc.data();
        const taskId = doc.id;
        const taskWithId = { ...task, id: taskId };
        taskList.push(taskWithId);
      });

      taskList.sort((top, bottom) => {
        if (top.time && bottom.time) {
          return top.time.localeCompare(bottom.time);
        }
        return 0;
      });

      setTasks(taskList);
    });

    return () => retrieve();
  }, [userId]);

  useEffect(() => {
    const contador = setInterval(() => {
      const data = new Date();
      const meses = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
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

  const createTask = async (userId, task, day, taskTime) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        userId: userId,
        task: task,
        day: day,
        time: taskTime,
      });
      const novoId = docRef.id;
      console.log("ID gerado:", novoId);
      alert("task created");
      setTitle("");
      setSelectedDay("monday");
      setTime("00:00");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  const handleAdd = () => {
    if (title === "") {
      alert("please provide a title");
      return;
    }
    createTask(userId, title, selectedDay, time);
  };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "tasks", id);
      await deleteDoc(docRef);
      alert("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const Logout = async () => {
    await signOut(auth);
  };



  async function handleDeleteDay(day) {
    const filterTasksDAy = await getDocs(
      query(collection(db, "tasks"), where("day", "==", activeDay))
    );

    filterTasksDAy.forEach(async (doc) => {
      try {
        await deleteDoc(doc.ref);
        alert("Task deleted successfully");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    });
  }

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
        <Clima/>
        <div className={styles.logos}>
          <a href="https://compass.uol/pt/home/" target="blank">
            <img src={logo} alt="" />
          </a>

          <button onClick={Logout}>
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          name="dia"
          className={styles.dia}
          onChange={(e) => setSelectedDay(e.target.value)}
          value={selectedDay}
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
          onChange={(e) => setTime(e.target.value)}
          value={time}
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
        <button className={styles.icon_plus} onClick={handleAdd}>
          <img src={plus} alt="" />
          <p className={styles.calendar}>Add to calendar</p>
        </button>
        <button className={styles.icon_menos} onClick={handleDeleteDay}>
          <img src={menos} alt="" />
          <p className={styles.delete}>Delete All</p>
        </button>
      </div>

      <div className={styles.calendario}>
        <button
          className={`${styles.tab} ${styles.monday} ${
            activeDay === "monday" ? styles.corSemana : ""
          }`}
          onClick={() => handleDayClick("monday")}
        >
          <p className={styles.semana}>Monday</p>
        </button>
        <button
          className={`${styles.tab} ${styles.tuesday} ${
            activeDay === "tuesday" ? styles.corSemana : ""
          }`}
          onClick={() => handleDayClick("tuesday")}
        >
          <p className={styles.semana}>Tuesday</p>
        </button>
        <button
          className={`${styles.tab} ${styles.wednesday} ${
            activeDay === "wednesday" ? styles.corSemana : ""
          }`}
          onClick={() => handleDayClick("wednesday")}
        >
          <p className={styles.semana}>Wednesday</p>
        </button>
        <button
          className={`${styles.tab} ${styles.thursday} ${
            activeDay === "thursday" ? styles.corSemana : ""
          }`}
          onClick={() => handleDayClick("thursday")}
        >
          <p className={styles.semana}>Thursday</p>
        </button>
        <button
          className={`${styles.tab} ${styles.friday} ${
            activeDay === "friday" ? styles.corSemana : ""
          }`}
          onClick={() => handleDayClick("friday")}
        >
          <p className={styles.semana}>Friday</p>
        </button>
        <button
          className={`${styles.tab} ${styles.saturday} ${
            activeDay === "saturday" ? styles.corSemana : ""
          }`}
          onClick={() => handleDayClick("saturday")}
        >
          <p className={styles.semana}>Saturday</p>
        </button>
        <button
          className={` ${styles.tab} ${styles.sunday} ${
            activeDay === "sunday" ? styles.corSemana : ""
          }`}
          onClick={() => handleDayClick("sunday")}
        >
          <p className={styles.semana}>Sunday</p>
        </button>
      </div>

      <div className={styles.time_planner}>
        <h1>Time</h1>
      </div>

      <ul className={styles.container_task}>
      {task.map((elemento) =>
            activeDay === null || (elemento.day && elemento.day.includes(activeDay)) ? (
              <li key={elemento.id}>
              <div className={styles.tasks}>
                <div className={` ${styles.horas_task} ${styles[elemento.day]}`}>
                  <span>{elemento.time}</span>
                </div>
                <div>
                  <div className={` ${styles.marcador} ${styles[elemento.day]}`}></div>
                  <div className={` ${styles.text_task} ${styles[elemento.day]}`}>
                    <span>{elemento.task}</span>
                    <button onClick={() => handleDelete(elemento.id)}>Delete</button>
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
