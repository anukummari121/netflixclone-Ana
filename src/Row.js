import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";
const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, /*developer,*/ fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  //console.table(movies);
  return (
    <div className="row">
      <h2> {title} </h2>
      <div className="row_posters">
        {/*serval row poster(s) */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            class={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;

// import React, { useState, useEffect } from "react";
// import axios from "./axios";
// import "./Row.css";
// import YouTube from "react-youtube";
// import movieTrailer from "movie-trailer";
// //import YouTube from "react-youtube";

// const baseUrl = "https://image.tmdb.org/t/p/original";

// function Row({ title, fetchUrl, isLargeRow }) {
//   const [movies, setMovie] = useState([]);
//   const [trailerUrl, setTrailerUrl] = useState("");
//   /*Using 'state' - a way of storing the variables in REACT,
//     Short-term storage of REACT Variables
//     syntax:const  [name of the variable, set variable] = useState
//     A REACT hook is used at the end - useState
//     */

//   //A snippet of code which runs based on some condition/variable i.e. using useEffect hook, should be
//   //included in the import statement to have this to work
//   useEffect(() => {
//     //if [], means that run once when the row loads and don't run again
//     //if[movies], meams that once when the row loads and run whenever movie changes
//     // so it is a dependency on the 'movie'

//     async function fetchData() {
//       const request = await axios.get(fetchUrl);
//       // console.log(request.data.results);
//       setMovie(request.data.results);
//       return request;
//     }

//     fetchData();
//   }, [fetchUrl]);

//   // Options for react-youtube
//   const opts = {
//     height: "390",
//     width: "100%",
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   // console.table(movies);
//   const handleClick = (movie) => {
//     if (trailerUrl) {
//       setTrailerUrl("");
//     } else {
//       movieTrailer(movie?.name || "")
//         .then((url) => {
//           const urlParams = new URLSearchParams(new URL(url).search);
//           setTrailerUrl(urlParams.get("v"));
//         })
//         .catch((error) => console.log(error));
//     }
//   };

//   return (
//     <div className="row">
//       {/* title */}
//       <h2>{title}</h2>
//       <div className="row_posters">
//         {/*several row psoter(s) */}
//         {movies.map((movie) => (
//           <img
//             key={movie.id}
//             onclick={() => handleClick(movie)}
//             className={`row_poster ${isLargeRow && "row_posterLarge"}`}
//             src={`${baseUrl}${
//               isLargeRow ? movie.poster_path : movie.backdrop_path
//             }`}
//             alt={movie.name}
//           />
//         ))}
//       </div>

//       {/* container -> posters */}
//       {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
//     </div>
//   );
// }

// export default Row;
// //1:08'*/
