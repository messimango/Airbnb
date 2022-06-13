import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/airbnb",
  headers: {
    "Content-type": "application/json"
  }
});