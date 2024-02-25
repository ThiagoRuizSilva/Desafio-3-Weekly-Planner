import { useEffect, useState } from "react";
import { cityClima } from "../../Api";
import { dados } from "../../FirebaseConection";
import "./styles.css"

const Clima = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [citiesAndCountries, setCitiesAndCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesAndCountries = await dados(); 
        console.log("Cidades e Países:", citiesAndCountries);

        if (citiesAndCountries.length > 0) {
          const data = await cityClima(citiesAndCountries[0].city);
          setWeatherData(data);
          setCitiesAndCountries(citiesAndCountries);
        }
      } catch (error) {
        console.error("Erro ao obter cidades ou dados do clima:", error);
      }
    };

    fetchData();
  }, []);

  const renderWeather = () => {
    if (weatherData) {
      const { icon } = weatherData.weather[0];
      const temperature = Math.round(weatherData.main.temp - 273.15);
      const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

      return (
        <div >
          <p>
            {citiesAndCountries[0].city} - {citiesAndCountries[0].country}
          </p>
          <img src={iconUrl} alt="Weather Icon" />
          <h1>{temperature}°</h1>
        </div>
      );
    } else {
      return <p>Carregando...</p>;
    }
  };

  return <div className="clima__tempo">{renderWeather()}</div>;
};

export default Clima;