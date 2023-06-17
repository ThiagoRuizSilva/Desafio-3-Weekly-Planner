/*https://api.openweathermap.org/data/2.5/weather?q={cityname}&appid={APIkey} */
/* 6793186352a0010d32b351353dc8ba84 */
import axios from "axios";

const key = "6793186352a0010d32b351353dc8ba84";

function cityClima() {
  try {
    const link = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    );
  } catch (erro) {
    
  }
}

export default cityClima;
