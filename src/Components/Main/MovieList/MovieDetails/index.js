import {useEffect, useState} from "react";
import {key, Loader} from "../../../../App";
import StarRating from "../../../StarRating";

const MovieDetails=({selectedId,onCloseMovie})=>{
    const [movie,setMovie]=useState({})
    const [isLoading,setIsLoading]=useState(false)

    const {Title:title,Year:year,Poster:poster,Runtime:runtime,imdbRating,Plot:plot,Released:realease,Actors:actors,Director:director,Genrr:genrr}=movie

    console.log(title,year)

    useEffect(() => {
async function getMovieDetails(){
    setIsLoading(true)
    const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`)
    const data=await res.json()
setMovie(data)
setIsLoading(false)
}
getMovieDetails()
    }, [selectedId]);

return <div className='details'>
    {isLoading ? <p className='loader'>Loading ...</p>:
        <>
    <header>
    <button className='btn-back' onClick={onCloseMovie}>&larr;</button>
        <img src={poster} alt={`Poster of ${title} movie`}/>
        <div className="details-overview">
            <h2>{title}</h2>
            <p>{realease} &bull; {runtime}</p>
            <p>{genrr}</p>
            <p><span>⭐</span>{imdbRating} IMDB rating</p>
        </div>
    </header>
    <section>
        <div className='rating'>
        <StarRating maxRating={10} size={24}/>
        </div>
        <p> <em>{plot}</em> </p>
    <p>Starring {actors}</p>
    <p>Directed by {director}</p>
    </section>
        </>
}
    </div>
}

export default MovieDetails