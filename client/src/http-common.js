import axios from "axios";

export default axios.create({
  baseURL: "https://mern-airbnb-rating.herokuapp.com/airbnb",
  headers: {
    "Content-type": "application/json"
  }
});