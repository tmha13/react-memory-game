import './SingleCard.css'

export default function SingleCard({card, flipped, disabled, handleChoice}) {
  const handleClick = () => {
    // Let handleClick consume the event if the board is disabled
    // Prevent user from clicking on 3 or more cards in a row
    if(disabled) return
    handleChoice(card)
  }

  return (
    <div className='single-card'>
      {/* Showing card front when its flipped up*/}
      {flipped && <img 
        className="front" 
        src={card.src}
        style={{visibility: card.matched ? 'hidden' : 'visible'}}
        alt="card front"></img>}

      {/* Showing card back as the original state */}
      {!flipped && <img 
        className="back" 
        src="/img/cover.png" 
        style={{visibility: card.matched ? 'hidden' : 'visible'}}
        alt="card back" 
        onClick={handleClick}>
      </img>}
    </div>
  )
}

