import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const fetchDashboardData = async (token) => {
  try {
    const [
      bookingsResponse, 
      boatOwnersResponse, 
      sponsorsResponse, 
      blogsResponse, 
      destinationsResponse,
      usersResponse
    ] = await Promise.all([
      axios.get(`${API_BASE_URL}/booking`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${API_BASE_URL}/boatowners`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${API_BASE_URL}/sponser`),
      axios.get(`${API_BASE_URL}/api/blogs`),
      axios.get(`${API_BASE_URL}/destinations`),
      axios.get(`${API_BASE_URL}/sponser`)
    ]);

    return {
      bookings: bookingsResponse.data,
      boatOwners: boatOwnersResponse.data,
      sponsors: sponsorsResponse.data,
      blogs: blogsResponse.data,
      destinations: destinationsResponse.data,
      users: usersResponse.data,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const fetchWeatherData = async () => {
  try {
    // Uncomment when you have the actual weather API
    // const response = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=11.5915&longitude=37.3833&hourly=temperature_2m,precipitation");
    // return response.data;
    return null; // Placeholder until weather API is implemented
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};