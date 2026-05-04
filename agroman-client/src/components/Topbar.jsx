function Topbar() {
  const farmer = JSON.parse(
    localStorage.getItem("farmerProfile")
  );

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 flex justify-between items-center">

      <div>
        <h1 className="text-3xl font-bold text-green-700">
          Welcome, {farmer?.name} 👋
        </h1>

        <p className="text-gray-500 mt-1">
          Let's grow smarter today 🌱
        </p>
      </div>

      <div className="bg-green-100 text-green-700 px-6 py-3 rounded-2xl font-semibold">
        {farmer?.state}
      </div>
    </div>
  );
}

export default Topbar;