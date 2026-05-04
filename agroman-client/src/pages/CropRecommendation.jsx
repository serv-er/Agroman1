import { useEffect, useState } from "react";
import { useNavigate }
from "react-router-dom";
import { getWeatherByCoords }
from "../services/weatherService";

import { generateCropRecommendation }
from "../services/geminiService";

function CropRecommendation() {

  const [loading, setLoading] =
    useState(false);

  const [weather, setWeather] =
    useState(null);

  const [soilData, setSoilData] =
    useState(null);

  const [location, setLocation] =
    useState(null);

  const [aiLoading, setAiLoading] =
    useState(false);

  const [recommendations,
    setRecommendations] =
    useState([]);

    const navigate = useNavigate();
  const [formData, setFormData] =
    useState({
      landSize: "",
      irrigation: "",
      budget: "",
    });

  // LOCATION FUNCTION
  async function getLocation() {

    if (!navigator.geolocation) {

      console.log(
        "Geolocation not supported"
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        try {

          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;

          setLocation({
            latitude,
            longitude,
          });

          const weatherData =
            await getWeatherByCoords(
              latitude,
              longitude
            );

          setWeather(weatherData);

        } catch (error) {

          console.log(error);
        }
      },

      (error) => {

        console.log(error);
      }
    );
  }

  // LOCATION + WEATHER
  useEffect(() => {

    getLocation();

  }, []);

  // SOIL SCAN
  const scanSoil = () => {

    setLoading(true);

    setTimeout(() => {

      const fakeSensorData = {

        soilType: [
          "Clay",
          "Loamy",
          "Sandy",
        ][Math.floor(Math.random() * 3)],

        ph:
          (
            Math.random() * 3 + 5
          ).toFixed(1),

        nitrogen:
          Math.floor(Math.random() * 100),

        phosphorus:
          Math.floor(Math.random() * 100),

        potassium:
          Math.floor(Math.random() * 100),

        moisture:
          Math.floor(Math.random() * 100),
      };

      setSoilData(fakeSensorData);

      setLoading(false);

    }, 3000);
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // GEMINI RECOMMENDATION
  const handleRecommendation =
    async () => {

      try {

        if (!soilData) {

          alert(
            "Please scan soil first"
          );

          return;
        }

        setAiLoading(true);

        const recommendationInput = {

          location,
          weather,
          soilData,
          formData,
        };

        const result =
          await generateCropRecommendation(
            recommendationInput
          );

        setRecommendations(result);

      } catch (error) {

        console.log(error);

        alert(
          "Failed to generate recommendation"
        );

      } finally {

        setAiLoading(false);
      }
    };

  return (

    <div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-green-700 mb-3">
        Crop Recommendation 🌱
      </h1>

      <p className="text-gray-500 mb-8">
        Analyze your farm and get
        AI-powered crop suggestions
      </p>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* LEFT SECTION */}
        <div className="bg-white p-8 rounded-3xl shadow-md">

          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Farm Details
          </h2>

          <div className="space-y-5">

            {/* Land Size */}
            <input
              type="number"
              name="landSize"
              placeholder="Land Size (Acres)"
              value={formData.landSize}
              onChange={handleChange}
              className="w-full border p-4 rounded-2xl"
            />

            {/* Irrigation */}
            <select
              name="irrigation"
              value={formData.irrigation}
              onChange={handleChange}
              className="w-full border p-4 rounded-2xl"
            >
              <option value="">
                Irrigation Available?
              </option>

              <option value="yes">
                Yes
              </option>

              <option value="no">
                No
              </option>

            </select>

            {/* Budget */}
            <input
              type="number"
              name="budget"
              placeholder="Budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full border p-4 rounded-2xl"
            />

          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">

          {/* WEATHER */}
          <div className="bg-white p-6 rounded-3xl shadow-md">

            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Live Weather ☁
            </h2>

            {weather ? (

              <div className="space-y-2 text-lg">

                <p>
                  📍 {weather?.name}
                </p>

                <p>
                  🌡 Temperature:
                  {" "}
                  {weather?.main?.temp}°C
                </p>

                <p>
                  💧 Humidity:
                  {" "}
                  {weather?.main?.humidity}%
                </p>

                <p>
                  🌬 Wind:
                  {" "}
                  {weather?.wind?.speed} km/h
                </p>

                <p>
                  ☁ Condition:
                  {" "}
                  {
                    weather?.weather?.[0]?.main
                  }
                </p>

              </div>

            ) : (

              <p>
                Fetching weather...
              </p>
            )}

          </div>

          {/* SOIL ANALYSIS */}
          <div className="bg-white p-6 rounded-3xl shadow-md">

            <h2 className="text-2xl font-bold text-green-700 mb-5">
              Smart Soil Analysis 🌱
            </h2>

            <button
              onClick={scanSoil}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-2xl disabled:opacity-50"
            >
              {
                loading
                  ? "Analyzing Soil..."
                  : "Scan Soil"
              }
            </button>

            {/* Loading */}
            {loading && (

              <div className="mt-6">

                <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

                <p className="text-center mt-4 text-green-700 font-semibold">
                  Sensor collecting nutrients...
                </p>

              </div>
            )}

            {/* Soil Results */}
            {soilData && !loading && (

              <div className="mt-6 space-y-3 text-lg">

                <p>
                  🌱 Soil:
                  {" "}
                  {soilData.soilType}
                </p>

                <p>
                  ⚗ pH:
                  {" "}
                  {soilData.ph}
                </p>

                <p>
                  🧪 Nitrogen:
                  {" "}
                  {soilData.nitrogen}
                </p>

                <p>
                  🧪 Phosphorus:
                  {" "}
                  {soilData.phosphorus}
                </p>

                <p>
                  🧪 Potassium:
                  {" "}
                  {soilData.potassium}
                </p>

                <p>
                  💧 Moisture:
                  {" "}
                  {soilData.moisture}%
                </p>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* AI Loading */}
      {aiLoading && (

        <div className="mt-10 bg-white p-8 rounded-3xl shadow-md">

          <div className="w-20 h-20 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h2 className="text-3xl font-bold text-center text-green-700 mt-8">
            AI Mitra is choosing the perfect crops 🌾
          </h2>

          <div className="mt-8 space-y-4 text-lg text-gray-600">

            <p>
              ✅ Checking weather conditions...
            </p>

            <p>
              ✅ Analyzing soil nutrients...
            </p>

            <p>
              ✅ Calculating crop profitability...
            </p>

            <p>
              ✅ Comparing seasonal suitability...
            </p>

          </div>

        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleRecommendation}
        disabled={aiLoading}
        className="mt-8 bg-green-700 hover:bg-green-800 transition text-white px-8 py-4 rounded-2xl text-lg font-semibold disabled:opacity-50"
      >
        {
          aiLoading
            ? "Generating..."
            : "Generate Recommendations"
        }
      </button>

      {/* Recommendation Results */}
      {recommendations.length > 0 && (

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {recommendations.map(
            (item, index) => (

              <div
                key={index}
                className="bg-white p-6 rounded-3xl shadow-md"
              >

                <h2 className="text-3xl font-bold text-green-700 mb-4">
                  {item.crop}
                </h2>

                <p className="text-gray-600 mb-4">
                  {item.reason}
                </p>

                <p className="text-lg font-semibold mb-2">
                  💰 Profit:
                  {" "}
                  {item.profit}
                </p>

                <p className="text-lg font-semibold">
                  ⚠ Risk:
                  {" "}
                  {item.risk}
                </p>

                <button
  onClick={() =>
    navigate(
      `/dashboard/crop/${item.crop.toLowerCase()}`
    )
  }
  className="mt-6 bg-green-600 text-white px-5 py-3 rounded-2xl"
>
  View Full Guide
</button>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default CropRecommendation;