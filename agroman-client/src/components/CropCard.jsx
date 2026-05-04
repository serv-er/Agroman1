function CropCard({ crop, profit, season }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md">

      <h2 className="text-2xl font-bold text-green-700 mb-4">
        {crop}
      </h2>

      <div className="space-y-2 text-lg">
        <p>Expected Profit: ₹{profit}</p>
        <p>Season: {season}</p>
      </div>

      <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-2xl">
        View Details
      </button>
    </div>
  );
}

export default CropCard;