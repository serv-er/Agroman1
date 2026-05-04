import { useEffect, useState }
from "react";

import {
  useParams,useNavigate
} from "react-router-dom";

import {
  generateCropGuide
} from "../services/geminiService";

function CropDetail() {

  const { cropName } =
    useParams();

  const [guide, setGuide] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

    const navigate = useNavigate();

  useEffect(() => {

    let isMounted = true;

    async function loadGuide() {

      try {

        const recommendationInput =
          JSON.parse(
            localStorage.getItem(
              "recommendationInput"
            )
          );

        const result =
          await generateCropGuide(
            cropName,
            recommendationInput
          );

        console.log(
          "Crop Guide Result:",
          result
        );

        if (isMounted) {

          setGuide(result);

          setLoading(false);
        }

      } catch (error) {

        console.log(
          "Crop Guide Error:",
          error
        );

        if (isMounted) {

          setError(
            "Failed to generate farming guide"
          );

          setLoading(false);
        }
      }
    }

    loadGuide();

    return () => {

      isMounted = false;
    };

  }, [cropName]);

  // LOADING
  if (loading) {

    return (

      <div className="bg-white p-10 rounded-3xl shadow-md">

        <div className="w-20 h-20 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <h2 className="text-3xl font-bold text-center text-green-700 mt-8">
          AI Mitra is preparing your farming roadmap 🌾
        </h2>

      </div>
    );
  }

  // ERROR
  if (error) {

    return (

      <div className="bg-white p-10 rounded-3xl shadow-md">

        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Error
        </h2>

        <p className="text-lg">
          {error}
        </p>

      </div>
    );
  }

  const startFarming = () => {

  const farmingJourney = {

    crop: cropName,

    startedAt:
      new Date().toISOString(),

    completedTasks: [],
  };

    navigate(
    "/dashboard/farming-journey"
  );

  localStorage.setItem(
    "farmingJourney",
    JSON.stringify(farmingJourney)
  );

  alert(
    "Farming journey started successfully 🌱"
  );
};

  return (

    <div>

      {/* Heading */}
      <h1 className="text-5xl font-bold text-green-700 mb-6 capitalize">
        {cropName} Farming Guide 🌱
      </h1>

      {/* Overview */}
      <div className="bg-white p-6 rounded-3xl shadow-md mb-6">

        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Crop Overview
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          {guide?.overview ||
            "No overview available"}
        </p>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Seeds */}
        <div className="bg-white p-6 rounded-3xl shadow-md">

          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Required Seeds
          </h2>

          <ul className="space-y-3">

            {Array.isArray(
              guide?.seeds
            ) ? (

              guide.seeds.map(
                (seed, index) => (

                  <li
                    key={index}
                    className="text-lg"
                  >
                    🌱 {seed}
                  </li>
                )
              )

            ) : (

              <li>
                No seed information available
              </li>
            )}

          </ul>

        </div>

        {/* Fertilizers */}
        <div className="bg-white p-6 rounded-3xl shadow-md">

          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Fertilizers
          </h2>

          <ul className="space-y-3">

            {Array.isArray(
              guide?.fertilizers
            ) ? (

              guide.fertilizers.map(
                (item, index) => (

                  <li
                    key={index}
                    className="text-lg"
                  >
                    🧪 {item}
                  </li>
                )
              )

            ) : (

              <li>
                No fertilizer data available
              </li>
            )}

          </ul>

        </div>

        {/* Irrigation */}
        <div className="bg-white p-6 rounded-3xl shadow-md">

          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Irrigation Schedule
          </h2>

          <ul className="space-y-3">

            {Array.isArray(
              guide?.irrigation
            ) ? (

              guide.irrigation.map(
                (item, index) => (

                  <li
                    key={index}
                    className="text-lg"
                  >
                    💧 {item}
                  </li>
                )
              )

            ) : (

              <li>
                No irrigation schedule available
              </li>
            )}

          </ul>

        </div>

        {/* Medicines */}
        <div className="bg-white p-6 rounded-3xl shadow-md">

          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Medicines & Pesticides
          </h2>

          <ul className="space-y-3">

            {Array.isArray(
              guide?.medicines
            ) ? (

              guide.medicines.map(
                (item, index) => (

                  <li
                    key={index}
                    className="text-lg"
                  >
                    💊 {item}
                  </li>
                )
              )

            ) : (

              <li>
                No medicine information available
              </li>
            )}

          </ul>

        </div>

      </div>

      {/* Timeline */}
      <div className="bg-white p-6 rounded-3xl shadow-md mt-6">

        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Farming Timeline 📅
        </h2>

        <div className="space-y-4">

          {Array.isArray(
            guide?.timeline
          ) ? (

            guide.timeline.map(
              (step, index) => (

                <div
                  key={index}
                  className="border-l-4 border-green-600 pl-4"
                >

                  <p className="text-lg">
                    {step}
                  </p>

                </div>
              )
            )

          ) : (

            <p>
              No timeline available
            </p>
          )}

        </div>

      </div>

      {/* Yield + Profit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        {/* Yield */}
        <div className="bg-white p-6 rounded-3xl shadow-md">

          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Expected Yield
          </h2>

          <p className="text-xl">
            🌾 {guide?.yield ||
              "No yield data"}
          </p>

        </div>

        {/* Profit */}
        <div className="bg-white p-6 rounded-3xl shadow-md">

          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Expected Profit
          </h2>

          <p className="text-xl">
            💰 {guide?.profit ||
              "No profit data"}
          </p>

        </div>

        <div className="mt-8">

  <button
    onClick={startFarming}
    className="bg-green-700 hover:bg-green-800 transition text-white px-8 py-4 rounded-2xl text-lg font-semibold"
  >
    Start Farming Journey 🌾
  </button>

</div>

      </div>

      {/* Risks */}
      <div className="bg-white p-6 rounded-3xl shadow-md mt-6">

        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Common Risks ⚠
        </h2>

        <ul className="space-y-3">

          {Array.isArray(
            guide?.risks
          ) ? (

            guide.risks.map(
              (risk, index) => (

                <li
                  key={index}
                  className="text-lg"
                >
                  ⚠ {risk}
                </li>
              )
            )

          ) : (

            <li>
              No risk data available
            </li>
          )}

        </ul>

      </div>

    </div>
  );
}

export default CropDetail;