import React, { useState, useEffect } from "react";
import airbnbSer from "./airbnb-ser";
import { Link } from "react-router-dom";

const ListAirbnb = props => {

    const [airbnb, setAirbnb] = useState([]);
    const [searchName, setSearchName ] = useState("");
    const [searchProperty, setSearchProperty ] = useState("");
    const [searchCountry, setSearchCountry ] = useState("");
    const [property, setProperty] = useState(["Properties"]);
    const [country, setCountry] = useState(["Countries"]);

    useEffect(() => {
        retrieveAirbnb();
        retrieveProperty();
        retrieveCountry();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };
    
    const onChangeSearchProperty = e => {
        const searchProperty = e.target.value;
        setSearchProperty(searchProperty);
    };
    
    const onChangeSearchCountry = e => {
        const searchCountry = e.target.value;
        setSearchCountry(searchCountry);
        
    };

    const retrieveAirbnb = () => {
        airbnbSer.getAll()
          .then(response => {
            console.log(response.data);
            setAirbnb(response.data.airbnb);
            
        })
          .catch(e => {
            console.log(e);
        });
    };

    const retrieveProperty = () => {
        airbnbSer.getProperty()
          .then(response => {
            console.log(response.data);
            setProperty(["Properties"].concat(response.data));
            
        })
          .catch(e => {
            console.log(e);
        });
    };

    const retrieveCountry = () => {
        airbnbSer.getCountry()
          .then(response => {
            console.log(response.data);
            setCountry(["Countries"].concat(response.data));
            
        })
          .catch(e => {
            console.log(e);
        });
    };


    const refreshList = () => {
        retrieveAirbnb();
    };
    
    const find = (query, by) => {
        airbnbSer.find(query, by)
          .then(response => {
            console.log(response.data);
            setAirbnb(response.data.airbnb);
          })
          .catch(e => {
            console.log(e);
          });
    };
    
    const findByName = () => {
        find(searchName, "name")
    };
    
    const findByProperty = () => {
        if (searchProperty == "Properties") {
          refreshList();
        } else {
            console.log("hi")
          find(searchProperty, "property_type")
        }
    };

    const findByCountry = () => {
        if (searchCountry == "Countries") {
          refreshList();
        } else {
          find(searchCountry, "country")
        }
    }; 
    
    return (
        <div className="list">
            <div className="search">
                <div className="row pb-1">
                    <div className="input-group col-lg-4">
                        <input type="text" className="form-control" placeholder="Search by name" value={searchName} onChange={onChangeSearchName}/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button" onClick={findByName}>Search</button>
                        </div>
                    </div>
                </div>
                
                <div className="other-search">
                    <div className="input-group col-lg-4">

                        <select onChange={onChangeSearchProperty}>
                            {property.map(property => {
                            return (
                                <option value={property}>{property}</option>
                            )
                            })}
                        </select>

                        <div className="input-group-append">
                            <button className="btn btn-outline-primary" type="button" onClick={findByProperty}>Search</button>
                        </div>

                        <select onChange={onChangeSearchCountry}>
                            {country.map(country => {
                            return (
                                <option value={country}>{country}</option>
                            )
                            })}
                        </select>

                        <div className="input-group-append">
                            <button className="btn btn-outline-primary" type="button" onClick={findByCountry}>Search</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="column">
                {airbnb.map((airbnb) => {
                    return (
                        <div className="each row-lg-1 pb-1">
                            <div className="card">
                                <div className="card-body">

                                    <article className="info-box">
                                        <img src={airbnb.images.picture_url}/>
                                        <div className="information">
                                            <h3 className="card-title">{airbnb.name}</h3>
                                            <p>{airbnb.address.street}</p>
                                            <h6>Property Type: {airbnb.property_type}</h6>
                                            <h6>Price: ${Object.values(airbnb.price)}</h6>

                                            <div className="facilities">
                                                <button><i class="fa-solid fa-person"></i>{airbnb.accommodates}</button>
                                                <button><i class="fa-solid fa-bed"></i>{airbnb.beds}</button>
                                                <button><i class="fa-solid fa-toilet"></i>{Object.values(airbnb.bathrooms)}</button>
                                            </div>

                                            <div className="row">
                                                <p>
                                                    Rating: <strong>{airbnb.review_scores.review_scores_rating}</strong>
                                                    <Link to={"/airbnb/"+airbnb._id} className="btn btn-warning col-lg-5 mx-1 mb-1">
                                                        View Reviews
                                                    </Link>
                                                </p>
                                                
                                            </div>
                                        </div>

                                    </article>

                                    

                                </div>
                            </div>
                        </div>
                        
                    );
                })}
            </div>
            
        </div>


        
    );
}

export default ListAirbnb;