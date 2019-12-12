class GeolocationService {
  API_URL = "https://nominatim.openstreetmap.org/";
  format = "jsonv2";
  zoom = 18;

  constructor(config) {}

  async fetchInfo(location) {
    const { latitude, longitude } = location;
    const { API_URL, format, zoom } = this;

    const url = `${API_URL}reverse?format=${format}&lat=${latitude}&lon=${longitude}&zoom=${zoom}&addressdetails=1`;

    const rawResponse = await fetch(url, {
      headers: {
        "User-Agent": "Web/2.0"
      }
    });
    return await rawResponse.json();
  }

  async fetchNameInfo(location) {
    const { latitude, longitude } = location;
    const { API_URL, format, zoom } = this;

    const url = `${API_URL}reverse?format=${format}&lat=${latitude}&lon=${longitude}&zoom=${zoom}&addressdetails=1`;
    const rawResponse = await fetch(url, {
      headers: {
        "User-Agent": "Web/2.0"
      }
    });
    const response = await rawResponse.json();

    console.log(response.address);

    if (typeof response.address.city !== "undefined") {
      return response.address.city;
    } else if (typeof response.address.village !== "undefined") {
      return response.address.village;
    } else {
      return "";
    }
  }
}

export default new GeolocationService();
