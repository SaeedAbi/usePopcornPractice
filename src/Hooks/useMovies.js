import {useEffect, useState} from "react";
import {key} from "../App";

export function useMovies(query,callback){
    const [movies, setMovies] = useState([]);
    const [isLoading,setIsLoading]=useState(false )
    const [error,setError]=useState('')

    useEffect(() => {
        callback?.()

        const controller= new AbortController()

        async function fetchMovies(){
            try {
                setIsLoading(true)
                setError('')
                const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`, {signal: controller.signal})
                if (!res.ok) throw new Error("Something went wrong with fetching movie")
                const data = await res.json()
                if (data.response==='false') throw new Error('Movie not found')
                setMovies(data.Search)
                setError('')
            } catch (err) {
                if (err.name!== 'AbortError'){
                    console.log(err.message)
                    setError(err.message)
                }
            } finally {
                setIsLoading(false);

            }
        }

        if(query.length< 3) {
            setMovies([])
            setError('')
            return
        }
        fetchMovies()
        return function (){
            controller.abort()
        }
    },  [query]);

    return {movies,isLoading,error}
}