import React, {useState} from 'react';
import Star from "./Star";

const StarRating = ({maxRating=5}) => {
    const [rating,setRating]=useState(0)

    const handleRating=(rating)=>setRating(rating)

    const containerStyle={
        display:'flex',
        alignItems:'center',
        gap:'16px',
    }
    const starContainerStyle={
        display: 'flex',
    }
    const textStyle={
        loneHeight:'1',
        margin:'0'
    }
    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({length:maxRating},(_,i)=><span>{<Star key={i} onRate={()=>handleRating(i+1)} full={rating>=i+1 }/>}</span>)}
            </div>
            <p style={textStyle}>{rating || ''}</p>
        </div>
    );
};

export default StarRating;