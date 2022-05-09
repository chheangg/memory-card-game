import '../styles/box-grid.scss'

const BoxGrid = (props) => {
  return (
    <div className='box-grid-container'>
      {props.children}
    </div>
  )
}

export default BoxGrid