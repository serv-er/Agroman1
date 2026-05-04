import { useEffect, useState } from "react";

function News() {

  const [news, setNews] = useState([]);

  useEffect(() => {

    const fetchNews = async () => {

      const crop =
        JSON.parse(localStorage.getItem("selectedCrop")) || "farming";

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/news?crop=${crop}`
      );

      const data = await res.json();

      setNews(data);
    };

    fetchNews();

  }, []);

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Farming News 📰
      </h1>

      {news.map((item, i) => (

        <a
          key={i}
          href={item.url}
          target="_blank"
          className="block bg-white p-4 mb-4 rounded-xl shadow"
        >

          <h2 className="font-bold">
            {item.title}
          </h2>

          <p>{item.description}</p>

        </a>
      ))}

    </div>
  );
}

export default News;