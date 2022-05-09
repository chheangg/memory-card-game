import '../styles/box-card.scss'

const Card = (props) => {
  const {type, utility} = props
  return (
    <div className='card-container' data-pokemon={type.name} onClick={utility}>
      <div className='card-wrapper'>
        <h1 className='pokemon-name'>{type.name}</h1>
        <div className='img-wrapper'>
          <img className='img-container' src={type.img} alt={type.name}></img>
        </div>
      </div>
    </div>
  )
}

export default Card