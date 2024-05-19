import {useEffect, useState} from "react";
import {key} from "../../../../App";
import StarRating from "../../../StarRating";

const MovieDetails=({selectedId,onCloseMovie,onAddWatch,watched})=>{
    const [movie,setMovie]=useState({})
    const [isLoading,setIsLoading]=useState(false)
    const [userRating,setUserRating]=useState('')

    const isWatched=watched.map(movie=>movie.imdbID).includes(selectedId)
    const watchedUserRating=watched.find(movie=>movie.imdbID===selectedId)?.userRating

    const {Title:title,Year:year,Poster:poster,Runtime:runtime,imdbRating,Plot:plot,Released:realease,Actors:actors,Director:director,Genrr:genrr}=movie

    const handleAdd=()=>{
        const newWatchedMovie={
            imdbID:selectedId,
            title,
            year,
            poster,
            imdbRating:Number(imdbRating),
            runtime:Number(runtime.split(' ').at(0)),
            userRating,
        }
       onAddWatch(newWatchedMovie)
        onCloseMovie()
    }

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

    useEffect(() => {
        const callBack=(e)=>{
            if (e.code==='Escape'){
                onCloseMovie()
            }
        }
        document.addEventListener(`keydown`,callBack)
        return function (){
            document.removeEventListener('keydown',callBack)
        }
    }, [onCloseMovie]);


    useEffect(() => {
        if (!title) return
document.title=`movie | ${title}`
        return function (){
            document.title='usePopcorn'
        }
    }, [title]);

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
            {!isWatched ? <> <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
                <button className="btn-add" onClick={handleAdd}>Add to list
        </button> </>: <p>you rated with movie {watchedUserRating}</p>
        }
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