import './App.css'
import { useEffect, useState } from "react"
import SingleCard from './components/SingleCard'

const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false} 
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [matchesCount, setMatchesCount] = useState(null)

  // Utility function to make a delay in specified duration
  const delay = ms => new Promise(res => setTimeout(res, ms));

  //Shuffle Cards, also reset all values to start a new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setMatchesCount(0)
  }

  // Watch for when the user made a choice and check if theres a match
  useEffect(() => {
    // Asynchronously run to adapt the 1s delay and make sure the flipped card is visible for long enough
    const handleMatch = async () => {
      if(!choiceOne || !choiceTwo) return
      await delay(1000)
      if(choiceOne.src === choiceTwo.src) {
        setMatchesCount(prevCounts => prevCounts+1)
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src)
              return {...card, matched: true}
            else return {...card}
          }) 
        })
      }
      resetChoice()
    }

    handleMatch()
  }, [choiceOne, choiceTwo])

  // Handle a Choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  
  const resetChoice = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
  }

  // If the user completed the game, change to congratulation screen
  if (matchesCount === 6) {
    return (
      <div className="app">
        <h1>Magic Match</h1><br></br><br></br><br></br>
        <h2>Congratulation, you won the game in {turns} turns</h2>
        <button onClick={shuffleCards}>Play Again</button>
      </div>
    );
  }
  // The default page, showing the progress of the game
  else {
    return (
      <div className="App">
        <h1>Magic Match</h1>
        
        <button onClick={shuffleCards}>New Game</button>

        <div className="card-grid">
          {cards.map(card => (
            <SingleCard 
              key={card.id} 
              card={card}
              flipped={card === choiceOne || card === choiceTwo}
              disabled={choiceTwo}
              handleChoice={handleChoice}>
            </SingleCard>
          ))}
        </div>
        <p>Turns: {turns}</p>
          
      </div>
    );
  }
}

export default App