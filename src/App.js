import { useEffect, useState} from 'react';
import useSound from 'use-sound';
import './App.css'

import SingleCard from './components/SingleCard';

import helmet from "./img/helmet-1.png";
import potion from "./img/potion-1.png";
import ring from "./img/ring-1.png";
import scroll from "./img/scroll-1.png";
import shield from "./img/shield-1.png";
import sword from "./img/sword-1.png";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cardImages = [
  { "src": helmet ,matched:false },
  { "src": potion,matched:false },
  { "src": ring ,matched:false },
  { "src": scroll,matched:false },
  { "src": shield ,matched:false},
  { "src": sword,matched:false }
];



function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne,setChoiceOne]=useState(null);
  const [choiceTwo,setChoiceTwo]=useState(null);
  const [disabled,setDisabled]=useState(false);

  

  const notify =() => toast.success("Yeah! Images Matched 🥳");
  const notify2=()=>toast.error("Oops ! Try Again  😝")
  const notify3=()=>toast("Let's Start ! 🎮 ",{theme: "colored",});
  const notify4=()=>toast("Let's Start Again ! 🎮 ",{theme: "colored",});
  const notify5=()=>toast.success("Congratulations 🌟 ! All The Images are Matched 🤩");
  const notify6=()=>toast.warn("Toooo Close.. ",{theme: "colored",});
  const notify7=()=>toast.success("Matched first pair of images 🌟  ",{theme: "colored",});

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages].sort(() => Math.random()-0.5).map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
       setTurns(0);
  }

  const handleChoice=(card)=>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurn=()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prev=>prev+1)
    setDisabled(false)
  }
  
  useEffect(() => {
    
  if(choiceOne && choiceTwo){
    if(choiceOne.src === choiceTwo.src){
      notify();
      setDisabled(true);
      setCards(prevCards=>{
        return prevCards.map(card=>{
          if(card.src === choiceOne.src){
            
            return{...card,matched:true}
            
          }else{
            return card;
          }
         
                })
      })
    
      resetTurn();
    }else{
      notify2()
      console.log("not matched");
      setTimeout(()=>resetTurn(),1000)
 
    }
   
  }
  const allImagesMatched = cards.every((card) => card.matched===true);
  if (allImagesMatched ) {
    notify5();
  }

  const unmatchedImagesCount = cards.filter((card) => !card.matched).length;
    if (unmatchedImagesCount === 4) {
      notify6();
    }
    const firstImagesCount = cards.filter((card) => !card.matched).length;
    if (firstImagesCount === 10  && cards.matched===true) {
      notify7();
    }
    console.log(firstImagesCount)
     }, [choiceOne,choiceTwo])
    
     
  useEffect(()=>{
    notify3()
    shuffleCards();

  },[])

  const newgame=()=>{
    shuffleCards();
    notify4()
  }

 
  return (
    <div className="App">
    <ToastContainer theme="colored"/>
      <h1 >Match the  🖼️ Images</h1>
 
      <button onClick={newgame} >New Game 🕹️</button>
      <h3 >Turns 💥: {turns}</h3>
      <div className='card-grid'>
        {cards.map(card => {
         
         return <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card===choiceOne || card===choiceTwo ||card.matched} disabled={disabled}/>
        })}
      </div>
     
    </div>
  );
}

export default App







     // eslint-disable-next-line no-unused-expressions
    //  cards.matched!== false ? notify5() :" ";