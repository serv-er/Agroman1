export const getUserLocation = () => {
  return new Promise((resolve, reject) => {

    if (!navigator.geolocation) {
      reject("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {

        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

      },
      (error) => {

        let message = "Location error";

        if (error.code === 1) {
          message = "Permission denied";
        } else if (error.code === 2) {
          message = "Location unavailable";
        } else if (error.code === 3) {
          message = "Request timeout";
        }

        reject(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );

  });
};