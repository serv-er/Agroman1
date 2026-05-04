export const getNearbyShops = async (lat, lng) => {

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/shops?lat=${lat}&lng=${lng}`
    
  );

  return res.json();
};