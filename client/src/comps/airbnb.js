import React, {useState, useEffect, } from 'react';
import airbnbSer from "./airbnb-ser";
import { Link, useParams } from "react-router-dom";

const Airbnb = props => { 
  const { id } = useParams();

  const initialAirbnbState = {
    id: null,
    name: "",
    price: "",
    address: {street: ""},
    images: {picture_url: ""},
    accommodates: "",
    beds: "",
    bathrooms: "",
    summary: "",
    property_type: "",
    listing_url: "",
    review_scores: {review_scores_rating: "No Ratings",review_scores_accuracy:"n/a", review_scores_checkin:"n/a", review_scores_cleanliness: "n/a", review_scores_commucation:"n/a",review_scores_location:"n/a",review_scores_value:"0"},
    reviews: []
  };

  const [airbnb, setAirbnb] = useState(initialAirbnbState);

  const getAirbnb = () => {
    airbnbSer.get(id)
      .then(response => {
        setAirbnb(response.data);
        console.log(response.data);
        
    })
      .catch(e => {
        console.log(e);
    });
  };

  useEffect(() => {
    getAirbnb(id);
  }, [id]);

  const deleteReview = (reviewId, index) => {
    airbnbSer.deleteReview(reviewId, props.user.id)
      .then(response => {
        setAirbnb((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className='airbnb-main'>
      <div className='airbnb-info'>
        <h1>{airbnb.name}</h1>
        <p>{airbnb.address.street}</p>
        <img src={airbnb.images.picture_url} />
        <h6>Property Type: {airbnb.property_type}</h6>
        <h6>Price: {Object.values(airbnb.price)}</h6>
        <div className="facilities">
          <button><i className="fa-solid fa-person"></i>{airbnb.accommodates}</button>
          <button><i className="fa-solid fa-bed"></i>{airbnb.beds}</button>
          <button><i className="fa-solid fa-toilet"></i>{Object.values(airbnb.bathrooms)}</button>
        </div>
        <p>{airbnb.summary}</p>
        <a href={airbnb.listing_url} target="_blank" ><button className="btn btn-success col-lg-25">Book Now</button></a>
      </div>

      <div className='airbnb-rating'>
        <div className='ratings'>
          <h1>Ratings</h1>
          <h4>Total Rating</h4>
          <h5><button className='rating-total-btn'><strong>{airbnb.review_scores.review_scores_rating}</strong></button>
          <br></br>
           from {airbnb.review_scores.review_scores_value} ratings</h5>
          <h4>Rating Breakdown:</h4>
          <div className='normal-rating' >
            <div>
              <h6>Accuracy</h6>
              <button>{airbnb.review_scores.review_scores_accuracy}</button>
            </div>
            <div>
              <h6>Check-In</h6>
              <button>{airbnb.review_scores.review_scores_accuracy}</button>
            </div>
            <div>
              <h6>Cleanliness</h6>
              <button>{airbnb.review_scores.review_scores_accuracy}</button>
            </div>
            <div>
              <h6>Commucation</h6>
              <button>{airbnb.review_scores.review_scores_accuracy}</button>
            </div>
            <div>
              <h6>Location</h6>
              <button>{airbnb.review_scores.review_scores_accuracy}</button>
            </div>
          </div>
        </div>

        <div>
          <h1>Reviews</h1>
          <Link to={"/airbnb/" + id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
            <div className="row">
              {airbnb.reviews.length > 0 ? (
              airbnb.reviews.map((review, index) => {
                return (
                  <div className="col-lg-4 pb-1" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text}<br/>
                          <strong>User: </strong>{review.name}<br/>
                          <strong>Date: </strong>{review.date}
                        </p>                        
                            <div className="row">
                              <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                              <Link to={{
                                pathname: "/airbnb/" + id + "/review",
                                state: {
                                  currentReview: review
                                }
                              }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                            </div> 
                      </div>
                    </div>
                  </div>
                );
              })
              ) : (
              <div className="col-sm-15">
                <p>No reviews yet.</p>
              </div>
              )}

            </div>
        </div>

      </div>
      
    </div>
  );

};
export default Airbnb;