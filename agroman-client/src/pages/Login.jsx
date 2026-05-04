import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!phone) {
      alert("Enter phone number");
      return;
    }

    const fakeUser = {
      phone,
      name: "Farmer",
      isLoggedIn: true,
    };

    localStorage.setItem(
      "farmerUser",
      JSON.stringify(fakeUser)
    );

    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-green-700 mb-3">
          Agroman 🌾
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Smart Farming Starts Here
        </p>

        <input
          type="text"
          placeholder="+91XXXXXXXXXX"
          className="w-full border p-4 rounded-2xl mb-5"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 hover:bg-green-700 transition text-white p-4 rounded-2xl text-lg font-semibold"
        >
          Continue
        </button>

      </div>
    </div>
  );
}

export default Login;


