import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import WeatherCard from "../components/WeatherCard";
import CropCard from "../components/CropCard";
import FeatureCard from "../components/FeatureCard";

function Dashboard() {
  return (
    <div className="flex bg-green-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">

        {/* Topbar */}
        <Topbar />

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

          <WeatherCard />

          <CropCard
            crop="Rice"
            profit="45,000"
            season="Kharif"
          />

          <CropCard
            crop="Wheat"
            profit="30,000"
            season="Rabi"
          />

          <FeatureCard
            title="AI Farming Assistant 🤖"
            description="Ask farming questions using voice or text."
          />

          <FeatureCard
            title="Marketplace 🛒"
            description="Buy seeds, fertilizers and sell crops."
          />

          <FeatureCard
            title="Government Schemes 📄"
            description="Explore subsidies and farming support."
          />

        </div>
      </div>
    </div>
  );
}

export default Dashboard;