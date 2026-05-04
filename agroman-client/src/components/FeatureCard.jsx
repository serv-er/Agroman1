function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md">

      <h2 className="text-2xl font-bold text-green-700 mb-3">
        {title}
      </h2>

      <p className="text-gray-600">
        {description}
      </p>

      <button className="mt-6 bg-green-600 text-white px-5 py-3 rounded-2xl">
        Open
      </button>
    </div>
  );
}

export default FeatureCard;