const Card = (props) => {
  const {type} = props
  return (
    <div className='card-container'>
      {console.log(type)}
      <img className='img-container' src={type.img} alt={type.name}></img>
      <h1 className='pokemon-name'>
        {type.name}
      </h1>
    </div>
  )
}

export default Card