import WeatherCard from "../components/WeatherCard";

function DashboardHome() {

  const farmer = JSON.parse(
    localStorage.getItem("farmerProfile")
  );

  return (
    <div>

      <h1 className="text-4xl font-bold text-green-700 mb-2">
        Welcome, {farmer?.name} 🌾
      </h1>

      <p className="text-gray-500 mb-8">
        Smart farming insights for your land
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <WeatherCard />

        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Soil Status
          </h2>

          <p className="text-lg">
            Soil analysis available
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            AI Assistant
          </h2>

          <p className="text-lg">
            Ask farming questions in Hindi
          </p>
        </div>

      </div>
    </div>
  );
}

export default DashboardHome;