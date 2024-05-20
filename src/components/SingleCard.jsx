import React from 'react'
import "./style.css";
import back from "../img/cover.png"
const SingleCard = ({card ,handleChoice,flipped  ,disabled}) => {

    const handleClick=()=>{

        if(!disabled){
            handleChoice(card)
        }
        
    }
  return (
   <div className='card'>
        <div className={flipped ?"flipped":""}>
            <img src={card.src }  className="front" alt="front_image"/>
            <img src={back} alt="back_image" className="back" onClick={handleClick}/>
        </div>
   </div>
  )
}

export default SingleCard