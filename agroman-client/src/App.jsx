import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";

import DashboardLayout from "./layouts/DashboardLayout";

import DashboardHome from "./pages/DashboardHome";
import CropRecommendation from "./pages/CropRecommendation";
import AIChat from "./pages/AIChat";
import News from "./pages/News";
import Marketplace from "./pages/Marketplace";
import Schemes from "./pages/Schemes";
import CropDetail
from "./pages/CropDetail";
import DiseaseDetection from "./pages/DiseaseDetection";
import FarmingJourney
from "./pages/FarmingJourney";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/onboarding"
          element={<Onboarding />}
        />

        {/* Dashboard Layout */}

        <Route
          path="/dashboard"
          element={<DashboardLayout />}
        >

          <Route
            index
            element={<DashboardHome />}
          />

          <Route
            path="recommendation"
            element={<CropRecommendation />}
          />

          <Route
  path="crop/:cropName"
  element={<CropDetail />}
/>

          <Route
            path="ai-chat"
            element={<AIChat />}
          />

          <Route
  path="disease-detection"
  element={<DiseaseDetection />}
/>

          <Route
            path="marketplace"
            element={<Marketplace />}
          />

          <Route
            path="news"
            element={<News />}
          />

          <Route
            path="schemes"
            element={<Schemes />}
          />
          <Route
  path="farming-journey"
  element={<FarmingJourney />}
/>

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;