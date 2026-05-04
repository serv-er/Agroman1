import { useState } from "react";

function SoilAnalysis() {

  const [soilData, setSoilData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [sensorValues, setSensorValues] =
    useState({
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      moisture: 0,
      ph: 0,
    });

  const generateSoilData = () => {

    setLoading(true);

    // Fake live sensor animation
    const sensorInterval = setInterval(() => {

      setSensorValues({
        nitrogen: Math.floor(
          Math.random() * 100
        ),

        phosphorus: Math.floor(
          Math.random() * 100
        ),

        potassium: Math.floor(
          Math.random() * 100
        ),

        moisture: Math.floor(
          Math.random() * 100
        ),

        ph: (
          Math.random() * 3 + 5
        ).toFixed(1),
      });

    }, 400);

    setTimeout(() => {

      clearInterval(sensorInterval);

      const fakeSensorData = {
        soilType: ["Clay", "Loamy", "Sandy"][
          Math.floor(Math.random() * 3)
        ],

        ph: (
          Math.random() * 3 + 5
        ).toFixed(1),

        nitrogen: Math.floor(
          Math.random() * 100
        ),

        phosphorus: Math.floor(
          Math.random() * 100
        ),

        potassium: Math.floor(
          Math.random() * 100
        ),

        moisture: Math.floor(
          Math.random() * 100
        ),
      };

      setSoilData(fakeSensorData);

      localStorage.setItem(
        "soilData",
        JSON.stringify(fakeSensorData)
      );

      setLoading(false);

    }, 3000);
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-lg">

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          Smart Soil Scanner 🌱
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Analyze your soil automatically using
          smart sensor simulation.
        </p>

        {/* Scan Button */}
        <button
          onClick={generateSoilData}
          className="w-full bg-green-600 text-white p-5 rounded-2xl text-xl font-bold hover:bg-green-700 transition"
        >
          {loading
            ? "Analyzing Soil..."
            : "Scan Soil"}
        </button>

        {/* Loading */}
        {loading && (
          <div className="mt-8">

            {/* Sensor Box */}
            <div className="bg-black text-green-400 rounded-3xl p-6 shadow-2xl border-4 border-green-500">

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold">
                  SoilSense™ Live Sensor
                </h2>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

                  <span className="text-sm">
                    ACTIVE
                  </span>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-green-900/30 p-4 rounded-2xl">
                  <p className="text-sm text-green-300">
                    Nitrogen
                  </p>

                  <h3 className="text-3xl font-bold mt-2">
                    {sensorValues.nitrogen}
                  </h3>
                </div>

                <div className="bg-green-900/30 p-4 rounded-2xl">
                  <p className="text-sm text-green-300">
                    Phosphorus
                  </p>

                  <h3 className="text-3xl font-bold mt-2">
                    {sensorValues.phosphorus}
                  </h3>
                </div>

                <div className="bg-green-900/30 p-4 rounded-2xl">
                  <p className="text-sm text-green-300">
                    Potassium
                  </p>

                  <h3 className="text-3xl font-bold mt-2">
                    {sensorValues.potassium}
                  </h3>
                </div>

                <div className="bg-green-900/30 p-4 rounded-2xl">
                  <p className="text-sm text-green-300">
                    Moisture
                  </p>

                  <h3 className="text-3xl font-bold mt-2">
                    {sensorValues.moisture}%
                  </h3>
                </div>

                <div className="bg-green-900/30 p-4 rounded-2xl col-span-2">
                  <p className="text-sm text-green-300">
                    Soil pH Level
                  </p>

                  <h3 className="text-4xl font-bold mt-2">
                    {sensorValues.ph}
                  </h3>
                </div>

              </div>

              <p className="mt-6 text-center text-lg font-semibold text-green-300">
                Sensor collecting soil nutrients...
              </p>

            </div>

          </div>
        )}

        {/* Soil Results */}
        {soilData && !loading && (

          <div className="mt-10 bg-green-50 p-8 rounded-3xl">

            <h2 className="text-3xl font-bold text-green-700 mb-8">
              Soil Analysis Report
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-white p-5 rounded-2xl shadow">
                <h3 className="text-lg font-semibold">
                  Soil Type
                </h3>

                <p className="text-2xl font-bold text-green-700 mt-2">
                  {soilData.soilType}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow">
                <h3 className="text-lg font-semibold">
                  pH Level
                </h3>

                <p className="text-2xl font-bold text-green-700 mt-2">
                  {soilData.ph}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow">
                <h3 className="text-lg font-semibold">
                  Nitrogen
                </h3>

                <p className="text-2xl font-bold text-green-700 mt-2">
                  {soilData.nitrogen}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow">
                <h3 className="text-lg font-semibold">
                  Phosphorus
                </h3>

                <p className="text-2xl font-bold text-green-700 mt-2">
                  {soilData.phosphorus}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow">
                <h3 className="text-lg font-semibold">
                  Potassium
                </h3>

                <p className="text-2xl font-bold text-green-700 mt-2">
                  {soilData.potassium}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow">
                <h3 className="text-lg font-semibold">
                  Moisture
                </h3>

                <p className="text-2xl font-bold text-green-700 mt-2">
                  {soilData.moisture}%
                </p>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SoilAnalysis;