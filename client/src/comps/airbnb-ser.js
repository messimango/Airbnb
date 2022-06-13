import http from "../http-common";

class AirbnbDataSer {

    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
      } 
    
    getAll(id) {
        return http.get(`/id/${(id)}`);
    }

    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    createReview(data) {
        return http.post("/review", data);
    }

    updateReview(data) {
        return http.put("/review", data);
    }
    
    deleteReview(id, userId) {
        return http.delete(`/review?id=${id}`);
    }
    
    getProperty(id) {
        return http.get(`/property_type`);
    }

    getCountry(id) {
        return http.get(`/country`);
    }
}

export default new AirbnbDataSer();