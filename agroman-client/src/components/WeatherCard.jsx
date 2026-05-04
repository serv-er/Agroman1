import { useEffect, useState } from "react";
import { getWeatherByCoords } from "../services/weatherService";

function WeatherCard() {

  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(true);

  const [locationError, setLocationError] =
    useState("");

  const [weatherError, setWeatherError] =
    useState("");

  useEffect(() => {

    let isMounted = true;

    const getLocationAndWeather = async () => {

      // Browser support check
      if (!navigator.geolocation) {

        if (isMounted) {
          setLocationError(
            "Geolocation is not supported by your browser"
          );

          setLoading(false);
        }

        return;
      }

      navigator.geolocation.getCurrentPosition(

        // Success callback
        async (position) => {

          try {

            const latitude =
              position.coords.latitude;

            const longitude =
              position.coords.longitude;

            // Safe localStorage handling
            let farmerProfile = {};

            try {

              farmerProfile = JSON.parse(
                localStorage.getItem("farmerProfile")
              ) || {};

            } catch {
              farmerProfile = {};
            }

            // Save live coordinates
            farmerProfile.latitude = latitude;
            farmerProfile.longitude = longitude;

            localStorage.setItem(
              "farmerProfile",
              JSON.stringify(farmerProfile)
            );

            // Fetch weather using coordinates
            const data =
              await getWeatherByCoords(
                latitude,
                longitude
              );

            if (isMounted) {
              setWeather(data);
            }

          } catch (error) {

            console.log(error);

            if (isMounted) {
              setWeatherError(
                "Failed to fetch weather data"
              );
            }

          } finally {

            if (isMounted) {
              setLoading(false);
            }
          }
        },

        // Error callback
        (error) => {

          console.log(error);

          let message =
            "Unable to fetch location";

          switch (error.code) {

            case error.PERMISSION_DENIED:
              message =
                "Location permission denied";
              break;

            case error.POSITION_UNAVAILABLE:
              message =
                "Location information unavailable";
              break;

            case error.TIMEOUT:
              message =
                "Location request timed out";
              break;

            default:
              message =
                "An unknown location error occurred";
          }

          if (isMounted) {
            setLocationError(message);
            setLoading(false);
          }
        },

        // Options
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    };

    getLocationAndWeather();

    // Cleanup
    return () => {
      isMounted = false;
    };

  }, []);

  // Loading UI
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-md animate-pulse">
        <p className="text-xl text-gray-500">
          Fetching live weather...
        </p>
      </div>
    );
  }

  // Location Error UI
  if (locationError) {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-md border border-red-200">
        <p className="text-red-500 text-lg font-medium">
          {locationError}
        </p>
      </div>
    );
  }

  // Weather Error UI
  if (weatherError) {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-md border border-red-200">
        <p className="text-red-500 text-lg font-medium">
          {weatherError}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md">

      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Live Farm Weather 🌦
      </h2>

      <div className="space-y-4 text-lg">

        <p>
          📍
          {" "}
          {weather?.name ?? "Unknown"}
        </p>

        <p>
          🌡 Temperature:
          {" "}
          {weather?.main?.temp ?? "--"}°C
        </p>

        <p>
          💧 Humidity:
          {" "}
          {weather?.main?.humidity ?? "--"}%
        </p>

        <p>
          🌬 Wind Speed:
          {" "}
          {
            weather?.wind?.speed
              ? (weather.wind.speed * 3.6).toFixed(1)
              : "--"
          }
          {" "}
          km/h
        </p>

        <p>
          ☁ Condition:
          {" "}
          {weather?.weather?.[0]?.main ?? "--"}
        </p>

      </div>

    </div>
  );
}

export default WeatherCard;