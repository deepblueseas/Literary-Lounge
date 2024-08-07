import React from 'react';
import SearchBar from '../components/SearchForm';
import '../App'; // Import the CSS file for Home component styling
const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Literary Lounge!</h1>
      <SearchBar />
      <h2>Kick your feet up, find a comfortable place to lounge, and indulge in your new favorite book!</h2>
      <div className="content-container">
        <div className="lounge">
          <img src="/images/NewLounger.png" alt="Lounge" />
        </div>
        <div className="book">
          <img src="/images/Greenandbluebooks.jpg" alt="Book" />
        </div>
      </div>
      </div>
  );
};

export default Home;