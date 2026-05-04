import { useEffect, useState }
from "react";

import {
  generateFarmingJourney
} from "../services/geminiService";

function FarmingJourney() {

  const [journey, setJourney] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    generateJourney();

  }, []);

  const generateJourney =
    async () => {

      try {

        const recommendationInput =
          JSON.parse(
            localStorage.getItem(
              "recommendationInput"
            )
          );

        const farmingData =
          JSON.parse(
            localStorage.getItem(
              "farmingJourney"
            )
          );

        const result =
          await generateFarmingJourney(
            farmingData.crop,
            recommendationInput
          );

        setJourney(result);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  if (loading) {

    return (

      <div className="bg-white p-10 rounded-3xl shadow-md">

        <div className="w-20 h-20 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <h2 className="text-3xl font-bold text-center text-green-700 mt-8">
          AI Mitra is creating your farming execution plan 🌾
        </h2>

      </div>
    );
  }

  return (

    <div>

      <h1 className="text-5xl font-bold text-green-700 mb-3">
        AI Farming Journey 🌾
      </h1>

      <p className="text-gray-500 mb-10">
        Weekly execution roadmap for your crop
      </p>

      <div className="space-y-8">

        {journey.map(
          (weekData, index) => (

            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-md"
            >

              {/* Header */}
              <div className="flex justify-between items-center mb-6">

                <div>

                  <p className="text-green-700 font-bold text-xl">
                    {weekData.week}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {weekData.title}
                  </h2>

                </div>

                <div className="bg-green-100 px-5 py-3 rounded-2xl">

                  <p className="font-bold text-green-700">
                    {weekData.estimatedCost}
                  </p>

                </div>

              </div>

              {/* Tasks */}
              <div className="mb-6">

                <h3 className="text-2xl font-bold text-green-700 mb-4">
                  Tasks
                </h3>

                <div className="space-y-3">

                  {Array.isArray(
                    weekData.tasks
                  ) &&
                    weekData.tasks.map(
                      (task, i) => (

                        <div
                          key={i}
                          className="bg-green-50 p-4 rounded-2xl"
                        >

                          ✅ {task}

                        </div>
                      )
                    )}

                </div>

              </div>

              {/* Resources */}
              <div>

                <h3 className="text-2xl font-bold text-green-700 mb-4">
                  Required Resources
                </h3>

                <div className="flex flex-wrap gap-3">

                  {Array.isArray(
                    weekData.resources
                  ) &&
                    weekData.resources.map(
                      (resource, i) => (

                        <div
                          key={i}
                          className="bg-yellow-100 px-4 py-3 rounded-2xl"
                        >

                          🌾 {resource}

                        </div>
                      )
                    )}

                </div>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default FarmingJourney;