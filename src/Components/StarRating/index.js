import React, {useState} from 'react';
import Star from "./Star";
import PropTypes from "prop-types";

StarRating.propTypes={
    maxRating:PropTypes.number,
    color: PropTypes.string,
    message:PropTypes.array,
    defaultRating:PropTypes.number
}

const StarRating = ({maxRating=5,color='#fcc419',size=48,message=[],defaultRating=0}) => {
    const [rating,setRating]=useState(defaultRating)
    const [tempRating,setTempRating]=useState(0)

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
        margin:'0',
        color,
        fontSize:`${size/1.5}px`

    }
    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({length:maxRating},(_,i)=><span>{<Star key={i} onHoverOut={()=>setTempRating(0)} onHoverIn={()=>setTempRating(i+1)} onRate={()=>handleRating(i+1)} full={tempRating? tempRating>=i+1: rating>=i+1 } size={size} color={color}/>}</span>)}
            </div>
            <p style={textStyle}>{message.length===maxRating ? message[tempRating? tempRating-1 :rating-1]: tempRating || rating || ''}</p>
        </div>
    );
};

export default StarRating;