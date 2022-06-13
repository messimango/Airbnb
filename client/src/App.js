import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import AddReview from './comps/addreview';
import Airbnb from './comps/airbnb';
import Login from './comps/login';
import ListAirbnb from './comps/list-airbnb';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div className="App">

      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand">Airbnb Rating</a>
          <ul className="navbar-nav mr.auto">
            <li>
              <Link to={"/airbnb"} className="nav-link">Airbnb</Link>
            </li>

            <li>
              { user ? (
                <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                  Logout {user.name}
                </a>
              ) : (            
              <Link to={"/login"} className="nav-link">
                Login
              </Link>

              )}

            </li>
          </ul>
      </nav>
      
      <div className="container mt-3">
        <Routes>

          <Route path="/" element={<ListAirbnb />} />

          <Route path="/airbnb" element={<ListAirbnb />} />

          <Route path="airbnb/:id/review" element={<AddReview authed={true} user={user} />}/>

          <Route path="/airbnb/:id" element={<Airbnb authed={true} user={user} />} />

          <Route path="/login" element={<Login authed={true} login={login} />} />

        </Routes>
      </div>


    </div>
  );
}

export default App;
