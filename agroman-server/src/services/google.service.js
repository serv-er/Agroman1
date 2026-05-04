import axios from "axios";

const BASE_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

export const fetchNearbyShops = async (lat, lng, apiKey) => {

  const response = await axios.get(BASE_URL, {
    params: {
      location: `${lat},${lng}`,
      radius: 5000,
      keyword: "agriculture fertilizer pesticide",
      key: apiKey,
    },
  });

  return response.data.results;
};

export const fetchPlaceDetails = async (placeId, apiKey) => {

  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/place/details/json",
    {
      params: {
        place_id: placeId,
        fields: "name,formatted_phone_number,geometry",
        key: apiKey,
      },
    }
  );

  return response.data.result;
};