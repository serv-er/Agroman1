import { useState } from "react";
import { detectCropDisease } from "../services/geminiService";
import { getUserLocation } from "../services/locationService";
import { getNearbyShops } from "../services/shopService";
import { getDistance } from "../utils/distance";

function DiseaseDetection() {

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [shops, setShops] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loadingShops, setLoadingShops] = useState(false);

  // IMAGE HANDLER
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // DISEASE DETECTION
  const handleDetect = async () => {
    if (!image) {
      alert("Please upload image");
      return;
    }

    try {
      setLoading(true);

      const response =
        await detectCropDisease(image);

      setResult(response);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // FETCH SHOPS
  const fetchShops = async () => {
    try {

      setLoadingShops(true);

      const location =
        await getUserLocation();

      setUserLocation(location);

      const results =
        await getNearbyShops(
          location.lat,
          location.lng
        );

      setShops(results);

    } catch (error) {
      console.log(error);
    } finally {
      setLoadingShops(false);
    }
  };

  return (

    <div className="max-w-5xl mx-auto">

      <h1 className="text-4xl font-bold text-green-700 mb-6">
        Crop Disease Detection 🌿
      </h1>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded-3xl shadow-md mb-6">

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mt-4 rounded-2xl w-full max-h-[300px] object-cover"
          />
        )}

        <button
          onClick={handleDetect}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-2xl"
        >
          Detect Disease
        </button>

      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-green-700 text-xl">
          AI Mitra analyzing crop image...
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div className="bg-white p-6 rounded-3xl shadow-md space-y-4">

          <h2 className="text-3xl font-bold text-red-600">
            {result.disease}
          </h2>

          <p><strong>Cause:</strong> {result.cause}</p>
          <p><strong>Treatment:</strong> {result.treatment}</p>
          <p><strong>Prevention:</strong> {result.prevention}</p>

          <div>
            <strong>Medicines:</strong>
            <ul className="mt-2 space-y-2">
              {result.medicines?.map((m, i) => (
                <li key={i}>💊 {m}</li>
              ))}
            </ul>
          </div>

          {/* Find Shops Button */}
          <button
            onClick={fetchShops}
            className="bg-green-700 text-white px-6 py-3 rounded-2xl mt-4"
          >
            Find Nearby Shops 🛒
          </button>

        </div>
      )}

      {/* Shops Loading */}
      {loadingShops && (
        <p className="mt-4 text-green-700">
          Finding nearby shops...
        </p>
      )}

      {/* Shops List */}
      {shops.length > 0 && (

        <div className="mt-6 space-y-4">

          <h2 className="text-2xl font-bold text-green-700">
            Nearby Shops
          </h2>

          {shops.map((shop, index) => {

            const distance =
              userLocation
                ? getDistance(
                    userLocation.lat,
                    userLocation.lng,
                    shop.lat,
                    shop.lng
                  )
                : null;

            return (

              <div
                key={index}
                className="bg-white p-5 rounded-2xl shadow-md"
              >

                <h3 className="text-xl font-bold">
                  {shop.name}
                </h3>

                <p className="text-gray-600">
                  {shop.address}
                </p>

                <p className="text-yellow-600">
                  ⭐ {shop.rating || "No rating"}
                </p>

                {/* DISTANCE */}
                {distance && (
                  <p className="text-green-700 font-semibold">
                    📍 {distance} km away
                  </p>
                )}

                {/* CALL BUTTON */}
                {shop.phone ? (
                  <a
                    href={`tel:${shop.phone}`}
                    className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded-xl"
                  >
                    Call 📞
                  </a>
                ) : (
                  <p className="text-gray-400 mt-2">
                    Phone not available
                  </p>
                )}

                {/* NAVIGATION */}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 ml-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
                >
                  Navigate 🧭
                </a>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default DiseaseDetection;