import React, {useState, useEffect, } from 'react';
import airbnbSer from "./airbnb-ser";
import { Link, useParams } from "react-router-dom";

const Airbnb = props => {
    const initialAirbnbState = {
      id: null,
      name: "",
      streetname: "",
      property: "",
      property: "",
      reviews: []
    };
    const [airbnb, setAirbnb] = useState(initialAirbnbState);
    
    const getAirbnb = id => {
        airbnbSer.get(id)
        .then(response => {
          setAirbnb(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
    const params = useParams();
    useEffect(() => {
      const fetchId = async () => {
        const res = await fetch(`http://localhost:3000/airbnb/${params.id}`)}
    });
  
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
      <div>
        {airbnb ? (          
          <div>
            <h5>{airbnb.name}</h5>
            <p>
            </p>
            <Link to={`/airbnb/${airbnb.id}`} className="btn btn-primary">
              Add Review
            </Link>
            <h4> Reviews </h4>
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
                         {props.user && props.user.id === review.user_id &&
                            <div className="row">
                              <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                              <Link to={{
                                pathname: "/airbnb/" + props.match.params.id + "/review",
                                state: {
                                  currentReview: review
                                }
                              }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                            </div>                   
                         }
                       </div>
                     </div>
                   </div>
                 );
               })
              ) : (
              <div className="col-sm-4">
                <p>No reviews yet.</p>
              </div>
              )}
  
            </div>
  
          </div>
        ) : (
          <div>
            <br />
            <p>No Property selected.</p>
          </div>
        )}
      </div>
    );
};

export default Airbnb;