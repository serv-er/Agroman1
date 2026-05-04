import { useEffect, useState } from "react";

function Schemes() {

  const [schemes, setSchemes] = useState([]);

  useEffect(() => {

    const fetchSchemes = async () => {

      const crop =
        JSON.parse(localStorage.getItem("selectedCrop")) || "all";

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/schemes?crop=${crop}`
      );

      const data = await res.json();

      setSchemes(data);
    };

    fetchSchemes();

  }, []);

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Government Schemes 🏛
      </h1>

      {schemes.map((s, i) => (

        <div
          key={i}
          className="bg-white p-4 mb-4 rounded-xl shadow"
        >

          <h2 className="font-bold">
            {s.title}
          </h2>

          <p>{s.benefit}</p>

          <a
            href={s.link}
            target="_blank"
            className="text-blue-600"
          >
            Learn More →
          </a>

        </div>
      ))}

    </div>
  );
}

export default Schemes;