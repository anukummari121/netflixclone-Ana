import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backdropPosition: "center center",
      }}
    >
      <div className="banner_contents">
        {/*<<<Background Image */}
        {/*title */}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/*div 2 buttons */}
        {/*emmet????auto fill ex1:button.buttons_banner*2 and press enter, two buttons with classname are auto populated */}
        {/*emmet????auto fill ex2:div.banner_buttons>button.buttons_banner*2 and press enter,div and two buttons with classname are auto populated */}
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        {/*description */}
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner_fadeBottom" />
    </header>
  );
}

export default Banner;
