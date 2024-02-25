/*https://api.openweathermap.org/data/2.5/weather?q={cityname}&appid={APIkey} */
/* 6793186352a0010d32b351353dc8ba84 */

import axios from "axios";

const apiKey = "6793186352a0010d32b351353dc8ba84";


export const cityClima = async (city) => {
  try {
    const response = await axios.get(
     ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados do clima:", error);
    return null;
  }
};
