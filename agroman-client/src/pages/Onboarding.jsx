import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { languages } from "../data/languages";

function Onboarding() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    language: "",
    name: "",
    village: "",
    district: "",
    state: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {

    localStorage.setItem(
      "farmerProfile",
      JSON.stringify(formData)
    );

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-8">

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">

          <div
            className="bg-green-600 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${(step / 2) * 100}%`,
            }}
          ></div>

        </div>

        {/* STEP 1 */}
        {step === 1 && (

          <div>

            <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
              Choose Language
            </h1>

            <div className="grid grid-cols-2 gap-4">

              {languages.map((lang) => (

                <button
                  key={lang.id}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      language: lang.name,
                    })
                  }
                  className={`p-6 rounded-2xl border-2 text-xl font-semibold transition ${
                    formData.language === lang.name
                      ? "bg-green-600 text-white border-green-600"
                      : "border-gray-300"
                  }`}
                >
                  {lang.name}
                </button>

              ))}

            </div>

            <button
              onClick={nextStep}
              className="w-full mt-8 bg-green-600 text-white p-4 rounded-2xl text-lg"
            >
              Continue
            </button>

          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (

          <div>

            <h1 className="text-4xl font-bold text-green-700 mb-8">
              Farmer Details
            </h1>

            <div className="space-y-4">

              <input
                type="text"
                name="name"
                placeholder="Farmer Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-4 rounded-2xl"
              />

              <input
                type="text"
                name="village"
                placeholder="Village"
                value={formData.village}
                onChange={handleChange}
                className="w-full border p-4 rounded-2xl"
              />

              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
                className="w-full border p-4 rounded-2xl"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-full border p-4 rounded-2xl"
              />

            </div>

            <div className="flex gap-4 mt-8">

              <button
                onClick={prevStep}
                className="w-full bg-gray-300 p-4 rounded-2xl"
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                className="w-full bg-green-600 text-white p-4 rounded-2xl"
              >
                Finish
              </button>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Onboarding;