import gitHubLogo from './assets/GitHub-Mark-Light-32px.png'
import './styles/footer.scss'

const Footer = () => {
  return (
    <footer className='footer-container'>
      <div className='left-footer'>
        <a href='https://github.com/chheangg/cv-form-generator' target='_blank' rel='noreferrer'><img src={gitHubLogo} alt='github-logo' href='https://github.com/chheangg/cv-form-generator' ></img>Chheangg</a> @ 2022
      </div>
      <div className='right-footer'>
       <p><a href="https://www.vecteezy.com/free-vector/grass-pattern">Grass Pattern Vectors on Vecteezy</a> by Suphachai Promrit</p>
      </div>
    </footer>
  )
}

export default Footer