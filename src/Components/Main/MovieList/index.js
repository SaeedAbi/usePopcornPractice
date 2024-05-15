import {useState} from "react";
import {tempMovieData} from "../index";
import Movie from "./Movie";

const MovieList=({movies,onHandleSelect})=> {


    return  <ul className="list list-movies">
        {movies?.map((movie) => (
<Movie movie={movie} key={movie.imdbID} onHandleSelect={onHandleSelect}/>
        ))}
    </ul>
}

 export default MovieList