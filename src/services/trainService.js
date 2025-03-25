import axios from "axios";

const API_URL = "http://localhost:9090/api/trains"; // Ensure backend runs on this port

// Search trains based on source, destination, and date
export const searchTrains = async (source, destination, date) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { source, destination, date },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching trains:", error);
    return [];
  }
};

// Search train by train number
export const searchTrainByNumber = async (trainNumber) => {
  try {
    const response = await axios.get(`${API_URL}/number/${trainNumber}`);
    return response.data;
  } catch (error) {
    console.error("Error searching train by number:", error);
    return null;
  }
};

export default { searchTrains, searchTrainByNumber };
