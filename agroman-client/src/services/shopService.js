export const getNearbyShops = async (lat, lng) => {

  const res = await fetch(
    `http://localhost:5000/api/shops?lat=${lat}&lng=${lng}`
  );

  return res.json();
};