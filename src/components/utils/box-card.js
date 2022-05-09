const Card = (props) => {
  const {type, utility} = props
  return (
    <div className='card-container' data-pokemon={type.name} onClick={utility}>
      <img className='img-container' src={type.img} alt={type.name}></img>
      <h1 className='pokemon-name'>
        {type.name}
      </h1>
    </div>
  )
}

export default Card